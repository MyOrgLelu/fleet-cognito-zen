import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import fleetLogo from "@/assets/fleet-logo.png";
import { SeoHead } from "@/components/Seo";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic would go here
    console.log("Login attempt:", { email, password });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-surface relative overflow-hidden">
      <SeoHead
        title="Fleet Management Login | Secure Access"
        description="Log in to the fleet management platform to access routes, vehicles, employees, and performance analytics."
        canonical={window.location.href}
      />
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-glow"></div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-card">
          <CardHeader className="space-y-6 pb-8">
            {/* Logo */}
            <div className="flex justify-center">
              <img 
                src={fleetLogo} 
                alt="Fleet Management Platform" 
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Welcome message */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold font-heading text-foreground">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign in to access your fleet dashboard
              </p>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="login"
                size="lg"
                className="w-full h-12 text-base font-semibold"
              >
                Sign In
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Need access?{" "}
                <button className="text-primary hover:text-primary-hover transition-colors underline-offset-4 hover:underline">
                  Contact administrator
                </button>
              </p>
              <div className="mt-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="text-sm text-primary hover:text-primary-hover underline-offset-4 hover:underline"
                >
                  View dashboard mockup
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2024 Fleet Management Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}