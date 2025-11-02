import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  CardPremium,
  CardPremiumHeader,
  CardPremiumTitle,
  CardPremiumDescription,
  CardPremiumContent,
} from "@/components/ui/card-premium";
import { MapPin, Route, Clock, Gauge } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-accent transition-fast">
              My Routes
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-fast">
              Explore
            </a>
            <a href="#" className="text-sm font-medium hover:text-accent transition-fast">
              About
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="accent" size="sm">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-foreground">
            Plan Your Perfect
            <br />
            <span className="text-accent">Motorcycle Journey</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Precision route planning with detailed metrics for riders who demand excellence.
            From cypress bayous to mountain passes, chart your adventure with confidence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button variant="accent" size="lg">
              Start Planning
            </Button>
            <Button variant="outline" size="lg">
              View Demo Route
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardPremium>
            <CardPremiumHeader>
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                <MapPin className="text-accent" size={24} />
              </div>
              <CardPremiumTitle className="text-xl">Interactive Mapping</CardPremiumTitle>
              <CardPremiumDescription>
                Click to add waypoints, drag to refine your route
              </CardPremiumDescription>
            </CardPremiumHeader>
          </CardPremium>

          <CardPremium>
            <CardPremiumHeader>
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Route className="text-primary" size={24} />
              </div>
              <CardPremiumTitle className="text-xl">Smart Routing</CardPremiumTitle>
              <CardPremiumDescription>
                Optimize for scenic routes or fastest paths
              </CardPremiumDescription>
            </CardPremiumHeader>
          </CardPremium>

          <CardPremium>
            <CardPremiumHeader>
              <div className="w-12 h-12 rounded-md bg-accent/10 flex items-center justify-center mb-4">
                <Clock className="text-accent" size={24} />
              </div>
              <CardPremiumTitle className="text-xl">Trip Metrics</CardPremiumTitle>
              <CardPremiumDescription>
                Detailed distance and time for every leg
              </CardPremiumDescription>
            </CardPremiumHeader>
          </CardPremium>

          <CardPremium>
            <CardPremiumHeader>
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Gauge className="text-primary" size={24} />
              </div>
              <CardPremiumTitle className="text-xl">Save & Share</CardPremiumTitle>
              <CardPremiumDescription>
                Keep your routes and share with riding partners
              </CardPremiumDescription>
            </CardPremiumHeader>
          </CardPremium>
        </div>
      </section>

      {/* Design System Showcase */}
      <section className="container mx-auto px-6 py-16 border-t border-border/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="mb-4">Design System Preview</h2>
            <p className="text-muted-foreground">
              Phase 1 Complete: Rugged Refined Theme Foundation
            </p>
          </div>

          {/* Typography */}
          <div className="space-y-6">
            <h3>Typography</h3>
            <div className="space-y-3">
              <h1>Heading 1 - Instrument Serif</h1>
              <h2>Heading 2 - Instrument Serif</h2>
              <h3>Heading 3 - Instrument Serif</h3>
              <p className="text-lg">
                Body text using Inter - designed for exceptional readability and modern aesthetic.
              </p>
              <p className="text-muted-foreground">
                Muted text for secondary information and subtle details.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-6">
            <h3>Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Primary</Button>
              <Button variant="accent">Accent CTA</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">
                <MapPin size={20} />
              </Button>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-6">
            <h3>Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="h-24 rounded-md bg-primary shadow-sm" />
                <p className="text-sm font-medium">Primary</p>
                <p className="text-xs text-muted-foreground">Deep Slate Blue</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-md bg-accent shadow-sm" />
                <p className="text-sm font-medium">Accent</p>
                <p className="text-xs text-muted-foreground">Burnt Copper</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-md bg-secondary shadow-sm" />
                <p className="text-sm font-medium">Secondary</p>
                <p className="text-xs text-muted-foreground">Warm Sand</p>
              </div>
              <div className="space-y-2">
                <div className="h-24 rounded-md bg-muted shadow-sm" />
                <p className="text-sm font-medium">Muted</p>
                <p className="text-xs text-muted-foreground">Subtle Gray</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo showIcon={false} size="sm" />
            <p className="text-sm text-muted-foreground">
              © 2024 MotoMap. Premium route planning for discerning riders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
