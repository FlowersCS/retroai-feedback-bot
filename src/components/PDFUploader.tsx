import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, File, X, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFUploaderProps {
  onFileUpload: (file: File, extractedText: string) => void;
  isProcessing: boolean;
}

const PDFUploader = ({ onFileUpload, isProcessing }: PDFUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Función simulada para extraer texto del PDF
  // TODO: Reemplazar con implementación real usando PDF.js o similar
  const simulateTextExtraction = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setExtractionProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          // Texto simulado - en producción esto vendría del PDF real
          resolve(`
            Análisis de Ensayo Académico
            
            Estudiante: María González
            Tema: "El impacto de la tecnología en la educación moderna"
            
            La educación ha experimentado una transformación radical en las últimas décadas, 
            principalmente debido al avance tecnológico. Los dispositivos móviles, las plataformas 
            de aprendizaje en línea y la inteligencia artificial han revolucionado la manera en 
            que los estudiantes acceden al conocimiento.
            
            En primer lugar, la accesibilidad ha mejorado significativamente. Los estudiantes 
            pueden acceder a recursos educativos desde cualquier lugar del mundo, eliminando 
            barreras geográficas y económicas. Las plataformas como Khan Academy y Coursera 
            han democratizado el acceso a la educación de calidad.
            
            Sin embargo, también surgen desafíos importantes. La brecha digital sigue siendo 
            una realidad para muchos estudiantes que no tienen acceso a dispositivos o conexión 
            a internet confiable. Además, el exceso de información puede resultar abrumador 
            sin la guía adecuada.
            
            En conclusión, aunque la tecnología ha traído beneficios significativos al sector 
            educativo, es crucial abordar sus limitaciones para asegurar que todos los 
            estudiantes puedan beneficiarse de estas innovaciones.
          `);
        }
      }, 100);
    });
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setError(null);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === "application/pdf");

    if (!pdfFile) {
      setError("Por favor selecciona un archivo PDF válido");
      return;
    }

    await processFile(pdfFile);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setError(null);
      await processFile(file);
    } else {
      setError("Por favor selecciona un archivo PDF válido");
    }
  }, []);

  const processFile = async (file: File) => {
    setUploadedFile(file);
    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      const extractedText = await simulateTextExtraction(file);
      onFileUpload(file, extractedText);
      
      toast({
        title: "PDF procesado exitosamente",
        description: "El texto ha sido extraído y está listo para análisis",
      });
    } catch (err) {
      setError("Error al procesar el archivo PDF");
      console.error("Error extracting text:", err);
    } finally {
      setIsExtracting(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setExtractionProgress(0);
    setError(null);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Cargar Documento del Estudiante
        </CardTitle>
        <CardDescription>
          Sube un archivo PDF para análisis automático con IA. Máximo 20MB.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!uploadedFile ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
              dragActive 
                ? "border-primary bg-primary-light" 
                : "border-border hover:border-primary hover:bg-muted/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isProcessing}
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div>
                <p className="text-lg font-medium">
                  Arrastra tu PDF aquí o haz clic para seleccionar
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Formatos soportados: PDF (máximo 20MB)
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <File className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{uploadedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {isExtracting ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CheckCircle className="h-6 w-6 text-secondary" />
                )}
                
                {!isExtracting && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {isExtracting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Extrayendo texto del PDF...</span>
                  <span>{extractionProgress}%</span>
                </div>
                <Progress value={extractionProgress} className="h-2" />
              </div>
            )}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default PDFUploader;