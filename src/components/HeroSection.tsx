import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-education.jpg";
import { ArrowRight, BookOpen, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-subtle overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-primary"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Brain className="h-4 w-4" />
              Powered by Gemini AI
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  RetroAI
                </span>
                <br />
                <span className="text-foreground">
                  Feedback Inteligente
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Transforma documentos de estudiantes en feedback personalizado y constructivo. 
                Potencia tu enseñanza con inteligencia artificial avanzada.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-medium transition-all duration-300 hover:shadow-strong hover:scale-105"
              >
                Comenzar Análisis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-muted transition-all duration-300"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Precisión</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">30min</div>
                <div className="text-sm text-muted-foreground">Tiempo Ahorrado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">1000+</div>
                <div className="text-sm text-muted-foreground">Profesores</div>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Profesores utilizando RetroAI para analizar documentos de estudiantes"
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent rounded-full opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;