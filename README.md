# Calma Mind • Aplicación de Autorregistro Emocional para el Acompañamiento Psicológico

**Calma Mind** es una aplicación móvil y web diseñada siguiendo rigurosos **principios de usabilidad y diseño centrado en el usuario**, alineada fielmente al **Documento de Requisitos de Producto (PRD)** y a las especificaciones visuales de los **mockups**.

---

## 1. El Problema que Resuelve
Durante el proceso de atención psicológica, suele ser desafiante para los pacientes recordar con claridad y precisión cómo se sintieron a lo largo de la semana, qué eventos influyeron en sus emociones y de qué forma reaccionaron. Los autorregistros en papel suelen abandonarse por falta de constancia o practicidad.

**Calma Mind** permite a los pacientes registrar con facilidad sus emociones, pensamientos y experiencias cotidianas, realizar un seguimiento de su clima emocional y generar un resumen estructurado para compartirlo confidencialmente con su psicóloga (Dra. Marcela) en consulta o vía WhatsApp, sin requerir que la profesional deba crear una cuenta.

---

## 2. Funcionalidades Principales Implementadas (Fase 1)

### 1. Autorregistro Emocional Diario (`/registrar`)
- **Selector táctil de estados principales:** Tristeza, Calma y Paz, Alegría / Gratitud, Inquietud / Ansiedad, Enojo / Frustración.
- **Calibrador sensorial de intensidad (1 a 10):** Con descriptores dinámicos en lenguaje humano (*"Apenas un susurro"*, *"Suave presencia"*, *"Notable y clara"*, *"Desbordante"*).
- **Anclas somáticas corporales:** Selección múltiple de sensaciones (*Pecho relajado*, *Respiración fluida*, *Tensión en hombros*, *Nudo en estómago*, *Ligereza global*).
- **Contexto situacional:** *Soledad tranquila*, *Descanso*, *Trabajo*, *Familia*, *Terapia*.
- **Cajón reflexivo opcional** para desahogo de pensamientos espontáneos.
- Guardado reactivo en `LocalStorage` con feedback compasivo.

### 2. Registro de Experiencias y Pensamientos (`/diario`)
- **Flujo guiado TCC (A-B-C-D):**
  - **A (Situación):** Hechos observables sin juicios.
  - **B (Pensamiento Automático):** Frases o interpretaciones cognitivas inmediatas.
  - **C (Reacción Emocional y Corporal):** Respuesta física y nivel de intensidad (1 a 10).
  - **D (Reencuadre Compasivo):** Perspectiva alternativa más amable y equilibrada.
- **Cinta de filtros:** Filtrar por semana, por emoción (*Calma*, *Inquietud*) o entradas *Con reencuadre*.
- Historial interactivo con tarjetas de detalle, etiquetas de afrontamiento y contexto visual.

### 3. Seguimiento Semanal y Consulta (`/sesion`)
- **Tarjeta de Clima Emocional:** Promedio numérico (ej. 4.8 / 10) y descriptor cualitativo (*"Semana estable y balanceada"*).
- **Curva Orgánica de Resonancia (SVG):** Visualización fluida de la fluctuación diaria (Lunes a Domingo).
- **Desglose porcentual por emoción:** Barra multicomponente y leyenda armónica (*Calma 45%*, *Ansiedad 25%*, *Alegría 20%*, *Frustración 10%*).
- **Detonantes frecuentes:** Conteo de factores asociados a cambios emocionales (*Exigencia laboral 3x*, *Descanso insuficiente 2x*, *Tiempo a solas positivo 4x*).
- **Reflexiones cognitivas recurrentes:** Foco a revisar vs. Herramienta efectiva validada.
- **Cuaderno de notas para la próxima sesión:** Checklist interactivo de temas para la consulta, con posibilidad de tachar y agregar nuevos temas en tiempo real.

### 4. Generación y Envío del Resumen (PDF & WhatsApp)
- **Exportación en PDF clínico confidencial:** Genera y descarga un informe estructurado con datos del paciente, promedio semanal, detonantes, reflexiones TCC y notas para la sesión usando `html2pdf.js`.
- **Compartir por WhatsApp:** Genera un mensaje preformateado listo para enviar a la especialista sin necesidad de registro previo por parte de la profesional.
- **Copiar al portapapeles** con un solo toque.

### 5. Botón de Orientación en Situaciones de Crisis (SOS)
- **Botón visible en cabecera:** Acceso inmediato y prioritario en cualquier momento.
- **Aclaración ética y legal clara:** Se estipula que la app *no ofrece atención de emergencias ni garantiza respuesta inmediata*.
- **Rutas y líneas de ayuda directa 24/7:** Línea 106 de Ayuda Emocional, Línea 123/911 de Emergencias y rutas de Bienestar Universitario.
- **Herramienta de anclaje sensorial (5-4-3-2-1)** y acceso inmediato a respiración guiada diafragmática.

### 6. Práctica de Respiración Guiada Diafragmática (4-4-6)
- Acceso desde la vista de Inicio (*"Respirar ahora"*) o desde el botón de paz interior (`spa`).
- Guía visual interactiva con expansión/contracción del círculo y temporizador rítmico (Inhala 4s → Sostén 4s → Exhala 6s).

---

## 3. Principios de Usabilidad Aplicados
1. **Tono Empático y No Punitivo:** Textos cálidos y compasivos que validan el ritmo del usuario (*"Tu proceso no tiene prisa"*, *"Tus pensamientos son solo hipótesis"*).
2. **Jerarquía Visual y Carga Cognitiva Reducida:** Tipografías cuidadosamente seleccionadas (*Newsreader* serif cálida para titulares y *Plus Jakarta Sans* para alta legibilidad en cuerpo y controles).
3. **Paleta de Colores Terapéutica:** Verdes salvia (`#4c6358`), lavandas calmantes (`#e7def8`), tonos tierra cálidos y fondo marfil suave (`#fcf9f2`) que reduce la fatiga visual.
4. **Privacidad Primero (Offline-first):** Los registros residen en el dispositivo del paciente (`LocalStorage`), otorgándole total soberanía sobre qué compartir y cuándo.
5. **Accesibilidad Móvil Táctil:** Altura mínima de toques (44px), micro-interacciones con feedback táctil inmediato (`active:scale-95`), áreas seguras (*safe-area-insets*).

---

## 4. Estructura de Archivos del Proyecto
```
Electiva IA/
│
├── index.html          # Aplicación Single-Page (SPA) con las 4 vistas y modales
├── css/
│   └── app.css         # Animaciones (respiración, transiciones suaves, estilos de impresión)
├── js/
│   └── app.js          # Lógica de estado, almacenamiento, TCC, PDF y navegación
└── README.md           # Documentación técnica y funcional
```

---

## 5. Cómo Ejecutar la Aplicación
Al ser una aplicación web pura y autocontenida (HTML5, Tailwind CSS, JavaScript ES6+), no requiere dependencias de servidor ni comandos complejos:

1. Abrir directamente el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Firefox, Safari, Edge) o en un dispositivo móvil.
2. O bien, utilizar cualquier extensión de servidor local como **Live Server** en VS Code o similar.

> **Nota:** Conforme a las instrucciones del proyecto para esta Fase 1, no se han generado commits automáticos de git para esperar indicaciones y validación antes de continuar con las fases posteriores.
