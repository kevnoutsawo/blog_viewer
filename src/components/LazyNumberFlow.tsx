import React, { useState, useEffect, Suspense } from 'react';

// Simple fallback for NumberFlow while we fix dynamic imports
const NumberFlowFallback: React.FC<{ value: number; className?: string }> = ({ value, className }) => (
  <span className={className}>{value}</span>
);

interface LazyNumberFlowProps {
  value: number;
  className?: string;
  format?: Intl.NumberFormatOptions;
  locales?: string | string[];
  plugins?: any[];
  trend?: boolean;
  continuous?: boolean;
}

const LazyNumberFlow: React.FC<LazyNumberFlowProps> = ({
  value,
  className,
  format,
  locales,
  plugins,
  trend,
  continuous: useContinuous = true,
}) => {
  const [NumberFlowComponent, setNumberFlowComponent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load NumberFlow, but fallback gracefully if it fails
    const loadNumberFlow = async () => {
      try {
        const module = await import('@number-flow/react');
        setNumberFlowComponent(() => module.default);
      } catch (error) {
        console.warn('Failed to load NumberFlow, using fallback:', error);
        setNumberFlowComponent(() => NumberFlowFallback);
      } finally {
        setIsLoading(false);
      }
    };

    loadNumberFlow();
  }, []);

  // Fallback component while NumberFlow is loading
  const NumberFallback = () => (
    <span className={className}>
      {format ? new Intl.NumberFormat(locales, format).format(value) : value}
    </span>
  );

  if (isLoading || !NumberFlowComponent) {
    return <NumberFallback />;
  }

  // If we successfully loaded NumberFlow, use it with plugins
  if (NumberFlowComponent !== NumberFlowFallback) {
    try {
      return (
        <NumberFlowComponent
          value={value}
          className={className}
          format={format}
          locales={locales}
          plugins={useContinuous ? plugins : undefined}
          trend={trend}
        />
      );
    } catch (error) {
      console.warn('Error rendering NumberFlow, using fallback:', error);
      return <NumberFallback />;
    }
  }

  // Use fallback component
  return <NumberFlowComponent value={value} className={className} />;
};

export default LazyNumberFlow;
