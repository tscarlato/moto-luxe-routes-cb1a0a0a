import * as React from "react";
import { cn } from "@/lib/utils";

const CardPremium = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg bg-card text-card-foreground shadow-elegant border border-border/50 transition-all duration-250 hover:shadow-elevated",
      className
    )}
    {...props}
  />
));
CardPremium.displayName = "CardPremium";

const CardPremiumHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardPremiumHeader.displayName = "CardPremiumHeader";

const CardPremiumTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-serif font-normal leading-tight tracking-tight",
      className
    )}
    {...props}
  />
));
CardPremiumTitle.displayName = "CardPremiumTitle";

const CardPremiumDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardPremiumDescription.displayName = "CardPremiumDescription";

const CardPremiumContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardPremiumContent.displayName = "CardPremiumContent";

const CardPremiumFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardPremiumFooter.displayName = "CardPremiumFooter";

export { 
  CardPremium, 
  CardPremiumHeader, 
  CardPremiumFooter, 
  CardPremiumTitle, 
  CardPremiumDescription, 
  CardPremiumContent 
};
