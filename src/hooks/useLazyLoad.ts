import { useState, useEffect, useRef } from 'react';

interface UseLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useLazyLoad = (options: UseLazyLoadOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If already triggered and triggerOnce is true, don't observe again
    if (hasTriggered && triggerOnce) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;
        
        setIsIntersecting(isVisible);
        
        if (isVisible && triggerOnce) {
          setHasTriggered(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered]);

  return {
    elementRef,
    isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting,
    hasTriggered,
  };
};

// Hook for preloading modules when they're about to be needed
export const usePreloadModule = (moduleLoader: () => Promise<any>, trigger: boolean) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [module, setModule] = useState<any>(null);

  useEffect(() => {
    if (trigger && !isLoaded) {
      moduleLoader()
        .then((loadedModule) => {
          setModule(loadedModule);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.warn('Failed to preload module:', error);
        });
    }
  }, [trigger, isLoaded, moduleLoader]);

  return { isLoaded, module };
};

// Hook for lazy loading with intersection observer and module preloading
export const useLazyLoadWithPreload = (
  moduleLoader: () => Promise<any>,
  options: UseLazyLoadOptions = {}
) => {
  const { elementRef, isIntersecting } = useLazyLoad(options);
  const { isLoaded, module } = usePreloadModule(moduleLoader, isIntersecting);

  return {
    elementRef,
    isIntersecting,
    isLoaded,
    module,
  };
};
