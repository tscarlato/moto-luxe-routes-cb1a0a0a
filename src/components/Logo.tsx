import { MapPin } from "lucide-react";

interface LogoProps {
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", showIcon = true, size = "md" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl lg:text-5xl",
  };

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <div className="relative">
          <MapPin 
            size={iconSizes[size]} 
            className="text-accent" 
            strokeWidth={2.5}
          />
          <div className="absolute inset-0 blur-sm opacity-30">
            <MapPin 
              size={iconSizes[size]} 
              className="text-accent" 
              strokeWidth={2.5}
            />
          </div>
        </div>
      )}
      <span className={`font-serif font-normal tracking-tight ${sizeClasses[size]}`}>
        Moto<span className="text-accent">Map</span>
      </span>
    </div>
  );
};

export default Logo;
