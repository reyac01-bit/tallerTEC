# Activar inscripción y valoración

Estado: valoración del sitio enlazada a https://forms.gle/yR8hRAzrSDnTCDCd6. Según las capturas facilitadas, recoge nombre, experiencia general, contenidos útiles y sugerencias. Inscripción y entrega de ejercicios pendientes. El sitio no tiene cuentas ni base de datos propia. La recepción real de respuestas debe comprobarla el organizador en Google Forms.

## 1. Crear dos formularios en Google Forms o Microsoft Forms

Use una cuenta del organizador y revise el acceso permitido para docentes externos. Los enlaces de respuesta pueden ser públicos mientras los resultados y la hoja de cálculo permanecen privados.

### Inscripción

Título: TallerTEC — inscripción a talleres de matemática.

Descripción sugerida: «Registra tu interés en los talleres para docentes de secundaria. Fechas y modalidad por confirmar. Responsable y contacto: completar antes de abrir el formulario. Los datos se usarán para organizar la participación y comunicar información del taller. Plazo de conservación: completar conforme a las políticas institucionales.»

Campos propuestos:

- Nombre de la persona docente (obligatorio).
- Correo para comunicar detalles del taller (obligatorio).
- Ciclo o niveles en que enseña (selección múltiple).
- Taller de interés: 1, 2 o ambos (obligatorio).
- Modalidad preferida: virtual, presencial o cualquiera.
- Necesidades de acceso o conectividad (opcional; evitar información sensible).
- Confirmación de lectura de la información sobre uso de los datos.

No presentar horarios, cupos o aval institucional como confirmados. No solicitar datos del estudiantado.

### Valoración y respuestas

Título: TallerTEC — respuestas y valoración de recursos.

Descripción sugerida: «Comparte tu estrategia y observaciones sobre el material. No incluyas nombres ni información que identifique al estudiantado. Responsable, finalidad y conservación: completar antes de publicar.»

Campos propuestos:

- Código de participante (opcional; el organizador decide si necesita relacionar entregas).
- Recurso explorado: racionales, relaciones, geometría o datos (obligatorio).
- Respuesta al problema inicial (párrafo).
- Procedimiento y justificación (párrafo).
- Evidencia o explicación del reto (párrafo).
- Claridad de instrucciones, de 1 (poca) a 5 (mucha).
- Utilidad de las representaciones, de 1 (poca) a 5 (mucha).
- Dificultades y mejoras propuestas (párrafo).

Estos formularios recogen entregas manuales; no importan automáticamente las respuestas del navegador ni los cambios de GeoGebra.

## 2. Configurar los enlaces públicos de respuesta

Obtenga «Enviar / Copiar enlace» en Google Forms o «Recopilar respuestas» en Microsoft Forms. Nunca use el enlace de edición. Complete `formularios-config.js`:

```js
window.TALLERTEC_FORMULARIOS = {
  inscripcion: 'ENLACE_HTTPS_DE_RESPUESTA',
  valoracion: 'ENLACE_HTTPS_DE_RESPUESTA'
};
```

Se admiten enlaces `forms.gle`, Google Forms terminados en `/viewform` y enlaces de respuesta de `forms.office.com` o `forms.microsoft.com`. No guardar credenciales ni respuestas personales en el repositorio.

## 3. Comprobar antes de convocar

Abra `participar.html`, revise ambos formularios sin sesión o con una cuenta docente externa y envíe una respuesta de prueba identificada como tal. Confirme su recepción en la cuenta del organizador y elimine la prueba. En Google Forms puede vincular una hoja de cálculo privada; en Microsoft Forms puede consultar o exportar respuestas a Excel. Solo después confirme que la inscripción está habilitada.
