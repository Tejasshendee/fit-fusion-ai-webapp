import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Camera, 
  Upload, 
  Search, 
  Apple, 
  Zap, 
  CheckCircle,
  Clock,
  TrendingUp,
  PlusCircle,
  Scan
} from "lucide-react";
import { toast } from "sonner";

const FoodTracker = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const recentFoods = [
    { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 12, fat: 5 },
    { name: "Banana", calories: 105, protein: 1, carbs: 27, fat: 0 },
    { name: "Grilled Chicken", calories: 285, protein: 53, carbs: 0, fat: 6 },
    { name: "Brown Rice", calories: 220, protein: 5, carbs: 45, fat: 2 },
  ];

  const popularFoods = [
    { name: "Oatmeal", calories: 150, category: "Breakfast" },
    { name: "Caesar Salad", calories: 320, category: "Lunch" },
    { name: "Salmon Fillet", calories: 280, category: "Dinner" },
    { name: "Apple", calories: 80, category: "Snack" },
    { name: "Protein Shake", calories: 140, category: "Drink" },
    { name: "Avocado Toast", calories: 250, category: "Breakfast" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeFood();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFood = () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResult({
        foodName: "Grilled Chicken Breast with Vegetables",
        calories: 420,
        protein: 45,
        carbs: 15,
        fat: 12,
        fiber: 8,
        confidence: 92,
        ingredients: ["Chicken breast", "Broccoli", "Carrots", "Olive oil"]
      });
      setAnalyzing(false);
      toast.success("Food analyzed successfully!");
    }, 2000);
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleAddFood = (food: any) => {
    toast.success(`Added ${food.name} to your diary!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Food Tracker</h1>
        <p className="text-muted-foreground">
          Take a photo or search for food to get instant nutritional insights
        </p>
      </div>

      <Tabs defaultValue="camera" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="camera" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            Camera
          </TabsTrigger>
          <TabsTrigger value="search" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        {/* Camera Tab */}
        <TabsContent value="camera" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scan className="h-5 w-5 text-primary" />
                Food Recognition
              </CardTitle>
              <CardDescription>
                Take a photo or upload an image of your food for instant analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!selectedImage ? (
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Capture Your Food</h3>
                    <p className="text-muted-foreground mb-4">
                      Our AI will identify the food and calculate nutrition information
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button variant="hero" onClick={handleCameraCapture}>
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button variant="outline" onClick={handleFileUpload}>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img src={selectedImage} alt="Food" className="w-full h-64 object-cover" />
                    {analyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="animate-pulse-glow w-16 h-16 mx-auto mb-3 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Zap className="h-8 w-8" />
                          </div>
                          <p>Analyzing food...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {analysisResult && (
                    <Card className="bg-gradient-secondary text-secondary-foreground">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            {analysisResult.foodName}
                          </CardTitle>
                          <Badge variant="secondary" className="bg-white/20">
                            {analysisResult.confidence}% confident
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResult.calories}</div>
                            <div className="text-sm opacity-80">Calories</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResult.protein}g</div>
                            <div className="text-sm opacity-80">Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResult.carbs}g</div>
                            <div className="text-sm opacity-80">Carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">{analysisResult.fat}g</div>
                            <div className="text-sm opacity-80">Fat</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <h4 className="font-semibold">Ingredients Detected:</h4>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.ingredients.map((ingredient: string, index: number) => (
                              <Badge key={index} variant="outline" className="bg-white/10">
                                {ingredient}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            variant="secondary" 
                            className="flex-1 bg-white/20 hover:bg-white/30"
                            onClick={() => handleAddFood(analysisResult)}
                          >
                            Add to Diary
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-white/20 text-secondary-foreground hover:bg-white/10"
                            onClick={() => setSelectedImage(null)}
                          >
                            New Photo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
          />
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search Foods
              </CardTitle>
              <CardDescription>Find food items from our extensive database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for food items..."
                    className="pl-10"
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Popular Foods</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {popularFoods.map((food, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Apple className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-muted-foreground">{food.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{food.calories} cal</Badge>
                          <Button size="sm" variant="ghost" onClick={() => handleAddFood(food)}>
                            <PlusCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recently Added
              </CardTitle>
              <CardDescription>Quickly add foods you've tracked before</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentFoods.map((food, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-secondary/10">
                        <Apple className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">{food.name}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{food.calories} cal</span>
                          <span>{food.protein}g protein</span>
                          <span>{food.carbs}g carbs</span>
                          <span>{food.fat}g fat</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => handleAddFood(food)}>
                      Add Again
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodTracker;