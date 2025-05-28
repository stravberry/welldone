
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Zap, TrendingUp, Image, Globe, Clock } from 'lucide-react';

const PerformanceManager: React.FC = () => {
  const [performanceScore, setPerformanceScore] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    // Simulate loading performance score
    const timer = setTimeout(() => {
      setPerformanceScore(85);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setPerformanceScore(prev => Math.min(100, prev + 5));
    }, 3000);
  };

  const metrics = [
    {
      name: "First Contentful Paint",
      value: "1.2s",
      score: 90,
      status: "good"
    },
    {
      name: "Largest Contentful Paint",
      value: "2.1s",
      score: 85,
      status: "good"
    },
    {
      name: "Cumulative Layout Shift",
      value: "0.05",
      score: 92,
      status: "good"
    },
    {
      name: "First Input Delay",
      value: "45ms",
      score: 88,
      status: "good"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      good: "default",
      needs_improvement: "secondary",
      poor: "destructive"
    } as const;
    
    return variants[status as keyof typeof variants] || "secondary";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Optymalizacja wydajności
          </CardTitle>
          <CardDescription>Automatyczne ulepszenia prędkości strony</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Minifikacja CSS/JS</Label>
                <p className="text-sm text-muted-foreground">Kompresja plików CSS i JavaScript</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Optymalizacja obrazów</Label>
                <p className="text-sm text-muted-foreground">WebP conversion i kompresja</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Lazy loading</Label>
                <p className="text-sm text-muted-foreground">Ładowanie obrazów na żądanie</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Gzip kompresja</Label>
                <p className="text-sm text-muted-foreground">Kompresja transferu danych</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Browser caching</Label>
                <p className="text-sm text-muted-foreground">Cachowanie zasobów</p>
              </div>
              <Badge variant="outline">30 dni</Badge>
            </div>
          </div>

          <Button 
            onClick={handleOptimize} 
            disabled={isOptimizing}
            className="w-full"
          >
            {isOptimizing ? (
              <>
                <TrendingUp className="h-4 w-4 mr-2 animate-spin" />
                Optymalizacja w toku...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Uruchom optymalizację
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Core Web Vitals</CardTitle>
          <CardDescription>Kluczowe metryki wydajności strony</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Progress 
                  value={performanceScore} 
                  className="w-full h-full rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getScoreColor(performanceScore)}`}>
                    {performanceScore}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold">Ogólny wynik wydajności</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.name}</span>
                    <Badge variant={getStatusBadge(metric.status)}>
                      {metric.score}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold">{metric.value}</div>
                  <Progress value={metric.score} className="mt-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            CDN & Caching
          </CardTitle>
          <CardDescription>Globalna dystrybucja treści</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>CDN aktywne</Label>
              <p className="text-sm text-muted-foreground">Content Delivery Network</p>
            </div>
            <Badge variant="default">Aktywne</Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-bold">45ms</div>
              <div className="text-sm text-muted-foreground">Europa</div>
            </div>
            <div>
              <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-bold">78ms</div>
              <div className="text-sm text-muted-foreground">USA</div>
            </div>
            <div>
              <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <div className="text-lg font-bold">156ms</div>
              <div className="text-sm text-muted-foreground">Azja</div>
            </div>
            <div>
              <Clock className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <div className="text-lg font-bold">92ms</div>
              <div className="text-sm text-muted-foreground">Oceania</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceManager;
