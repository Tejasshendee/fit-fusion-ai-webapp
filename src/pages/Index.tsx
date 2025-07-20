import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Zap, 
  Target, 
  Brain, 
  TrendingUp, 
  Camera, 
  Dumbbell, 
  MessageCircle,
  Apple,
  BarChart3,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Play
} from "lucide-react";
import heroImage from "@/assets/hero-fitness.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: "AI Food Recognition",
      description: "Snap a photo of your meal and get instant nutritional analysis with our advanced AI",
      color: "text-accent"
    },
    {
      icon: Dumbbell,
      title: "Personalized Workouts",
      description: "Custom workout plans based on your fitness level, goals, and available time",
      color: "text-secondary"
    },
    {
      icon: MessageCircle,
      title: "AI Fitness Coach",
      description: "24/7 conversational assistant for nutrition advice, workout tips, and motivation",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Comprehensive dashboard tracking your fitness journey with detailed insights",
      color: "text-success"
    },
    {
      icon: Apple,
      title: "Smart Diet Plans",
      description: "Customized meal plans that adapt to your preferences and dietary restrictions",
      color: "text-warning"
    },
    {
      icon: Brain,
      title: "Learning AI",
      description: "Our AI learns your habits and preferences to provide increasingly better recommendations",
      color: "text-destructive"
    }
  ];

  const benefits = [
    "Achieve your fitness goals 3x faster",
    "Never guess about nutrition again",
    "Get personalized recommendations",
    "Track progress with precision",
    "24/7 AI support and motivation"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <img 
          src={heroImage} 
          alt="Fitness and wellness" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        
        <div className="relative z-10 container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
                <Zap className="h-8 w-8" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold">HealthFit AI</h1>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </h2>
            
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-primary-foreground/90">
              Transform your health with personalized AI recommendations, 
              smart food tracking, custom workouts, and real-time progress analytics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="hero" 
                size="xl" 
                className="shadow-glow"
                onClick={() => navigate("/login")}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-white/20 text-primary-foreground hover:bg-white/10"
                onClick={() => navigate("/dashboard")}
              >
                <Target className="h-5 w-5 mr-2" />
                View Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Powered by Advanced AI Technology
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of fitness with cutting-edge artificial intelligence 
              that adapts to your unique needs and goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-primary transition-all duration-300 transform hover:scale-105 border-0">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-4`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-secondary-foreground">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Transform Your Health?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have already achieved their fitness goals 
              with our AI-powered platform. Start your personalized journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                variant="secondary" 
                size="xl"
                className="bg-white/20 hover:bg-white/30 text-secondary-foreground"
                onClick={() => navigate("/login")}
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-accent" />
                <span className="font-semibold">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-accent" />
                <span className="font-semibold">50K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span className="font-semibold">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
