import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import PDFUploader from "@/components/PDFUploader";
import FeedbackPanel from "@/components/FeedbackPanel";
import { useRetroAI } from "@/hooks/useRetroAI";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  CheckCircle, 
  FileText, 
  Lightbulb, 
  RefreshCw, 
  Shield, 
  Zap,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyze' | 'feedback'>('upload');
  const {
    document,
    processing,
    feedback,
    handleFileUpload,
    generateFeedback,
    resetApplication,
    hasDocument,
    hasFeedback,
    isReady
  } = useRetroAI();

  const handleFileUploadWithStep = (file: File, extractedText: string) => {
    handleFileUpload(file, extractedText);
    setCurrentStep('analyze');
  };

  const handleGenerateFeedback = async () => {
    await generateFeedback();
    setCurrentStep('feedback');
  };

  const handleReset = () => {
    resetApplication();
    setCurrentStep('upload');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Por qué elegir <span className="text-primary">RetroAI</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Potencia tu enseñanza con tecnología de vanguardia y feedback personalizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>IA Avanzada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Powered by Google Gemini, la IA más avanzada para análisis educativo y feedback personalizado.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Análisis Rápido</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Procesa documentos de hasta 1000 páginas en minutos. Ahorra tiempo y mejora la calidad del feedback.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Privacidad Total</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tus documentos están seguros. Procesamiento confidencial sin almacenamiento permanente.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Application Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Comienza tu análisis
            </h2>
            <p className="text-xl text-muted-foreground">
              Sigue estos simples pasos para obtener feedback inteligente
            </p>
          </div>

          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${currentStep === 'upload' ? 'text-primary' : hasDocument ? 'text-secondary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === 'upload' ? 'bg-primary text-white' : 
                  hasDocument ? 'bg-secondary text-white' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {hasDocument ? <CheckCircle className="h-4 w-4" /> : '1'}
                </div>
                <span className="font-medium">Cargar PDF</span>
              </div>

              <div className="w-8 h-0.5 bg-border"></div>

              <div className={`flex items-center gap-2 ${currentStep === 'analyze' ? 'text-primary' : hasFeedback ? 'text-secondary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === 'analyze' ? 'bg-primary text-white' : 
                  hasFeedback ? 'bg-secondary text-white' : 
                  'bg-muted text-muted-foreground'
                }`}>
                  {hasFeedback ? <CheckCircle className="h-4 w-4" /> : '2'}
                </div>
                <span className="font-medium">Analizar</span>
              </div>

              <div className="w-8 h-0.5 bg-border"></div>

              <div className={`flex items-center gap-2 ${currentStep === 'feedback' ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep === 'feedback' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  3
                </div>
                <span className="font-medium">Ver Feedback</span>
              </div>
            </div>
          </div>

          {/* Content based on current step */}
          <div className="max-w-6xl mx-auto">
            {currentStep === 'upload' && (
              <div className="space-y-8">
                <PDFUploader 
                  onFileUpload={handleFileUploadWithStep}
                  isProcessing={processing.isProcessing}
                />

                {hasDocument && (
                  <div className="text-center">
                    <Button 
                      onClick={() => setCurrentStep('analyze')} 
                      variant="hero"
                      size="lg"
                    >
                      Continuar al Análisis
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            {currentStep === 'analyze' && hasDocument && (
              <div className="space-y-8">
                <Card className="max-w-2xl mx-auto shadow-medium">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      Documento Listo para Análisis
                    </CardTitle>
                    <CardDescription>
                      Tu documento ha sido procesado y está listo para el análisis con IA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{document.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {document.extractedText.length} caracteres extraídos
                        </p>
                      </div>
                      <Badge variant="secondary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Listo
                      </Badge>
                    </div>

                    <Separator />

                    <div className="text-center space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-accent" />
                          <span>Análisis inteligente</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-secondary" />
                          <span>Feedback personalizado</span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleGenerateFeedback}
                        disabled={processing.isProcessing}
                        variant="hero"
                        size="lg"
                        className="w-full"
                      >
                        {processing.isProcessing ? (
                          <>
                            <Brain className="mr-2 h-5 w-5 animate-pulse" />
                            Analizando con IA...
                          </>
                        ) : (
                          <>
                            <Brain className="mr-2 h-5 w-5" />
                            Generar Feedback Inteligente
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 'feedback' && hasFeedback && (
              <div className="space-y-8">
                <div className="text-center">
                  <Button 
                    onClick={handleReset}
                    variant="outline"
                    className="mb-6"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Analizar Nuevo Documento
                  </Button>
                </div>

                <FeedbackPanel
                  fileName={document.fileName}
                  extractedText={document.extractedText}
                  isProcessing={processing.isProcessing}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">RetroAI</h3>
            <p className="text-background/80">
              Potenciando la educación con inteligencia artificial
            </p>
          </div>
          
          <div className="flex justify-center items-center gap-6 text-sm text-background/70">
            <span>© 2025 RetroAI</span>
            <span>•</span>
            <span>Powered by Gemini AI</span>
            <span>•</span>
            <span>Hecho para educadores</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
