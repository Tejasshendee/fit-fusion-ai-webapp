import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Apple, 
  Target, 
  TrendingUp, 
  Camera, 
  MessageCircle,
  Dumbbell,
  Calendar,
  Award,
  Zap
} from "lucide-react";

const Dashboard = () => {
  const [todayCalories] = useState(1250);
  const [calorieGoal] = useState(2000);
  const [workoutStreak] = useState(7);

  const calorieProgress = (todayCalories / calorieGoal) * 100;

  const todayStats = [
    {
      title: "Calories Consumed",
      value: todayCalories,
      goal: calorieGoal,
      icon: Apple,
      color: "text-accent",
      bgColor: "bg-gradient-energy"
    },
    {
      title: "Workouts Completed",
      value: 1,
      goal: 1,
      icon: Dumbbell,
      color: "text-secondary",
      bgColor: "bg-gradient-secondary"
    },
    {
      title: "Steps Taken",
      value: 8420,
      goal: 10000,
      icon: Activity,
      color: "text-primary",
      bgColor: "bg-gradient-primary"
    },
    {
      title: "Water Intake",
      value: 6,
      goal: 8,
      icon: Target,
      color: "text-success",
      bgColor: "bg-gradient-secondary"
    }
  ];

  const recentMeals = [
    { name: "Greek Yogurt Bowl", calories: 280, time: "8:30 AM", type: "Breakfast" },
    { name: "Grilled Chicken Salad", calories: 420, time: "1:15 PM", type: "Lunch" },
    { name: "Apple & Almonds", calories: 190, time: "3:45 PM", type: "Snack" },
    { name: "Salmon & Quinoa", calories: 360, time: "7:20 PM", type: "Dinner" }
  ];

  const quickActions = [
    { 
      title: "Log Food", 
      description: "Add your meal", 
      icon: Camera, 
      variant: "hero" as const,
      action: () => console.log("Open food logging")
    },
    { 
      title: "Start Workout", 
      description: "Begin your session", 
      icon: Dumbbell, 
      variant: "secondary" as const,
      action: () => console.log("Start workout")
    },
    { 
      title: "AI Assistant", 
      description: "Get personalized advice", 
      icon: MessageCircle, 
      variant: "energy" as const,
      action: () => console.log("Open chat")
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-hero rounded-xl p-6 text-primary-foreground shadow-glow">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah! 👋</h1>
              <p className="text-primary-foreground/80">
                You're on a {workoutStreak}-day streak! Keep going strong.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-8 w-8" />
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {workoutStreak} Day Streak
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${action.variant === 'hero' ? 'bg-gradient-primary' : action.variant === 'secondary' ? 'bg-gradient-secondary' : 'bg-gradient-energy'}`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Button variant={action.variant} size="sm" onClick={action.action}>
                    Go
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {todayStats.map((stat, index) => (
                <Card key={index} className="bg-gradient-card shadow-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground">/ {stat.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={(stat.value / stat.goal) * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {Math.round((stat.value / stat.goal) * 100)}% of daily goal
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Today's Meals
                </CardTitle>
                <CardDescription>Track your nutrition throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMeals.map((meal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Apple className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-sm text-muted-foreground">{meal.time} • {meal.type}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-medium">
                        {meal.calories} cal
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Progress */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Today's Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-primary p-4 mb-4">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">{Math.round(calorieProgress)}%</div>
                      <div className="text-xs">Daily Goal</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {calorieGoal - todayCalories} calories remaining
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Workout */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  Next Workout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-4 rounded-lg bg-gradient-secondary text-secondary-foreground">
                    <h4 className="font-semibold mb-1">Upper Body Strength</h4>
                    <p className="text-sm opacity-90">Tomorrow at 7:00 AM</p>
                    <p className="text-xs opacity-75 mt-2">45 minutes • Intermediate</p>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Preview Workout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;