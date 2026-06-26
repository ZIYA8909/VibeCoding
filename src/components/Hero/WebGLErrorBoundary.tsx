import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Rendering Error caught by Boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Fallback UI if WebGL crashes
      return (
        <div className="w-full h-full min-h-[300px] md:min-h-[500px] flex items-center justify-center p-8 select-none">
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Animated outer glass ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-hex/20 animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-white/5 bg-white/5 backdrop-blur-sm" />
            
            {/* Fallback Vector Graphic SVG */}
            <svg 
              className="w-20 h-20 text-primary-hex/80 relative z-10 animate-float"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>

            {/* Glowing background blob */}
            <div className="absolute w-40 h-40 bg-primary-hex/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
