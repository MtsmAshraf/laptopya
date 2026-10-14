import { ButtonHTMLAttributes, AnchorHTMLAttributes, forwardRef, ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'ghost' | 'red' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'href'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const sizes: Record<ButtonSize, string> = {
      sm: 'h-9 px-3 text-xs',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-6 text-base',
    };
    
    const variants: Record<ButtonVariant, string> = {
      primary: 'btn btn-primary',
      ghost: 'btn btn-ghost',
      red: 'btn btn-red',
      link: 'link-underline bg-transparent text-brand-ink p-0 h-auto',
    };

    const classes = cn(variants[variant], sizes[size], className);

    // If href is provided, render a Next.js Link
    if (href) {
      const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <Link 
          href={href} 
          className={classes} 
          {...anchorProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    // Otherwise, render a standard button
    return (
      <button 
        ref={ref as React.Ref<HTMLButtonElement>} 
        className={classes} 
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';