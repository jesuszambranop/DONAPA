# DONAPA

Sitio de Rodrigo Aparicio y del Plan Social Familiar Somos Durandueños, Durán 2027–2031.

## Ejecutar localmente

```sh
python3 -m http.server 8080 --directory docs
```

Abrir `http://localhost:8080`. HTML, CSS y JavaScript nativos, sin instalación ni compilación.

## GitHub Pages

El sitio se publica desde la carpeta `/docs` de la rama `main`. Todos los enlaces a recursos son relativos para funcionar bajo `/DONAPA/`. El archivo `.nojekyll` permite servir los archivos estáticos directamente.

En **Settings → Pages**, seleccionar **Deploy from a branch**, rama **main**, carpeta **/docs**.

## Archivos

- `docs/index.html`: contenido y siete programas, carnet ilustrativo y formulario.
- `docs/styles.css`: diseño adaptable, accesibilidad y animaciones.
- `docs/app.js`: menú móvil y descarga de la ficha familiar.
- `docs/assets/`: retrato del documento aportado, marcas SVG, iconos vectoriales, fuentes y propuesta original en PDF.

Montserrat se distribuye localmente con licencia OFL. Los encabezados usan Gotham Black si está instalada y Montserrat 900 como alternativa. Para distribuir Gotham como fuente web se necesita aportar un archivo WOFF2 con licencia.

## Ficha familiar

El formulario genera un archivo de texto local. No transmite ni almacena datos en un servidor y no realiza una inscripción oficial. Los programas se presentan como propuestas para 2027–2031. El rango de 12 años no está definido en el documento original; puede indicarse en observaciones.

Las marcas son reinterpretaciones vectoriales para esta web. No se han generado fotografías de personas.
