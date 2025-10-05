import { Hero } from "@/components/Hero";
import { AsteroidTracker } from "@/components/AsteroidTracker";
import { OrbitalVisualization } from "@/components/OrbitalVisualization";
import { ImpactSimulator } from "@/components/ImpactSimulator";
import { EducationalContent } from "@/components/EducationalContent";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <AsteroidTracker />
      <OrbitalVisualization />
      <ImpactSimulator />
      <EducationalContent />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Data provided by NASA's Near-Earth Object API and USGS
          </p>
          <p className="data-text text-xs text-muted-foreground/70">
            MISSION OBJECTIVE: PLANETARY DEFENSE | STATUS: OPERATIONAL
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
