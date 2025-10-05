import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

export const Hero = () => {
  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient">Defend Earth</span>
            <br />
            <span className="text-foreground">Asteroid Impact Simulator</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Visualize asteroid threats, simulate impact scenarios, and explore planetary defense strategies using real NASA and USGS data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary text-primary-foreground shadow-glow-primary hover:shadow-glow-primary/80 transition-all"
              onClick={scrollToSimulator}
            >
              Launch Simulator
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="glass border-primary/50 hover:border-primary hover:bg-primary/10"
            >
              View Live Asteroids
            </Button>
          </div>

          <div className="pt-12 space-y-4">
            <div className="inline-block glass px-6 py-3 rounded-full">
              <p className="data-text text-sm">
                <span className="text-primary">MISSION STATUS:</span>{" "}
                <span className="text-warning">ACTIVE THREAT MONITORING</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToSimulator}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce text-primary hover:text-primary/80 transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};
