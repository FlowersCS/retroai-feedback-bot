/**
 * Integración con Google Gemini API para RetroAI
 * 
 * IMPORTANTE: Este archivo contiene las funciones para integrar con Gemini API.
 * Antes de usar en producción, asegúrate de:
 * 1. Obtener una API key de Google AI Studio: https://aistudio.google.com/apikey
 * 2. Configurar las variables de entorno (ver documentación abajo)
 * 3. Instalar las dependencias necesarias
 * 
 * Instalación de dependencias:
 * npm install @google/genai
 * 
 * Variables de entorno necesarias:
 * VITE_GEMINI_API_KEY=tu_api_key_aqui
 * 
 * NOTA: En un entorno de producción, la API key debe manejarse desde el backend
 * por seguridad. Este ejemplo es para desarrollo/demo.
 */

// TODO: Descomentar cuando esté listo para producción
// import { GoogleGenAI } from "@google/genai";

interface EvaluationCriteria {
  structure: number;
  content: number;
  language: number;
  sources: number;
  originality: number;
}

interface FeedbackResult {
  overallScore: number;
  strengths: string[];
  improvements: string[];
  detailedScores: {
    [key: string]: {
      score: number;
      feedback: string;
    };
  };
  suggestions: string[];
  tone: 'constructive' | 'encouraging' | 'critical';
  readabilityScore: number;
}

/**
 * Configuración del cliente Gemini
 * TODO: Descomentar y configurar cuando esté listo
 */
/*
const genAI = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
*/

/**
 * Genera un prompt estructurado para análisis educativo usando LearnLM
 * Basado en las mejores prácticas de la documentación de Gemini
 */
const createEducationalPrompt = (
  documentText: string, 
  criteria: EvaluationCriteria,
  customInstructions?: string
): string => {
  return `
Actúa como un experto tutor y evaluador académico. Tu tarea es analizar el siguiente documento estudiantil y proporcionar feedback constructivo y personalizado.

CRITERIOS DE EVALUACIÓN:
- Estructura y Organización (${criteria.structure}%): Claridad en introducción, desarrollo y conclusión
- Contenido y Argumentación (${criteria.content}%): Profundidad del análisis y solidez de argumentos  
- Uso del Lenguaje (${criteria.language}%): Gramática, vocabulario y estilo
- Uso de Fuentes (${criteria.sources}%): Citación adecuada y variedad de referencias
- Originalidad y Creatividad (${criteria.originality}%): Perspectivas únicas y pensamiento crítico

${customInstructions ? `INSTRUCCIONES ADICIONALES: ${customInstructions}` : ''}

DOCUMENTO A ANALIZAR:
"""
${documentText}
"""

FORMATO DE RESPUESTA REQUERIDO (JSON):
{
  "overallScore": número_del_0_al_100,
  "strengths": ["fortaleza_1", "fortaleza_2", ...],
  "improvements": ["mejora_1", "mejora_2", ...],
  "detailedScores": {
    "structure": {"score": número, "feedback": "texto"},
    "content": {"score": número, "feedback": "texto"},
    "language": {"score": número, "feedback": "texto"}, 
    "sources": {"score": número, "feedback": "texto"},
    "originality": {"score": número, "feedback": "texto"}
  },
  "suggestions": ["sugerencia_1", "sugerencia_2", ...],
  "tone": "constructive|encouraging|critical",
  "readabilityScore": número_del_0_al_100
}

PRINCIPIOS DE FEEDBACK:
1. Sé constructivo y específico
2. Reconoce las fortalezas antes de mencionar mejoras
3. Proporciona ejemplos concretos
4. Sugiere pasos actionables para mejorar
5. Mantén un tono profesional pero alentador
6. Adapta el lenguaje al nivel del estudiante
`;
};

/**
 * Analiza un documento PDF usando Gemini API
 * 
 * @param pdfFile - Archivo PDF a analizar
 * @param criteria - Criterios de evaluación con pesos
 * @param customInstructions - Instrucciones adicionales del profesor
 * @returns Promise con el resultado del análisis
 */
export const analyzeDocumentWithGemini = async (
  pdfFile: File,
  criteria: EvaluationCriteria = {
    structure: 25,
    content: 30, 
    language: 20,
    sources: 15,
    originality: 10
  },
  customInstructions?: string
): Promise<FeedbackResult> => {
  
  // TODO: Implementar cuando esté configurado Gemini
  // Este es el flujo completo que se debe seguir:
  
  /*
  try {
    // 1. Convertir PDF a bytes para Gemini
    const pdfBytes = await pdfFile.arrayBuffer();
    
    // 2. Crear el prompt educativo
    const prompt = createEducationalPrompt(
      "", // El texto se extrae directamente del PDF en Gemini
      criteria, 
      customInstructions
    );
    
    // 3. Llamar a Gemini con el PDF y el prompt
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: Buffer.from(pdfBytes).toString('base64')
        }
      },
      { text: prompt }
    ]);
    
    // 4. Parsear la respuesta JSON
    const response = result.response;
    const text = response.text();
    
    // 5. Extraer JSON de la respuesta
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON de la respuesta');
    }
    
    const feedbackData = JSON.parse(jsonMatch[0]);
    
    // 6. Validar y retornar resultado
    return feedbackData as FeedbackResult;
    
  } catch (error) {
    console.error('Error analyzing document with Gemini:', error);
    throw new Error('Error al analizar documento con Gemini AI');
  }
  */
  
  // IMPLEMENTACIÓN TEMPORAL - Remover cuando Gemini esté configurado
  console.log('📄 Analizando:', pdfFile.name);
  console.log('📋 Criterios:', criteria);
  console.log('📝 Instrucciones:', customInstructions);
  
  // Simular demora de API
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    overallScore: 82,
    strengths: [
      "Excelente introducción que contextualiza el tema claramente",
      "Uso efectivo de ejemplos concretos para ilustrar puntos",
      "Estructura lógica con párrafos bien desarrollados",
      "Reconocimiento balanceado de beneficios y desafíos"
    ],
    improvements: [
      "Ampliar la conclusión con recomendaciones más específicas",
      "Incluir más fuentes académicas para respaldar argumentos",
      "Desarrollar más profundamente el análisis de limitaciones",
      "Mejorar las transiciones entre párrafos"
    ],
    detailedScores: {
      structure: { score: 85, feedback: "Estructura clara con introducción, desarrollo y conclusión bien definidos" },
      content: { score: 80, feedback: "Argumentos sólidos pero podrían profundizarse más con evidencia adicional" },
      language: { score: 88, feedback: "Excelente uso del lenguaje con vocabulario apropiado y variado" },
      sources: { score: 70, feedback: "Menciona ejemplos relevantes pero faltan referencias académicas formales" },
      originality: { score: 85, feedback: "Enfoque equilibrado con perspectiva reflexiva sobre el tema" }
    },
    suggestions: [
      "Considera agregar estadísticas actuales sobre adopción tecnológica en educación",
      "Incluye estudios de caso específicos de instituciones educativas",
      "Desarrolla más las implicaciones futuras y tendencias emergentes",
      "Agrega una sección sobre metodologías de implementación efectiva"
    ],
    tone: "constructive",
    readabilityScore: 78
  };
};

/**
 * Extrae texto de un PDF usando Gemini (alternativa a bibliotecas locales)
 * Gemini puede leer PDFs directamente, pero esta función permite pre-procesamiento
 */
export const extractTextFromPDF = async (pdfFile: File): Promise<string> => {
  // TODO: Implementar con Gemini cuando esté configurado
  /*
  try {
    const pdfBytes = await pdfFile.arrayBuffer();
    
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: 'application/pdf',
          data: Buffer.from(pdfBytes).toString('base64')
        }
      },
      { text: "Extrae todo el texto de este documento PDF manteniendo la estructura original." }
    ]);
    
    return result.response.text();
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw new Error('Error al extraer texto del PDF');
  }
  */
  
  // IMPLEMENTACIÓN TEMPORAL
  console.log('📄 Extrayendo texto de:', pdfFile.name);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `
    Documento de Análisis Académico
    
    Estudiante: María González
    Curso: Tecnología Educativa
    Fecha: ${new Date().toLocaleDateString()}
    
    Introducción
    
    La educación moderna ha experimentado transformaciones significativas debido al avance 
    tecnológico. Este ensayo examina el impacto de la tecnología en los procesos de 
    enseñanza-aprendizaje, analizando tanto beneficios como desafíos.
    
    Desarrollo
    
    En primer lugar, la accesibilidad ha mejorado notablemente. Plataformas como Khan Academy 
    y Coursera han democratizado el acceso a educación de calidad, eliminando barreras 
    geográficas y económicas tradicionales.
    
    Sin embargo, persisten desafíos importantes. La brecha digital afecta a estudiantes 
    sin acceso confiable a tecnología, creando nuevas formas de inequidad educativa.
    
    Conclusión
    
    Aunque la tecnología ofrece oportunidades unprecedented para la educación, su 
    implementación requiere consideración cuidadosa de limitaciones y desafíos éticos.
  `;
};

/**
 * Configuración de diferentes modelos de Gemini según el caso de uso
 */
export const GEMINI_MODELS = {
  // Para análisis de documentos complejos y feedback detallado
  EDUCATION_ANALYSIS: "gemini-1.5-pro",
  
  // Para respuestas rápidas y extractos simples  
  QUICK_FEEDBACK: "gemini-1.5-flash",
  
  // Para análisis específico con LearnLM (cuando esté disponible)
  LEARNING_TUTOR: "learnlm-1.5-pro-experimental"
} as const;

/**
 * Configuración de parámetros de generación para diferentes contextos educativos
 */
export const GENERATION_CONFIG = {
  // Para feedback constructivo y detallado
  DETAILED_FEEDBACK: {
    temperature: 0.3,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
  },
  
  // Para sugerencias creativas y brainstorming
  CREATIVE_SUGGESTIONS: {
    temperature: 0.7,
    topK: 50,
    topP: 0.9,
    maxOutputTokens: 4096,
  }
} as const;

export default {
  analyzeDocumentWithGemini,
  extractTextFromPDF,
  GEMINI_MODELS,
  GENERATION_CONFIG
};