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
