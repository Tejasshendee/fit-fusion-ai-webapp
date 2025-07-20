import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Heart, 
  Apple, 
  Dumbbell,
  Target,
  Lightbulb,
  Clock
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI fitness and nutrition assistant! 🏋️‍♀️ I'm here to help you with personalized workout advice, nutrition guidance, meal planning, and answer any health-related questions you might have. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        "What should I eat for breakfast?",
        "Create a workout plan for me",
        "How many calories should I eat?",
        "Best exercises for weight loss"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickActions = [
    { icon: Apple, text: "Nutrition advice", color: "text-accent" },
    { icon: Dumbbell, text: "Workout help", color: "text-secondary" },
    { icon: Target, text: "Goal setting", color: "text-primary" },
    { icon: Heart, text: "Health tips", color: "text-destructive" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('breakfast') || message.includes('meal')) {
      return {
        text: "Great question about breakfast! 🍳 A balanced breakfast should include protein, healthy fats, and complex carbs. Here are some options:\n\n• Greek yogurt with berries and nuts\n• Oatmeal with banana and almond butter\n• Eggs with avocado toast\n• Smoothie with spinach, banana, and protein powder\n\nThese options will keep you energized and satisfied throughout the morning!",
        suggestions: [
          "How many calories for breakfast?",
          "Quick breakfast ideas",
          "Pre-workout breakfast options"
        ]
      };
    }
    
    if (message.includes('workout') || message.includes('exercise')) {
      return {
        text: "I'd love to help you with your workout! 💪 To give you the best recommendations, could you tell me:\n\n• Your fitness goal (weight loss, muscle gain, endurance)\n• Your current fitness level\n• How much time you have available\n• Any equipment you have access to\n\nBased on this, I can create a personalized workout plan that fits your needs perfectly!",
        suggestions: [
          "I want to lose weight",
          "Build muscle workout",
          "30-minute home workout",
          "Beginner workout plan"
        ]
      };
    }
    
    if (message.includes('calories') || message.includes('calorie')) {
      return {
        text: "Calorie needs are very individual! 📊 They depend on factors like:\n\n• Age, gender, height, and weight\n• Activity level\n• Fitness goals\n• Metabolic rate\n\nAs a general guide:\n• Weight loss: 500 calories below maintenance\n• Maintenance: Match your daily energy expenditure\n• Muscle gain: 200-500 calories above maintenance\n\nWould you like me to help calculate your specific needs?",
        suggestions: [
          "Calculate my daily calories",
          "Weight loss calorie deficit",
          "Calories for muscle gain"
        ]
      };
    }
    
    if (message.includes('weight loss') || message.includes('lose weight')) {
      return {
        text: "Weight loss success comes from combining the right nutrition and exercise! 🎯 Here's my proven approach:\n\n**Nutrition (70% of success):**\n• Create a modest calorie deficit\n• Focus on whole foods\n• Increase protein intake\n• Stay hydrated\n\n**Exercise (30% of success):**\n• Combine cardio and strength training\n• Aim for 150+ minutes moderate activity weekly\n• Include 2-3 strength sessions\n\nConsistency beats perfection every time!",
        suggestions: [
          "Create a meal plan",
          "Best cardio for weight loss",
          "How much protein do I need?"
        ]
      };
    }
    
    // Default response
    return {
      text: "I'm here to help with all your fitness and nutrition questions! 🌟 Whether you need workout advice, meal planning, nutrition guidance, or motivation - just ask! I can provide personalized recommendations based on your goals and preferences.",
      suggestions: [
        "Help me plan meals",
        "Design a workout routine",
        "Nutrition advice",
        "Motivation tips"
      ]
    };
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Fitness Assistant</h1>
        <p className="text-muted-foreground">
          Get personalized advice for nutrition, workouts, and health goals
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-auto p-4 flex flex-col gap-2 hover:shadow-primary transition-all duration-300"
            onClick={() => handleSuggestionClick(action.text)}
          >
            <action.icon className={`h-6 w-6 ${action.color}`} />
            <span className="text-sm font-medium">{action.text}</span>
          </Button>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-gradient-primary">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            AI Fitness Coach
            <Badge variant="secondary" className="ml-auto flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Online
            </Badge>
          </CardTitle>
          <CardDescription>
            Ask me anything about fitness, nutrition, workouts, or health goals
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Messages Area */}
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                     <Avatar className="h-8 w-8 bg-gradient-primary">
                       <AvatarFallback>
                         <Bot className="h-4 w-4 text-white" />
                       </AvatarFallback>
                     </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-gradient-primary text-white ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Suggestions */}
                    {message.suggestions && message.sender === 'ai' && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                   {message.sender === 'user' && (
                     <Avatar className="h-8 w-8 bg-gradient-secondary">
                       <AvatarFallback>
                         <User className="h-4 w-4 text-white" />
                       </AvatarFallback>
                     </Avatar>
                   )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                   <Avatar className="h-8 w-8 bg-gradient-primary">
                     <AvatarFallback>
                       <Bot className="h-4 w-4 text-white" />
                     </AvatarFallback>
                   </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about nutrition, workouts, or health goals..."
                className="flex-1"
              />
              <Button 
                variant="hero" 
                size="icon"
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Lightbulb className="h-3 w-3" />
              <span>Tip: Ask specific questions for better personalized advice!</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Tips */}
      <Card className="bg-gradient-energy text-accent-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Pro Tips from Your AI Coach
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Consistency Wins</h4>
                <p className="text-sm opacity-90">Small daily actions compound into big results over time.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Apple className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Nutrition First</h4>
                <p className="text-sm opacity-90">You can't out-exercise a poor diet. Focus on whole foods.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Heart className="h-5 w-5 mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Listen to Your Body</h4>
                <p className="text-sm opacity-90">Rest and recovery are just as important as training.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatAssistant;