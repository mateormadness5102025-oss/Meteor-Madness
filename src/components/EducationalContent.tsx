import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Target, Telescope, AlertCircle } from "lucide-react";

export const EducationalContent = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Understanding the <span className="text-gradient">Threat</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Learn about asteroid impacts and planetary defense
          </p>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass">
            <TabsTrigger value="detection" className="data-text">
              <Telescope className="mr-2" size={16} />
              Detection
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-text">
              <AlertCircle className="mr-2" size={16} />
              Threats
            </TabsTrigger>
            <TabsTrigger value="impacts" className="data-text">
              <Target className="mr-2" size={16} />
              Impacts
            </TabsTrigger>
            <TabsTrigger value="defense" className="data-text">
              <Shield className="mr-2" size={16} />
              Defense
            </TabsTrigger>
          </TabsList>

          <TabsContent value="detection" className="space-y-4">
            <Card className="glass p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary">How We Detect Asteroids</h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  NASA's Planetary Defense Coordination Office actively tracks near-Earth objects (NEOs) using ground-based telescopes and space observatories. The program monitors asteroids larger than 140 meters that could pose a threat to Earth.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold text-foreground mb-2">Ground-Based Telescopes</h4>
                    <p className="text-sm">
                      Networks like Pan-STARRS and Catalina Sky Survey continuously scan the night sky for moving objects.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold text-foreground mb-2">Space Observatories</h4>
                    <p className="text-sm">
                      NEOWISE and other infrared telescopes detect asteroids based on their heat signatures.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg border border-primary/30">
                  <p className="text-sm">
                    <span className="font-bold text-primary">Current Status:</span> NASA tracks over 30,000 near-Earth asteroids, with new discoveries added weekly.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-4">
            <Card className="glass p-8 space-y-4">
              <h3 className="text-2xl font-bold text-destructive">Types of Asteroid Threats</h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  Not all asteroids pose the same level of risk. Threat classification depends on size, composition, trajectory, and probability of impact.
                </p>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg border-l-4 border-warning bg-warning/10">
                    <h4 className="font-semibold text-foreground mb-2">City-Scale Impact (50-100m)</h4>
                    <p className="text-sm">
                      Similar to the 1908 Tunguska event. Could devastate a metropolitan area but unlikely to cause global effects.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/10">
                    <h4 className="font-semibold text-foreground mb-2">Regional Catastrophe (100-1000m)</h4>
                    <p className="text-sm">
                      Could destroy multiple cities and cause continental climate disruption. These are the primary focus of planetary defense.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/20">
                    <h4 className="font-semibold text-foreground mb-2">Global Extinction (1km+)</h4>
                    <p className="text-sm">
                      Would cause worldwide devastation and potentially mass extinction. Fortunately, most of these are already cataloged.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="impacts" className="space-y-4">
            <Card className="glass p-8 space-y-4">
              <h3 className="text-2xl font-bold text-warning">Impact Consequences</h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  When an asteroid hits Earth, the consequences extend far beyond the immediate crater. Understanding these cascading effects is crucial for preparedness.
                </p>
                <div className="grid gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/50 to-transparent">
                    <h4 className="font-semibold text-foreground mb-2">🌋 Immediate Effects</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Massive explosion with blast wave</li>
                      <li>Crater formation and ejecta distribution</li>
                      <li>Seismic activity and potential tsunamis (ocean impacts)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/50 to-transparent">
                    <h4 className="font-semibold text-foreground mb-2">🌪️ Secondary Effects</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Atmospheric dust and debris (nuclear winter effect)</li>
                      <li>Wildfires from superheated ejecta</li>
                      <li>Electromagnetic pulse from ionization</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/50 to-transparent">
                    <h4 className="font-semibold text-foreground mb-2">🌍 Long-term Consequences</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>Climate disruption lasting months to years</li>
                      <li>Agricultural collapse and food chain disruption</li>
                      <li>Mass casualties and infrastructure damage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="defense" className="space-y-4">
            <Card className="glass p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary">Planetary Defense Strategies</h3>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  The key to planetary defense is early detection and decisive action. With enough warning time, we have several proven and theoretical methods to deflect or destroy threatening asteroids.
                </p>
                <div className="space-y-4">
                  <div className="p-6 rounded-lg glass border border-primary/30">
                    <h4 className="font-semibold text-primary text-lg mb-3">DART Mission Success (2022)</h4>
                    <p className="text-sm mb-3">
                      NASA's Double Asteroid Redirection Test successfully demonstrated kinetic impact technology by crashing a spacecraft into asteroid Dimorphos, altering its orbit by 32 minutes.
                    </p>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                      PROVEN TECHNOLOGY
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="font-semibold text-foreground mb-2">Early Detection (10+ years)</h4>
                      <p className="text-sm">Use gravity tractors or slow kinetic impacts for gradual course correction</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary/50">
                      <h4 className="font-semibold text-foreground mb-2">Late Detection (&lt;5 years)</h4>
                      <p className="text-sm">High-speed kinetic impactors or, as last resort, nuclear deflection</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
