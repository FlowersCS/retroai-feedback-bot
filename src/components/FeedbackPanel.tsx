import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  CheckCircle, 
  Clock, 
  FileText, 
  MessageSquare, 
  Settings,
  Star,
  TrendingUp,
  AlertCircle,
  Download,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackPanelProps {
  fileName: string;
  extractedText: string;
  isProcessing: boolean;
}

// Simulación de criterios de evaluación configurables
const evaluationCriteria = [
  {
    id: "structure",
    name: "Estructura y Organización",
    weight: 25,
    description: "Claridad en la introducción, desarrollo y conclusión"
  },
  {
    id: "content",
    name: "Contenido y Argumentación",
    weight: 30,
    description: "Profundidad del análisis y solidez de los argumentos"
  },
  {
    id: "language",
    name: "Uso del Lenguaje",
    weight: 20,
    description: "Gramática, vocabulario y estilo de escritura"
  },
  {
    id: "sources",
    name: "Uso de Fuentes",
    weight: 15,
    description: "Citación adecuada y variedad de referencias"
  },
  {
    id: "originality",
    name: "Originalidad y Creatividad",
    weight: 10,
    description: "Perspectivas únicas y pensamiento crítico"
  }
];

const FeedbackPanel = ({ fileName, extractedText, isProcessing }: FeedbackPanelProps) => {
  const [customCriteria, setCustomCriteria] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const { toast } = useToast();

  // Función simulada para generar feedback con Gemini
  // TODO: Implementar llamada real a Gemini API
  const generateFeedbackWithGemini = async () => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 15;
        setProcessingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          resolve({
            overallScore: 82,
            strengths: [
              "Excelente introducción que contextualiza el tema claramente",
              "Uso efectivo de ejemplos concretos (Khan Academy, Coursera)",
              "Estructura lógica con párrafos bien desarrollados",
              "Reconocimiento balanceado de beneficios y desafíos"
            ],
            improvements: [
              "Ampliar la conclusión con recomendaciones más específicas",
              "Incluir más fuentes académicas para respaldar los argumentos",
              "Desarrollar más profundamente el tema de la brecha digital",
              "Mejorar las transiciones entre párrafos"
            ],
            detailedScores: {
              structure: { score: 85, feedback: "Estructura clara con introducción, desarrollo y conclusión bien definidos" },
              content: { score: 80, feedback: "Argumentos sólidos pero podrían profundizarse más" },
              language: { score: 88, feedback: "Excelente uso del lenguaje y vocabulario apropiado" },
              sources: { score: 70, feedback: "Menciona ejemplos pero faltan referencias académicas" },
              originality: { score: 85, feedback: "Enfoque equilibrado y perspectiva reflexiva" }
            },
            suggestions: [
              "Considera agregar estadísticas sobre la brecha digital",
              "Incluye estudios de caso específicos de implementación tecnológica",
              "Desarrolla más las implicaciones futuras de la tecnología educativa"
            ],
            tone: "constructive",
            readabilityScore: 78
          });
        }
      }, 200);
    });
  };

  const handleGenerateFeedback = async () => {
    try {
      setProcessingProgress(0);
      const result = await generateFeedbackWithGemini();
      setFeedback(result);
      
      toast({
        title: "Feedback generado exitosamente",
        description: "El análisis con IA ha sido completado",
      });
    } catch (error) {
      toast({
        title: "Error al generar feedback",
        description: "Hubo un problema al procesar el documento",
        variant: "destructive"
      });
    }
  };

  const copyFeedback = () => {
    if (feedback) {
      const feedbackText = `
FEEDBACK PARA: ${fileName}

PUNTUACIÓN GENERAL: ${feedback.overallScore}/100

FORTALEZAS:
${feedback.strengths.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

ÁREAS DE MEJORA:
${feedback.improvements.map((i: string, idx: number) => `${idx + 1}. ${i}`).join('\n')}

SUGERENCIAS:
${feedback.suggestions.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}
      `;
      
      navigator.clipboard.writeText(feedbackText);
      toast({
        title: "Feedback copiado",
        description: "El feedback ha sido copiado al portapapeles",
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Document Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Documento Cargado
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-muted-foreground">
                {extractedText.length} caracteres extraídos
              </p>
            </div>
            
            {!feedback && (
              <Button 
                onClick={handleGenerateFeedback}
                disabled={isProcessing}
                className="bg-primary hover:bg-primary-hover"
              >
                {isProcessing ? (
                  <>
                    <Brain className="mr-2 h-4 w-4 animate-pulse" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generar Feedback con IA
                  </>
                )}
              </Button>
            )}
          </div>

          {isProcessing && processingProgress > 0 && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analizando con Gemini AI...</span>
                <span>{processingProgress}%</span>
              </div>
              <Progress value={processingProgress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evaluation Criteria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-secondary" />
            Criterios de Evaluación
          </CardTitle>
          <CardDescription>
            Personaliza los criterios que utilizará la IA para evaluar el documento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {evaluationCriteria.map((criterion) => (
              <div key={criterion.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{criterion.name}</h4>
                    <Badge variant="secondary">{criterion.weight}%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {criterion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Criterios Adicionales</label>
            <Textarea
              placeholder="Agrega criterios específicos para este análisis..."
              value={customCriteria}
              onChange={(e) => setCustomCriteria(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Feedback Results */}
      {feedback && (
        <Card className="shadow-medium">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Feedback Generado
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyFeedback}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copiar
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Resumen</TabsTrigger>
                <TabsTrigger value="detailed">Análisis Detallado</TabsTrigger>
                <TabsTrigger value="suggestions">Sugerencias</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-white">{feedback.overallScore}</span>
                    </div>
                    <p className="text-lg font-semibold">Puntuación General</p>
                    <p className="text-muted-foreground">de 100 puntos</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold text-secondary mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Fortalezas Identificadas
                    </h4>
                    <ul className="space-y-2">
                      {feedback.strengths.map((strength: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Star className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Oportunidades de Mejora
                    </h4>
                    <ul className="space-y-2">
                      {feedback.improvements.map((improvement: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed" className="space-y-4">
                {Object.entries(feedback.detailedScores).map(([key, data]: [string, any]) => {
                  const criterion = evaluationCriteria.find(c => c.id === key);
                  return (
                    <div key={key} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{criterion?.name}</h4>
                        <Badge variant={data.score >= 80 ? "default" : data.score >= 70 ? "secondary" : "destructive"}>
                          {data.score}/100
                        </Badge>
                      </div>
                      <Progress value={data.score} className="h-2 mb-2" />
                      <p className="text-sm text-muted-foreground">{data.feedback}</p>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="suggestions" className="space-y-4">
                <Alert>
                  <Brain className="h-4 w-4" />
                  <AlertDescription>
                    Estas sugerencias están generadas por IA basándose en mejores prácticas educativas
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-3">
                  {feedback.suggestions.map((suggestion: string, index: number) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs text-white font-semibold">
                          {index + 1}
                        </div>
                        <p className="text-sm flex-1">{suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeedbackPanel;