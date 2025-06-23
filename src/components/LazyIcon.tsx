import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

// Common icon names that are used in the app
type IconName =
  | 'Heart'
  | 'Clock'
  | 'Calendar'
  | 'ArrowLeft'
  | 'Search'
  | 'X'
  | 'ChevronDown'
  | 'User'
  | 'Mail'
  | 'Phone';

interface LazyIconProps {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

// Create a cache for loaded icons to avoid re-importing
const iconCache = new Map<IconName, React.ComponentType<any>>();

// Simple fallback icon component
const FallbackIcon: React.FC<{ className?: string; size?: number }> = ({
  className,
  size = 24
}) => (
  <div
    className={cn("inline-block bg-slate-300 dark:bg-slate-600 rounded", className)}
    style={{ width: size, height: size }}
  />
);

const LazyIcon: React.FC<LazyIconProps> = ({
  name,
  className,
  size = 24,
  strokeWidth = 2
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if icon is already cached
    if (iconCache.has(name)) {
      setIconComponent(() => iconCache.get(name)!);
      setIsLoading(false);
      return;
    }

    // Load the icon dynamically
    const loadIcon = async () => {
      try {
        const module = await import('lucide-react');
        const LoadedIcon = module[name];

        if (LoadedIcon) {
          // Cache the icon for future use
          iconCache.set(name, LoadedIcon);
          setIconComponent(() => LoadedIcon);
        } else {
          // Fallback to a generic icon if the specific one doesn't exist
          const GenericIcon = module.Square || FallbackIcon;
          iconCache.set(name, GenericIcon);
          setIconComponent(() => GenericIcon);
        }
      } catch (error) {
        console.warn(`Failed to load icon ${name}, using fallback:`, error);
        iconCache.set(name, FallbackIcon);
        setIconComponent(() => FallbackIcon);
      } finally {
        setIsLoading(false);
      }
    };

    loadIcon();
  }, [name]);

  // Show loading state
  if (isLoading) {
    return (
      <div
        className={cn("inline-block bg-slate-200 dark:bg-slate-700 rounded animate-pulse", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  // Render the loaded icon
  if (IconComponent) {
    return (
      <IconComponent
        className={className}
        size={size}
        strokeWidth={strokeWidth}
      />
    );
  }

  // Ultimate fallback
  return <FallbackIcon className={className} size={size} />;
};

export default LazyIcon;
