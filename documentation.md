# Documentación del Proyecto Quattordici

## Descripción General
Quattordici es una aplicación web desarrollada con Next.js dedicada al análisis y composición de sonetos. Esta herramienta interactiva permite a los usuarios crear sonetos mientras reciben retroalimentación en tiempo real sobre la métrica y la rima de sus versos.

## Documentación de Componentes

### Componente RootLayout
**Ubicación:** <mcfile name="layout.tsx" path="c:\Users\julio\Downloads\quattordici\app\layout.tsx"></mcfile>

Componente principal que estructura la aplicación:
- Establece los metadatos fundamentales de la aplicación
- Implementa la estructura HTML base con configuración de idioma
- Gestiona la renderización de componentes hijos

### Componente SonetoGame
**Ubicación:** <mcfile name="soneto-game.tsx" path="c:\Users\julio\Downloads\quattordici\components\soneto-game.tsx"></mcfile>

#### Funciones Principales

##### `analyzeVerses`
<mcsymbol name="analyzeVerses" filename="soneto-game.tsx" path="c:\Users\julio\Downloads\quattordici\components\soneto-game.tsx" startline="557" type="function"></mcsymbol>

Función central para el análisis poético que realiza:

1. **Análisis Métrico:**
   - Evaluación del cómputo silábico por verso
   - Registro del estado métrico de cada verso
   - Control de la división silábica
   - Identificación y registro de sinalefas (fusión de vocales entre palabras)

2. **Análisis de Rima:**
   - Evaluación del patrón de rima global
   - Verificación de concordancia con el esquema clásico del soneto (ABBA ABBA CDC DCD)

3. **Evaluación del Estado de los Versos:**
   - Clasificación de cada verso según los siguientes criterios:
     - Vacío: Verso sin contenido
     - Correcto: Cumple tanto con la métrica (11 sílabas) como con el patrón de rima
     - Parcial: Contiene texto pero no cumple todos los requisitos
     - Incorrecto: No cumple los requisitos básicos

4. **Sistema de Puntuación:**
   - Cálculo de puntuación basado en:
     - Estado de los versos
     - Precisión métrica
     - Adherencia al patrón de rima

#### Gestión de Efectos

Implementa un sistema de actualización automática mediante `useEffect` que se activa cuando:
- Se modifican los versos del usuario
- Se alteran las sinalefas forzadas

Este sistema garantiza una retroalimentación instantánea durante el proceso de composición.

## Gestión de Estados
El componente administra diversos estados críticos:
- `metricsStatus`: Control del cómputo silábico por verso
- `syllableDivisions`: Almacenamiento de la división silábica
- `sinalefaPositions`: Registro de posiciones de sinalefas
- `rhymePattern`: Control del esquema de rima
- `verseStatus`: Seguimiento del estado de cada verso

## Estructura del Soneto
La aplicación verifica la adherencia a la estructura clásica del soneto:
- 14 versos
- Versos endecasílabos (11 sílabas)
- Esquema de rima: ABBA ABBA CDC DCD

## Notas Técnicas
- La aplicación implementa análisis en tiempo real
- Utiliza algoritmos especializados para el análisis métrico y de rima
- Proporciona retroalimentación inmediata para facilitar el proceso de composición