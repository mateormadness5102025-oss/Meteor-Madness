import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Activity, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface NearEarthObject {
  id: string;
  name: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    meters: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
      kilometers_per_second: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
  is_potentially_hazardous_asteroid: boolean;
}

const fetchNearEarthObjects = async () => {
  const today = new Date().toISOString().split("T")[0];
  const response = await fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=DEMO_KEY`
  );
  if (!response.ok) throw new Error("Failed to fetch asteroid data");
  const data = await response.json();
  return Object.values(data.near_earth_objects).flat() as NearEarthObject[];
};

export const AsteroidTracker = () => {
  const { data: asteroids, isLoading, error } = useQuery({
    queryKey: ["nearEarthObjects"],
    queryFn: fetchNearEarthObjects,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  if (error) {
    return (
      <Card className="glass p-6">
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle size={20} />
          <p>Unable to load asteroid data</p>
        </div>
      </Card>
    );
  }

  const hazardousCount = asteroids?.filter(a => a.is_potentially_hazardous_asteroid).length || 0;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Live <span className="text-gradient">Asteroid Tracker</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real-time data from NASA's Near-Earth Object database
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tracked Today</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-gradient">{asteroids?.length || 0}</p>
                )}
              </div>
              <Activity className="text-primary" size={32} />
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Potentially Hazardous</p>
                {isLoading ? (
                  <Skeleton className="h-8 w-16 mt-2" />
                ) : (
                  <p className="text-3xl font-bold text-destructive">{hazardousCount}</p>
                )}
              </div>
              <AlertCircle className="text-destructive" size={32} />
            </div>
          </Card>

          <Card className="glass p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring Status</p>
                <p className="text-3xl font-bold text-warning">ACTIVE</p>
              </div>
              <TrendingUp className="text-warning" size={32} />
            </div>
          </Card>
        </div>

        {/* Asteroid List */}
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Near-Earth Objects Detected</h3>
          <div className="grid gap-4">
            {isLoading ? (
              [...Array(3)].map((_, i) => (
                <Card key={i} className="glass p-6">
                  <Skeleton className="h-24 w-full" />
                </Card>
              ))
            ) : (
              asteroids?.slice(0, 6).map((asteroid) => {
                const approach = asteroid.close_approach_data[0];
                const avgDiameter =
                  (asteroid.estimated_diameter.meters.estimated_diameter_min +
                    asteroid.estimated_diameter.meters.estimated_diameter_max) /
                  2;

                return (
                  <Card key={asteroid.id} className="glass p-6 hover:border-primary/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-semibold">{asteroid.name}</h4>
                          {asteroid.is_potentially_hazardous_asteroid && (
                            <Badge variant="destructive" className="shadow-glow-danger">
                              HAZARDOUS
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Diameter</p>
                            <p className="data-text font-semibold">{avgDiameter.toFixed(0)}m</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Velocity</p>
                            <p className="data-text font-semibold">
                              {parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(1)} km/s
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Miss Distance</p>
                            <p className="data-text font-semibold">
                              {(parseFloat(approach.miss_distance.kilometers) / 384400).toFixed(2)} LD
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Magnitude</p>
                            <p className="data-text font-semibold">{asteroid.absolute_magnitude_h.toFixed(1)} H</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Approach Date</p>
                            <p className="data-text font-semibold">{approach.close_approach_date}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
