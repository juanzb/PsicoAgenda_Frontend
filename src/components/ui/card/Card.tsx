import type { ReactNode, CSSProperties } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      className={`bg-white border border-border rounded-md shadow-card transition-all duration-300 hover:shadow-elevated ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`p-6 pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: CardProps) {
  return (
    <h3
      className={`text-xl font-bold text-foreground leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }: CardProps) {
  return (
    <p className={`text-sm text-muted-foreground mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardProps) {
  return (
    <div className={`p-6 pt-0 flex items-center ${className}`}>{children}</div>
  );
}
