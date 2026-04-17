import { ChevronDown } from "lucide-react";
import type { SelectHTMLAttributes, ReactNode } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
  error?: boolean;
}

export function Select({
  label,
  options,
  helperText,
  error,
  className = "",
  ...props
}: SelectProps): ReactNode {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <select
          className={`
            w-full appearance-none bg-muted/30 border rounded-xl px-4 py-2.5 text-xs font-bold text-foreground
            focus:outline-none focus:ring-2 transition-all cursor-pointer pr-10
            ${error 
              ? "border-destructive focus:ring-destructive/20" 
              : "border-border/60 focus:ring-primary/20 focus:border-primary group-hover:border-primary/40"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white text-foreground py-2">
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary transition-colors">
          <ChevronDown size={14} strokeWidth={3} />
        </div>
      </div>

      {helperText && (
        <span className={`text-[10px] font-bold ml-1 ${error ? "text-destructive" : "text-muted-foreground"}`}>
          {helperText}
        </span>
      )}
    </div>
  );
}
