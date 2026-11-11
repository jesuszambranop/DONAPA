# DONAPA

Sitio de Rodrigo Aparicio y del Plan Social Familiar Somos Durandueños, Durán 2027–2031.

## Ejecutar localmente

```sh
python3 -m http.server 8080 --directory .
```

Abrir `http://localhost:8080`. HTML, CSS y JavaScript nativos, sin instalación ni compilación.

## GitHub Pages

El sitio se publica desde la raíz `/` de la rama `main`. Todos los enlaces a recursos son relativos para funcionar bajo `/DONAPA/`. El archivo `.nojekyll` permite servir los archivos estáticos directamente.

En **Settings → Pages**, seleccionar **Deploy from a branch**, rama **main**, carpeta **/ (root)**.

## Archivos

- `index.html`: contenido, siete propuestas con descripciones completas en ventanas accesibles, carnet ilustrativo y formulario.
- `styles.css`: diseño adaptable, accesibilidad y animaciones.
- `app.js`: menú móvil y descarga de la ficha familiar.
- `assets/`: retrato del documento aportado, logo aportado por el usuario en PNG transparente, fotografías reales de referencia, iconos, fuentes y propuesta original en PDF.

Montserrat se distribuye localmente con licencia OFL. Los encabezados usan Gotham Black si está instalada y Montserrat 900 como alternativa. Para distribuir Gotham como fuente web se necesita aportar un archivo WOFF2 con licencia.

## Ficha familiar

El formulario genera un archivo de texto local. No transmite ni almacena datos en un servidor y no realiza una inscripción oficial. Los programas se presentan como propuestas para 2027–2031. El rango de 12 años no está definido en el documento original; puede indicarse en observaciones.

El logo Durandueños se preparó a partir del PDF visual aportado, sin la palabra Somos ni el lema. Sus menciones visibles en la web usan la imagen con texto alternativo accesible. Los retratos proceden del plan original; las nuevas fotografías temáticas son de Unsplash. Fuentes y créditos en `assets/RECURSOS.md`. No se han generado fotografías de personas.

Las siete propuestas pueden abrirse desde la foto o el enlace de cada tarjeta. Incluyen alcance, servicios, destinatarios, implementación y referencia a la página del plan. Funcionan con diálogo nativo (Escape y foco accesible). Sin JavaScript, los enlaces abren el PDF en la página correspondiente. Los textos completos también están disponibles en `propuestas.json`.

La marca del encabezado y del pie se compone con texto blanco con la tipografía gruesa y cursiva inicial: Rodrigo Aparicio. La portada muestra una visita a una vecina con una fotografía suministrada por el usuario. El retrato mirando a cámara se conserva en la sección de compromiso. La galería comunitaria reúne las imágenes del ZIP proporcionado, convertidas a WebP sin pérdida y sin regenerar escenas.
