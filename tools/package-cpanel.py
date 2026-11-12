#!/usr/bin/env python3
"""Create a cPanel-ready ZIP with public files at its root, including .htaccess."""
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED
from datetime import datetime, timezone
import argparse, hashlib, stat, subprocess

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', type=Path, default=ROOT / 'downloads/DONAPA-cPanel.zip')
args = parser.parse_args()
archive = args.output.resolve()
root_files = ['.htaccess', 'index.html', 'en.html', 'app.js', 'styles.css',
              'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png',
              'apple-touch-icon.png', 'site.webmanifest', 'robots.txt',
              '404.html', 'LEEME-CPANEL.txt', 'propuestas.json']
paths = [ROOT / name for name in root_files]
paths += sorted(p for p in (ROOT / 'assets').rglob('*')
                if p.is_file() and not any(part.startswith('.') for part in p.relative_to(ROOT).parts))
for path in paths:
    if not path.is_file():
        raise SystemExit(f'Missing required deployment file: {path.relative_to(ROOT)}')
source_commit = subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip()
if subprocess.check_output(['git', 'status', '--porcelain'], cwd=ROOT, text=True).strip():
    raise SystemExit('Commit the source changes before packaging so VERSION.txt identifies the exact source.')
created = datetime.now(timezone.utc)
version = (f'DONAPA - cPanel static website\nSource commit: {source_commit}\n'
           f'Packaged (UTC): {created.isoformat(timespec="seconds")}\n'
           'Languages: Spanish (index.html), English (en.html)\n')
archive.parent.mkdir(parents=True, exist_ok=True)
stamp = created.timetuple()[:6]

def info(name, directory=False):
    entry = ZipInfo(name, stamp)
    entry.create_system = 3
    entry.compress_type = ZIP_DEFLATED
    entry.external_attr = ((stat.S_IFDIR | 0o755) if directory else (stat.S_IFREG | 0o644)) << 16
    if directory:
        entry.external_attr |= 0x10
    return entry

with ZipFile(archive, 'w', compression=ZIP_DEFLATED, compresslevel=9) as bundle:
    directories = sorted({str(parent.relative_to(ROOT)).replace('\\', '/')
                          for path in paths for parent in path.parents
                          if parent != ROOT and ROOT in parent.parents})
    for directory in directories:
        bundle.writestr(info(directory + '/', True), b'')
    for path in paths:
        bundle.writestr(info(path.relative_to(ROOT).as_posix()), path.read_bytes())
    bundle.writestr(info('VERSION.txt'), version)

with ZipFile(archive) as bundle:
    assert bundle.testzip() is None
    assert '.htaccess' in bundle.namelist()
    assert 'index.html' in bundle.namelist() and 'en.html' in bundle.namelist()
    assert not any(name.startswith(('.git/', 'tools/', 'downloads/')) for name in bundle.namelist())
digest = hashlib.sha256(archive.read_bytes()).hexdigest()
print(f'Archive: {archive}')
print(f'Source commit: {source_commit}')
print(f'Size: {archive.stat().st_size:,} bytes')
print(f'SHA256: {digest}')
