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
