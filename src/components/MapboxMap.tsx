import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TOKEN_KEY = "mapbox_public_token";

const MapboxMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [token, setToken] = useState<string>(localStorage.getItem(TOKEN_KEY) || "");

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      projection: "globe",
      zoom: 2.2,
      center: [0, 20],
      pitch: 45,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");
    map.current.scrollZoom.disable();

    map.current.on("style.load", () => {
      map.current?.setFog({
        color: "rgb(10, 12, 16)",
        "high-color": "rgb(36, 52, 82)",
        "horizon-blend": 0.2,
      });
    });

    // Demo vehicle markers
    const points: [number, number][] = [
      [-0.1276, 51.5072], // London
      [2.3522, 48.8566],  // Paris
      [-74.006, 40.7128], // NYC
      [139.6917, 35.6895], // Tokyo
      [151.2093, -33.8688], // Sydney
    ];

    points.forEach(([lng, lat]) => {
      const el = document.createElement("span");
      el.className = "block h-3 w-3 rounded-full bg-primary shadow-primary";
      new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map.current!);
    });

    // optional gentle spin
    const secondsPerRevolution = 240;
    const maxSpinZoom = 3.5;
    let userInteracting = false;

    function spinGlobe() {
      if (!map.current) return;
      const zoom = map.current.getZoom();
      if (!userInteracting && zoom < maxSpinZoom) {
        const distancePerSecond = 360 / secondsPerRevolution;
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    map.current.on("mousedown", () => (userInteracting = true));
    map.current.on("mouseup", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.current.on("moveend", spinGlobe);
    spinGlobe();

    return () => {
      map.current?.remove();
    };
  }, [token]);

  const saveToken = () => {
    localStorage.setItem(TOKEN_KEY, token);
    window.location.reload();
  };

  if (!token) {
    return (
      <Card className="bg-card/80 border-border/60">
        <CardContent className="p-6">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to enable the live map. You can add it later in Supabase secrets for production.
            </p>
            <Input
              placeholder="pk.eyJ..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
            <Button variant="login" onClick={saveToken} className="self-start">Save token</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/80 border-border/60 shadow-subtle">
      <CardContent>
        <div ref={mapContainer} className="relative h-80 rounded-lg overflow-hidden" />
      </CardContent>
    </Card>
  );
};

export default MapboxMap;
