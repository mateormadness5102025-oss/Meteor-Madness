import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Orbit, Info } from "lucide-react";
import { useEffect, useRef } from "react";

export const OrbitalVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = Math.min(canvas.width, canvas.height) / 600;

    let animationFrame: number;
    let time = 0;

    const drawOrbitalSystem = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Sun
      ctx.fillStyle = "#FDB813";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#FDB813";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 15 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Earth orbit
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 150 * scale, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Earth
      const earthAngle = time * 0.02;
      const earthX = centerX + Math.cos(earthAngle) * 150 * scale;
      const earthY = centerY + Math.sin(earthAngle) * 150 * scale;
      
      ctx.fillStyle = "#3B82F6";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#3B82F6";
      ctx.beginPath();
      ctx.arc(earthX, earthY, 10 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw asteroid orbit (elliptical, crossing Earth's orbit)
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Math.PI / 6);
      ctx.strokeStyle = "rgba(239, 68, 68, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 180 * scale, 120 * scale, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw asteroid
      const asteroidAngle = time * 0.035;
      const a = 180 * scale; // semi-major axis
      const b = 120 * scale; // semi-minor axis
      const rotationAngle = Math.PI / 6;
      
      const asteroidX = centerX + (Math.cos(asteroidAngle) * a * Math.cos(rotationAngle) - 
                                   Math.sin(asteroidAngle) * b * Math.sin(rotationAngle));
      const asteroidY = centerY + (Math.cos(asteroidAngle) * a * Math.sin(rotationAngle) + 
                                   Math.sin(asteroidAngle) * b * Math.cos(rotationAngle));

      ctx.fillStyle = "#EF4444";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#EF4444";
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, 6 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw asteroid trail
      ctx.strokeStyle = "rgba(239, 68, 68, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const trailAngle = asteroidAngle - (i * 0.05);
        const trailX = centerX + (Math.cos(trailAngle) * a * Math.cos(rotationAngle) - 
                                 Math.sin(trailAngle) * b * Math.sin(rotationAngle));
        const trailY = centerY + (Math.cos(trailAngle) * a * Math.sin(rotationAngle) + 
                                 Math.sin(trailAngle) * b * Math.cos(rotationAngle));
        if (i === 0) {
          ctx.moveTo(trailX, trailY);
        } else {
          ctx.lineTo(trailX, trailY);
        }
      }
      ctx.stroke();

      time += 1;
      animationFrame = requestAnimationFrame(drawOrbitalSystem);
    };

    drawOrbitalSystem();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Orbital <span className="text-gradient">Trajectory Analysis</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real-time visualization of near-Earth object paths using Keplerian parameters
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Orbital Visualization */}
          <Card className="glass md:col-span-2 p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Orbit className="text-primary" size={24} />
                  <h3 className="text-xl font-semibold">Heliocentric View</h3>
                </div>
                <Badge className="bg-warning/20 text-warning border-warning/50">
                  LIVE SIMULATION
                </Badge>
              </div>
              
              <canvas 
                ref={canvasRef} 
                className="w-full aspect-square bg-background/50 rounded-lg border border-primary/20"
              />

              <div className="flex items-center gap-4 justify-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FDB813] shadow-glow-warning" />
                  <span>Sun</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-glow" />
                  <span>Earth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive shadow-glow-danger" />
                  <span>Asteroid</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Orbital Parameters */}
          <Card className="glass p-8 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-accent" size={24} />
              <h3 className="text-xl font-semibold">Orbital Elements</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Semi-major Axis (a)</p>
                <p className="text-lg font-bold text-gradient">1.52 AU</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Eccentricity (e)</p>
                <p className="text-lg font-bold text-gradient">0.234</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Inclination (i)</p>
                <p className="text-lg font-bold text-gradient">12.5°</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Orbital Period</p>
                <p className="text-lg font-bold text-gradient">687 days</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Perihelion Distance</p>
                <p className="text-lg font-bold text-gradient">1.16 AU</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Aphelion Distance</p>
                <p className="text-lg font-bold text-gradient">1.88 AU</p>
              </div>
            </div>

            <div className="pt-4 border-t border-primary/20">
              <p className="text-xs text-muted-foreground">
                <strong>Data Source:</strong> NASA Small-Body Database (Keplerian parameters)
              </p>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="glass p-6">
          <div className="flex items-start gap-3">
            <Info className="text-primary mt-1" size={20} />
            <div className="space-y-2">
              <h4 className="font-semibold">Understanding Orbital Mechanics</h4>
              <p className="text-sm text-muted-foreground">
                Asteroid trajectories are calculated using <strong>Keplerian orbital elements</strong> - six parameters that uniquely define an orbit. 
                The semi-major axis (a) determines orbit size, eccentricity (e) defines shape, and inclination (i) shows tilt relative to Earth's orbit. 
                Near-Earth asteroids with orbits crossing Earth's path require continuous monitoring by NASA's planetary defense systems.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
