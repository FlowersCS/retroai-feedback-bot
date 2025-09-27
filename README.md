# RetroAI - Plataforma de Feedback Inteligente para Profesores

RetroAI es una plataforma web moderna que utiliza la API de Google Gemini para analizar documentos de estudiantes y proporcionar feedback personalizado y constructivo. Diseñada específicamente para educadores que buscan optimizar su tiempo y mejorar la calidad de sus evaluaciones.

![RetroAI Screenshot](src/assets/hero-education.jpg)

## 🚀 Características Principales

- **Análisis de PDFs con IA**: Procesamiento directo de documentos PDF usando Google Gemini API
- **Feedback Personalizado**: Evaluación automática basada en criterios educativos configurables
- **Interfaz Moderna**: Diseñada con React, TypeScript y Tailwind CSS
- **Criterios Flexibles**: Personalización de rubros de evaluación según necesidades específicas
- **Exportación**: Descarga del feedback en múltiples formatos
- **Responsive Design**: Optimizada para escritorio y dispositivos móviles

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui
- **IA**: Google Gemini API (gemini-1.5-pro)
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: React Hooks personalizados

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- API Key de Google Gemini (obtener en [Google AI Studio](https://aistudio.google.com/apikey))

## ⚡ Instalación y Configuración

1. **Clonar el repositorio**
```bash
git clone <tu-repo-url>
cd retroai
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env en la raíz del proyecto
VITE_GEMINI_API_KEY=tu_api_key_aqui
```

4. **Instalar dependencias adicionales para Gemini**
```bash
npm install @google/genai
```

5. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

## 🔧 Configuración de Gemini API

### Paso 1: Obtener API Key
1. Visita [Google AI Studio](https://aistudio.google.com/apikey)
2. Inicia sesión con tu cuenta de Google
3. Genera una nueva API Key
4. Copia la clave generada

### Paso 2: Configurar en la aplicación
1. Abre el archivo `src/lib/gemini.ts`
2. Descomenta las líneas de configuración:
```typescript
// Descomentar estas líneas:
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
```

3. En la función `analyzeDocumentWithGemini`, descomenta el bloque de implementación y comenta la implementación temporal.

### Paso 3: Modelos Disponibles
- `gemini-1.5-pro`: Para análisis detallado y complejo
- `gemini-1.5-flash`: Para respuestas rápidas  
- `learnlm-1.5-pro-experimental`: Optimizado para educación (cuando esté disponible)

## 📚 Uso de la Aplicación

### 1. Cargar Documento
- Arrastra un archivo PDF o haz clic para seleccionar
- Máximo 20MB por archivo
- Extracción automática de texto

### 2. Configurar Criterios
- **Estructura y Organización** (25%): Claridad en introducción, desarrollo y conclusión
- **Contenido y Argumentación** (30%): Profundidad del análisis y solidez de argumentos
- **Uso del Lenguaje** (20%): Gramática, vocabulario y estilo
- **Uso de Fuentes** (15%): Citación adecuada y variedad de referencias
- **Originalidad y Creatividad** (10%): Perspectivas únicas y pensamiento crítico

### 3. Generar Feedback
- Procesamiento automático con Gemini AI
- Análisis de hasta 1000 páginas
- Feedback constructivo y específico

### 4. Revisar Resultados
- **Puntuación General**: Score numérico del 0-100
- **Fortalezas**: Aspectos destacados del documento
- **Mejoras**: Áreas de oportunidad específicas
- **Sugerencias**: Recomendaciones actionables
- **Análisis Detallado**: Desglose por criterio

## 🎨 Personalización del Diseño

El sistema de diseño está centralizado en:
- `src/index.css`: Variables CSS y tokens de color
- `tailwind.config.ts`: Configuración de Tailwind CSS
- Paleta de colores educativa (azul/verde/naranja)
- Componentes shadcn/ui personalizados

### Colores Principales
- **Primary**: Azul educativo (`hsl(217 89% 54%)`)
- **Secondary**: Verde de progreso (`hsl(142 71% 45%)`)
- **Accent**: Naranja de destacado (`hsl(25 95% 53%)`)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── HeroSection.tsx     # Sección principal
│   ├── PDFUploader.tsx     # Carga de archivos
│   └── FeedbackPanel.tsx   # Panel de resultados
├── hooks/
│   └── useRetroAI.ts       # Hook principal de estado
├── lib/
│   ├── gemini.ts           # Integración con Gemini API
│   └── utils.ts            # Utilidades generales
├── pages/
│   ├── Index.tsx           # Página principal
│   └── NotFound.tsx        # Página 404
└── assets/
    └── hero-education.jpg  # Imagen hero
```

## 🔒 Consideraciones de Seguridad

⚠️ **IMPORTANTE**: En producción, las API keys deben manejarse desde el backend por seguridad.

### Para Desarrollo:
- API key en variables de entorno locales
- No commitear claves en el repositorio

### Para Producción:
- Proxy las llamadas a Gemini através de tu backend
- Implementar autenticación y autorización
- Validar y sanitizar inputs del usuario
- Implementar rate limiting

## 🚀 Deployment

### Desarrollo Local
```bash
npm run dev
```

### Build de Producción
```bash
npm run build
npm run preview
```

### Deploy en Lovable
1. Haz clic en "Publish" en la interfaz de Lovable
2. Configura tu dominio personalizado si es necesario
3. La aplicación estará disponible en tu URL de Lovable

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Documentación de Gemini API**: [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)
- **Documentación de Lovable**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Issues**: Reporta problemas en el repositorio de GitHub

## 🙏 Agradecimientos

- Google Gemini AI por la tecnología de procesamiento de documentos
- Shadcn/ui por los componentes de interfaz
- Lovable por la plataforma de desarrollo

---

**RetroAI** - Transformando la educación con inteligencia artificial 🎓✨