import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertTriangle, Shield } from "lucide-react";
import earthMap from "@/assets/earth-map.jpg";

export const ImpactSimulator = () => {
  const [diameter, setDiameter] = useState([100]);
  const [velocity, setVelocity] = useState([20]);
  const [angle, setAngle] = useState([45]);
  const [simulated, setSimulated] = useState(false);

  const runSimulation = () => {
    setSimulated(true);
    toast.success("Simulation complete!", {
      description: "Impact scenario has been calculated based on your parameters.",
    });
  };

  // Simple impact energy calculation (kinetic energy formula)
  const calculateEnergy = () => {
    const mass = (4/3) * Math.PI * Math.pow(diameter[0]/2, 3) * 2700; // Assuming rock density
    const velocityMs = velocity[0] * 1000; // Convert km/s to m/s
    const energy = 0.5 * mass * Math.pow(velocityMs, 2);
    return (energy / 4.184e15).toFixed(2); // Convert to megatons TNT equivalent
  };

  const getThreatLevel = () => {
    const energy = parseFloat(calculateEnergy());
    if (energy < 1) return { level: "LOW", color: "text-primary", bgColor: "bg-primary/10" };
    if (energy < 100) return { level: "MODERATE", color: "text-warning", bgColor: "bg-warning/10" };
    return { level: "SEVERE", color: "text-destructive", bgColor: "bg-destructive/10" };
  };

  const threat = getThreatLevel();

  return (
    <section id="simulator" className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Impact <span className="text-gradient">Scenario Builder</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Adjust parameters to model asteroid impact consequences
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <Card className="glass p-8 space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base">Asteroid Diameter (meters)</Label>
                  <span className="data-text text-primary font-semibold">{diameter[0]}m</span>
                </div>
                <Slider
                  value={diameter}
                  onValueChange={setDiameter}
                  min={10}
                  max={1000}
                  step={10}
                  className="py-4"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base">Impact Velocity (km/s)</Label>
                  <span className="data-text text-primary font-semibold">{velocity[0]} km/s</span>
                </div>
                <Slider
                  value={velocity}
                  onValueChange={setVelocity}
                  min={5}
                  max={72}
                  step={1}
                  className="py-4"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-base">Impact Angle (degrees)</Label>
                  <span className="data-text text-primary font-semibold">{angle[0]}°</span>
                </div>
                <Slider
                  value={angle}
                  onValueChange={setAngle}
                  min={0}
                  max={90}
                  step={5}
                  className="py-4"
                />
              </div>
            </div>

            <Button 
              onClick={runSimulation} 
              className="w-full bg-gradient-danger text-destructive-foreground shadow-glow-danger hover:shadow-glow-danger/80"
              size="lg"
            >
              <Zap className="mr-2" size={20} />
              Run Impact Simulation
            </Button>
          </Card>

          {/* Visualization */}
          <Card className="glass p-8 space-y-6">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img 
                src={earthMap} 
                alt="Earth Impact Zone" 
                className="w-full h-full object-cover"
              />
              {simulated && (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-destructive rounded-full opacity-50 animate-pulse-glow" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-48 h-48 border-4 border-warning rounded-full opacity-30 animate-pulse" />
                  </div>
                </>
              )}
            </div>

            {simulated && (
              <div className="space-y-4">
                <div className={`flex items-center justify-center gap-2 p-4 rounded-lg ${threat.bgColor}`}>
                  <AlertTriangle className={threat.color} size={24} />
                  <span className={`text-xl font-bold ${threat.color}`}>
                    THREAT LEVEL: {threat.level}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">Impact Energy</span>
                    <span className="data-text font-bold text-primary">{calculateEnergy()} MT</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">Crater Diameter</span>
                    <span className="data-text font-bold text-primary">~{(diameter[0] * 20).toFixed(0)}m</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                    <span className="text-muted-foreground">Affected Radius</span>
                    <span className="data-text font-bold text-primary">~{(diameter[0] * 50 / 1000).toFixed(1)} km</span>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Mitigation Strategies */}
        {simulated && (
          <Card className="glass p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="text-primary" size={32} />
              <h3 className="text-2xl font-bold">Planetary Defense Strategies</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border border-primary/30 hover:border-primary transition-colors">
                <Badge className="mb-3 bg-primary/20 text-primary border-primary/50">KINETIC IMPACTOR</Badge>
                <p className="text-sm text-muted-foreground">
                  Redirect asteroid trajectory by colliding a spacecraft at high velocity. Effective for early detection.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-accent/30 hover:border-accent transition-colors">
                <Badge className="mb-3 bg-accent/20 text-accent border-accent/50">GRAVITY TRACTOR</Badge>
                <p className="text-sm text-muted-foreground">
                  Use spacecraft's gravitational pull to slowly alter asteroid's path over time. Non-destructive method.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-warning/30 hover:border-warning transition-colors">
                <Badge className="mb-3 bg-warning/20 text-warning border-warning/50">NUCLEAR DEFLECTION</Badge>
                <p className="text-sm text-muted-foreground">
                  Last resort: Use nuclear explosion to vaporize surface material and change trajectory. High risk.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </section>
  );
};
