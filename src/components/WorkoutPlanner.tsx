import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dumbbell, 
  Target, 
  Clock, 
  Zap, 
  User, 
  Calendar,
  TrendingUp,
  Play,
  CheckCircle,
  Star,
  Timer
} from "lucide-react";
import { toast } from "sonner";

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  exercises: Exercise[];
  targetMuscles: string[];
}

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  duration?: number;
  rest: number;
  instruction: string;
}

const WorkoutPlanner = () => {
  const [userProfile, setUserProfile] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "",
    fitnessLevel: "",
    goals: [],
    availableTime: "",
    preferredWorkouts: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const fitnessGoals = [
    { id: "weight-loss", label: "Weight Loss", icon: "🔥" },
    { id: "muscle-gain", label: "Muscle Gain", icon: "💪" },
    { id: "endurance", label: "Endurance", icon: "🏃" },
    { id: "strength", label: "Strength", icon: "🏋️" },
    { id: "flexibility", label: "Flexibility", icon: "🧘" },
    { id: "general-fitness", label: "General Fitness", icon: "⚡" }
  ];

  const workoutTypes = [
    { id: "strength", label: "Strength Training", icon: "🏋️" },
    { id: "cardio", label: "Cardio", icon: "🏃" },
    { id: "hiit", label: "HIIT", icon: "🔥" },
    { id: "yoga", label: "Yoga", icon: "🧘" },
    { id: "pilates", label: "Pilates", icon: "🤸" },
    { id: "functional", label: "Functional Training", icon: "⚡" }
  ];

  const sampleWorkouts = [
    {
      id: "1",
      name: "Upper Body Strength",
      description: "Build strength in your chest, shoulders, and arms",
      duration: 45,
      difficulty: "Intermediate",
      exercises: [
        {
          name: "Push-ups",
          sets: 3,
          reps: "12-15",
          rest: 60,
          instruction: "Keep your body straight and lower until chest nearly touches ground"
        },
        {
          name: "Dumbbell Rows",
          sets: 3,
          reps: "10-12",
          rest: 60,
          instruction: "Pull weight to your ribcage, squeeze shoulder blades together"
        },
        {
          name: "Shoulder Press",
          sets: 3,
          reps: "8-10",
          rest: 90,
          instruction: "Press weights overhead, keep core engaged"
        },
        {
          name: "Tricep Dips",
          sets: 3,
          reps: "10-12",
          rest: 60,
          instruction: "Lower body using arms, keep elbows close to body"
        }
      ],
      targetMuscles: ["Chest", "Shoulders", "Arms", "Back"]
    },
    {
      id: "2",
      name: "HIIT Cardio Blast",
      description: "High-intensity intervals for maximum calorie burn",
      duration: 30,
      difficulty: "Advanced",
      exercises: [
        {
          name: "Burpees",
          sets: 4,
          reps: "30 seconds",
          duration: 30,
          rest: 30,
          instruction: "Full body movement: squat, plank, jump"
        },
        {
          name: "Mountain Climbers",
          sets: 4,
          reps: "30 seconds",
          duration: 30,
          rest: 30,
          instruction: "Alternate bringing knees to chest in plank position"
        },
        {
          name: "Jump Squats",
          sets: 4,
          reps: "30 seconds",
          duration: 30,
          rest: 30,
          instruction: "Squat down and explode up into a jump"
        },
        {
          name: "High Knees",
          sets: 4,
          reps: "30 seconds",
          duration: 30,
          rest: 30,
          instruction: "Run in place bringing knees up to waist level"
        }
      ],
      targetMuscles: ["Full Body", "Cardio"]
    }
  ];

  const handleGoalChange = (goalId: string, checked: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      goals: checked 
        ? [...prev.goals, goalId]
        : prev.goals.filter(g => g !== goalId)
    }));
  };

  const handleWorkoutTypeChange = (typeId: string, checked: boolean) => {
    setUserProfile(prev => ({
      ...prev,
      preferredWorkouts: checked 
        ? [...prev.preferredWorkouts, typeId]
        : prev.preferredWorkouts.filter(t => t !== typeId)
    }));
  };

  const generateWorkoutPlan = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const randomWorkout = sampleWorkouts[Math.floor(Math.random() * sampleWorkouts.length)];
      setGeneratedPlan(randomWorkout);
      setIsGenerating(false);
      setCurrentStep(4);
      toast.success("Personalized workout plan generated!");
    }, 2000);
  };

  const startWorkout = () => {
    toast.success("Starting workout! Good luck! 💪");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Workout Planner</h1>
        <p className="text-muted-foreground">
          Get personalized workout recommendations based on your fitness level and goals
        </p>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Setup Progress</span>
            <span className="text-sm text-muted-foreground">{currentStep}/4</span>
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Profile</span>
            <span>Goals</span>
            <span>Preferences</span>
            <span>Plan</span>
          </div>
        </CardContent>
      </Card>

      {/* Step 1: Basic Profile */}
      {currentStep === 1 && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Information
            </CardTitle>
            <CardDescription>Tell us about yourself to create the perfect workout plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, age: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Enter your weight"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, weight: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter your height"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select value={userProfile.gender} onValueChange={(value) => setUserProfile(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Fitness Level</Label>
              <RadioGroup
                value={userProfile.fitnessLevel}
                onValueChange={(value) => setUserProfile(prev => ({ ...prev, fitnessLevel: value }))}
                className="grid grid-cols-3 gap-4"
              >
                <div className="flex items-center space-x-2 p-4 rounded-lg border">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Beginner</div>
                      <div className="text-sm text-muted-foreground">New to fitness</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Intermediate</div>
                      <div className="text-sm text-muted-foreground">Some experience</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 rounded-lg border">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">
                    <div>
                      <div className="font-medium">Advanced</div>
                      <div className="text-sm text-muted-foreground">Very experienced</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              variant="hero" 
              size="lg" 
              className="w-full" 
              onClick={() => setCurrentStep(2)}
              disabled={!userProfile.age || !userProfile.weight || !userProfile.height || !userProfile.gender || !userProfile.fitnessLevel}
            >
              Continue to Goals
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Fitness Goals */}
      {currentStep === 2 && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Fitness Goals
            </CardTitle>
            <CardDescription>What do you want to achieve? (Select all that apply)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fitnessGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <Checkbox
                    id={goal.id}
                    checked={userProfile.goals.includes(goal.id)}
                    onCheckedChange={(checked) => handleGoalChange(goal.id, checked as boolean)}
                  />
                  <Label htmlFor={goal.id} className="cursor-pointer flex items-center gap-3 flex-1">
                    <span className="text-xl">{goal.icon}</span>
                    <span className="font-medium">{goal.label}</span>
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Back
              </Button>
              <Button 
                variant="hero" 
                className="flex-1" 
                onClick={() => setCurrentStep(3)}
                disabled={userProfile.goals.length === 0}
              >
                Continue to Preferences
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Workout Preferences */}
      {currentStep === 3 && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-primary" />
              Workout Preferences
            </CardTitle>
            <CardDescription>Choose your preferred workout types and time availability</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Available Time per Session</Label>
              <Select value={userProfile.availableTime} onValueChange={(value) => setUserProfile(prev => ({ ...prev, availableTime: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select workout duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15-30">15-30 minutes</SelectItem>
                  <SelectItem value="30-45">30-45 minutes</SelectItem>
                  <SelectItem value="45-60">45-60 minutes</SelectItem>
                  <SelectItem value="60+">60+ minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Preferred Workout Types</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workoutTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={type.id}
                      checked={userProfile.preferredWorkouts.includes(type.id)}
                      onCheckedChange={(checked) => handleWorkoutTypeChange(type.id, checked as boolean)}
                    />
                    <Label htmlFor={type.id} className="cursor-pointer flex items-center gap-2 flex-1">
                      <span>{type.icon}</span>
                      <span className="font-medium">{type.label}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Back
              </Button>
              <Button 
                variant="hero" 
                className="flex-1" 
                onClick={generateWorkoutPlan}
                disabled={!userProfile.availableTime || userProfile.preferredWorkouts.length === 0 || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-pulse-glow" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Target className="h-4 w-4 mr-2" />
                    Generate My Plan
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Generated Workout Plan */}
      {currentStep === 4 && generatedPlan && (
        <div className="space-y-6">
          <Card className="bg-gradient-secondary text-secondary-foreground shadow-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">🎉 Your Personalized Workout Plan</CardTitle>
                  <CardDescription className="text-secondary-foreground/80">
                    Tailored specifically for your goals and fitness level
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-secondary-foreground">
                  AI Generated
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{generatedPlan.name}</CardTitle>
                  <CardDescription>{generatedPlan.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {generatedPlan.duration} min
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {generatedPlan.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Target Muscles</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedPlan.targetMuscles.map((muscle, index) => (
                    <Badge key={index} variant="secondary">{muscle}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Exercises</h4>
                <div className="space-y-4">
                  {generatedPlan.exercises.map((exercise, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 border">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium">{exercise.name}</h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{exercise.sets} sets</span>
                          <span>{exercise.reps} reps</span>
                          <span>{exercise.rest}s rest</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{exercise.instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  Modify Plan
                </Button>
                <Button variant="hero" className="flex-1" onClick={startWorkout}>
                  <Play className="h-4 w-4 mr-2" />
                  Start Workout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Sample Workouts */}
      {currentStep === 1 && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Popular Workouts
            </CardTitle>
            <CardDescription>Try these popular workouts while you set up your profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleWorkouts.map((workout) => (
                <div key={workout.id} className="p-4 rounded-lg border hover:shadow-primary transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{workout.name}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {workout.duration}min
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {workout.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{workout.description}</p>
                  <Button variant="secondary" size="sm" className="w-full">
                    <Play className="h-3 w-3 mr-2" />
                    Quick Start
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkoutPlanner;