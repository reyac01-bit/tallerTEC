# TallerTEC

Colección inicial basada en la propuesta de talleres y materiales para secundaria de Reiman Acuña Chacón. Incluye cuatro recursos HTML originales, compendio, guía docente, fichas imprimibles, dos agendas de 90 minutos y plantillas de seguimiento e informe.

Abra `index.html` directamente en un navegador con JavaScript. No requiere instalación ni conexión. Opcionalmente, desde este directorio ejecute `python -m http.server 8000 --bind 127.0.0.1`. Las referencias externas requieren Internet. Para compartir, comprima el directorio conservando su estructura.

En racionales, las respuestas y el recorrido se conservan en el mismo navegador cuando el almacenamiento local está disponible. Puede borrarlos desde la actividad. En los otros tres recursos, las respuestas no se guardan: imprima o registre el trabajo antes de cerrar. Use el botón de impresión para obtener las fichas.

## Validación

Ejecute `node tests.js` y `node --check interacciones.js`. Revise también las interacciones y la impresión en un navegador antes de uso docente.

## Estado

Versión 0.2 para revisión académica. Portada y racionales rediseñados; los otros recursos conservan su estructura inicial. No se dispone del piloto previo citado en la propuesta: racionales es una elaboración nueva. Los talleres son planes, y el informe y bitácora son plantillas; no acreditan actividades realizadas. La selección de habilidades, nombramiento, coordinación MEP, licencia y publicación institucional están pendientes. No se asigna una licencia de difusión hasta el acuerdo institucional.

## GeoGebra y participación (v0.3)

En geometría, pulse **Cargar GeoGebra** para iniciar una construcción externa. Requiere acceso a `www.geogebra.org` y a los servidores de aplicaciones de GeoGebra. Los controles de base y altura actualizan el triángulo; C puede arrastrarse horizontalmente. La exploración SVG original sigue disponible sin conexión. Esta integración no envía respuestas al docente ni conserva la construcción al recargar.

`participar.html` contiene los accesos a inscripción y valoración. La valoración del sitio está enlazada al formulario facilitado por el organizador. La inscripción y la entrega de ejercicios siguen **pendientes de configurar**. Para añadir formularios, siga [la guía](docs/configurar-formularios.md) y complete los enlaces públicos en `formularios-config.js`. El registro se realizará en la cuenta de Google Forms o Microsoft Forms del organizador; no se almacenan datos personales en GitHub. No hay cuentas de participantes ni envío automático de respuestas.

La carga real de GeoGebra no se pudo verificar en el entorno de desarrollo porque su dominio está bloqueado. Se verificaron la carga bajo demanda, la configuración del applet mediante un sustituto de prueba y la alternativa ante errores; antes de usarlo en un taller, comprobar la construcción en una conexión con acceso a GeoGebra.

## Corrección v0.3.2

La etiqueta de área usa la función `round` en minúscula. Si solo falla esa etiqueta, el triángulo sigue disponible. Participación muestra el formulario de valoración de Google Forms dentro de la página y conserva un enlace externo si el servicio no permite mostrarlo o requiere sesión. La inscripción y la entrega de ejercicios siguen pendientes. Las pruebas locales no confirman la recepción real de respuestas ni la carga externa de GeoGebra.

## Juego: laberinto de racionales (v0.4)

Abra `juegos/laberinto.html`, o use el acceso en la portada y en racionales. Haga clic en el tablero para usar flechas/WASD; en móvil use los botones. Las puertas requieren tres retos de suma, diferencia y resta de fracciones. Acepte respuestas equivalentes; use pistas y reintente sin penalización. Reiniciar o recargar borra la partida. No se envían respuestas al docente.

El laberinto es original y está construido con p5.js 1.11.11, incluido localmente para funcionar sin conexión. Véase `vendor/p5/LICENSE.txt` y `vendor/p5/ORIGEN.md` para la dependencia de terceros. El tablero todavía no ofrece una experiencia no visual completa.

Ejecute `node juegos/laberinto.test.js` para verificar rutas, puertas obligatorias, respuestas y victoria.
