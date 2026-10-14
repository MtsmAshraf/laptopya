import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full border border-brand-line bg-brand-paper px-3 py-2.5 text-sm placeholder:text-brand-muted focus:border-brand-ink focus:outline-none transition-colors',
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full border border-brand-line bg-brand-paper px-3 py-2.5 text-sm placeholder:text-brand-muted focus:border-brand-ink focus:outline-none transition-colors resize-y min-h-28',
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = 'Textarea';