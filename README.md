# DONAPA

Sitio de Rodrigo Aparicio y del Plan Social Familiar Durandueños, Durán 2027–2031. HTML, CSS y JavaScript nativos, sin instalación ni compilación.

## Ejecutar localmente

```sh
python3 -m http.server 8080 --directory .
```

## Publicación e idiomas

GitHub Pages sirve la raíz `/` de `main`; `.nojekyll` permite servir los archivos directamente. Los recursos y los enlaces entre idiomas son relativos para funcionar bajo `/DONAPA/`.

- `index.html`: sitio completo en español.
- `en.html`: sitio completo en inglés, incluidas las siete propuestas y los campos del registro.
- El selector ES/EN conserva el ancla de navegación. Las marcas y los nombres propios se mantienen.
- El PDF original y el formulario de Google pertenecen al material original en español. La interfaz propia del registro está traducida en ambas páginas.

## Registro conectado a Google Forms

El formulario visual de la web envía por POST al formulario público proporcionado por el propietario. Conserva sus once identificadores `entry.*`, sus opciones de distrito y el valor de consentimiento `Sí`. Todos los campos son obligatorios. La validación del campo de adultos se conserva tal como solicitó el propietario.

El resultado real lo muestra Google Forms en una pestaña nueva. La web no muestra una confirmación ficticia ni guarda datos personales en el navegador. No se copió a este repositorio el HTML de Google aportado, que incluía preferencias de la sesión del propietario; únicamente se usaron la dirección pública y las definiciones de campos necesarias para la integración.

Las pruebas de DOM cubren nombres de campos, validación de formato, POST nativo, opciones y consentimiento en ambos idiomas. No se enviaron registros de prueba a Google Forms. Antes de usar el formulario con familias, conviene comprobar con un registro real que aparece en la hoja del propietario.

## Contenido y experiencia

Las siete propuestas se abren desde sus fotografías o enlaces. Incluyen alcance, servicios, destinatarios, implementación y la página de referencia en el plan. Los diálogos admiten cierre con Escape y restauran el foco; sin JavaScript, sus enlaces abren el PDF en la página correspondiente.

El registro es la acción principal del encabezado, la portada, las propuestas y el cierre. Una fotografía comunitaria se trasladó de la galería a la sección de registro para evitar repetirla. La franja animada usa dos grupos idénticos, cada uno con ancho mínimo de una ventana, y respeta la preferencia de movimiento reducido.

Los perfiles de Rodrigo Aparicio y Fundación Aparicio Pérez están enlazados con los identificadores suministrados por el propietario, junto con iconos de Facebook, Instagram y TikTok. Los CTA de labor social llevan al perfil de la fundación.

## Recursos y tipografía

Los encabezados priorizan Gotham Black si está instalada y usan Montserrat 900 como alternativa. Montserrat se distribuye localmente con licencia OFL; los archivos con licencia de Gotham se pueden aportar para su distribución web.

La marca Rodrigo Aparicio conserva las letras blancas, gruesas y cursivas del inicio, sin «Don» ni rayas. La marca Durandueños se preparó a partir del PDF visual aportado. Los retratos proceden del plan original y las fotografías comunitarias del ZIP proporcionado por el usuario. Las imágenes temáticas de programas proceden de Unsplash. Fuentes y créditos en `assets/RECURSOS.md`.

## Favicon A y distribución para cPanel

El favicon usa una A de Aparicio con el acabado turquesa y azul de la marca. Se incluyen ICO con varias resoluciones, PNG de 16 y 32 píxeles, icono Apple de 180 píxeles y recursos de 192 y 512 píxeles en `site.webmanifest`. El original de alta resolución está en `assets/icons/aparicio-a-master.png`.

`.htaccess` prepara el sitio estático para Apache 2.4 / LiteSpeed: índice español, UTF-8, redirección HTTPS compatible con proxy, acceso de AutoSSL a `/.well-known/`, desactivación de listados y MultiViews, tipos MIME, caché, compresión y página 404. Las páginas HTML se revalidan para que se vean las actualizaciones. Los módulos opcionales están protegidos con `IfModule`.

Para preparar el paquete desde un estado de Git ya confirmado:

```sh
python3 tools/package-cpanel.py
```

El resultado se guarda en `downloads/DONAPA-cPanel.zip`. Incluye `.htaccess` y los archivos públicos en la raíz del ZIP, con permisos de archivo 0644 y carpetas 0755, sin Git, credenciales, herramientas ni carpeta envolvente. `VERSION.txt` identifica el commit de origen. Las instrucciones están en `LEEME-CPANEL.txt`.

Se extrae directamente en `public_html` o en la raíz del dominio adicional. El dominio debe tener un certificado SSL activo (AutoSSL). Las rutas de idioma y recursos son relativas, de modo que no quedan ligadas a GitHub Pages. El registro continúa enviando al Google Forms del propietario.

## Actualizaciones de caché en cPanel

Todas las respuestas del sitio usan `Cache-Control: no-cache, max-age=0, must-revalidate`; `mod_expires` queda desactivado para evitar caducidades heredadas. El navegador debe consultar al servidor antes de reutilizar los archivos y puede recibir 304 para conservar las copias que no cambiaron. Esto abarca HTML, CSS, JavaScript, imágenes, iconos, fuentes y documentos. Se conservan Last-Modified y ETag para no descargar nuevamente los archivos sin cambios.

Una migración inicial de las URL de recursos evita reutilizar las direcciones que tenían la política anterior de 7 o 30 días. Las siguientes modificaciones no requieren cambiar manualmente esos identificadores: la actualización se controla por las cabeceras del servidor.

Para activar esta política en el dominio de cPanel es necesario desplegar los archivos actualizados, incluido `.htaccess`, o extraer el ZIP actualizado. Los commits de GitHub no modifican por sí solos la copia subida a cPanel. GitHub Pages administra sus propias cabeceras y no ejecuta `.htaccess`. Esta política controla archivos HTTP; la resolución DNS y la página provisional del proveedor se gestionan fuera del sitio.
