import { useState, useCallback } from "react";
import { analyzeDocumentWithGemini, extractTextFromPDF } from "@/lib/gemini";

interface DocumentState {
  file: File | null;
  extractedText: string;
  fileName: string;
}

interface ProcessingState {
  isProcessing: boolean;
  stage: 'idle' | 'extracting' | 'analyzing' | 'complete';
  progress: number;
}

interface FeedbackState {
  feedback: any | null;
  hasError: boolean;
  errorMessage: string;
}

/**
 * Hook personalizado para manejar el estado y lógica de RetroAI
 * Centraliza el manejo de documentos, procesamiento y feedback
 */
export const useRetroAI = () => {
  const [document, setDocument] = useState<DocumentState>({
    file: null,
    extractedText: "",
    fileName: ""
  });

  const [processing, setProcessing] = useState<ProcessingState>({
    isProcessing: false,
    stage: 'idle',
    progress: 0
  });

  const [feedback, setFeedback] = useState<FeedbackState>({
    feedback: null,
    hasError: false,
    errorMessage: ""
  });

  /**
   * Maneja la carga y procesamiento inicial del archivo PDF
   */
  const handleFileUpload = useCallback(async (file: File, extractedText: string) => {
    setDocument({
      file,
      extractedText,
      fileName: file.name
    });

    setFeedback({
      feedback: null,
      hasError: false,
      errorMessage: ""
    });

    setProcessing({
      isProcessing: false,
      stage: 'complete',
      progress: 100
    });
  }, []);

  /**
   * Genera feedback usando Gemini AI
   */
  const generateFeedback = useCallback(async (customCriteria?: string) => {
    if (!document.file) {
      setFeedback({
        feedback: null,
        hasError: true,
        errorMessage: "No hay documento cargado para analizar"
      });
      return;
    }

    setProcessing({
      isProcessing: true,
      stage: 'analyzing',
      progress: 0
    });

    setFeedback({
      feedback: null,
      hasError: false,
      errorMessage: ""
    });

    try {
      // Simular progreso durante el análisis
      const progressInterval = setInterval(() => {
        setProcessing(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 200);

      const criteria = {
        structure: 25,
        content: 30,
        language: 20,
        sources: 15,
        originality: 10
      };

      const result = await analyzeDocumentWithGemini(
        document.file,
        criteria,
        customCriteria
      );

      clearInterval(progressInterval);

      setProcessing({
        isProcessing: false,
        stage: 'complete',
        progress: 100
      });

      setFeedback({
        feedback: result,
        hasError: false,
        errorMessage: ""
      });

    } catch (error) {
      setProcessing({
        isProcessing: false,
        stage: 'idle',
        progress: 0
      });

      setFeedback({
        feedback: null,
        hasError: true,
        errorMessage: error instanceof Error ? error.message : "Error desconocido"
      });
    }
  }, [document.file]);

  /**
   * Resetea el estado de la aplicación
   */
  const resetApplication = useCallback(() => {
    setDocument({
      file: null,
      extractedText: "",
      fileName: ""
    });

    setProcessing({
      isProcessing: false,
      stage: 'idle',
      progress: 0
    });

    setFeedback({
      feedback: null,
      hasError: false,
      errorMessage: ""
    });
  }, []);

  /**
   * Exporta el feedback a diferentes formatos
   */
  const exportFeedback = useCallback((format: 'json' | 'txt' | 'pdf') => {
    if (!feedback.feedback) return;

    const timestamp = new Date().toISOString().split('T')[0];
    const fileName = `${document.fileName}_feedback_${timestamp}`;

    switch (format) {
      case 'json':
        const jsonData = JSON.stringify(feedback.feedback, null, 2);
        downloadFile(jsonData, `${fileName}.json`, 'application/json');
        break;

      case 'txt':
        const txtData = formatFeedbackAsText(feedback.feedback, document.fileName);
        downloadFile(txtData, `${fileName}.txt`, 'text/plain');
        break;

      case 'pdf':
        // TODO: Implementar exportación a PDF
        console.log('PDF export not implemented yet');
        break;
    }
  }, [feedback.feedback, document.fileName]);

  return {
    // Estado
    document,
    processing,
    feedback,
    
    // Acciones
    handleFileUpload,
    generateFeedback,
    resetApplication,
    exportFeedback,
    
    // Estados computados
    hasDocument: !!document.file,
    hasFeedback: !!feedback.feedback,
    isReady: !!document.file && !processing.isProcessing
  };
};

/**
 * Función helper para descargar archivos
 */
const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Formatea el feedback como texto plano para exportación
 */
const formatFeedbackAsText = (feedbackData: any, fileName: string): string => {
  return `
RETROAI - ANÁLISIS DE DOCUMENTO
=====================================

ARCHIVO: ${fileName}
FECHA: ${new Date().toLocaleDateString()}
PUNTUACIÓN GENERAL: ${feedbackData.overallScore}/100

FORTALEZAS IDENTIFICADAS:
${feedbackData.strengths.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

ÁREAS DE MEJORA:
${feedbackData.improvements.map((i: string, idx: number) => `${idx + 1}. ${i}`).join('\n')}

ANÁLISIS DETALLADO POR CRITERIO:
${Object.entries(feedbackData.detailedScores).map(([key, data]: [string, any]) => 
  `\n${key.toUpperCase()}: ${data.score}/100\n${data.feedback}`
).join('\n')}

SUGERENCIAS PARA MEJORAR:
${feedbackData.suggestions.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

PUNTUACIÓN DE LEGIBILIDAD: ${feedbackData.readabilityScore}/100
TONO DEL FEEDBACK: ${feedbackData.tone}

---
Generado por RetroAI con tecnología Gemini
  `.trim();
};