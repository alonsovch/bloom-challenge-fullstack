import { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  error?: string;
  isLoading?: boolean;
}

export const Select = ({ 
  children, 
  error, 
  isLoading = false,
  className = '',
  disabled,
  ...props 
}: SelectProps) => {
  const baseClasses = 'w-full px-4 py-3 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-base transition-colors text-gray-900 [&>option]:text-gray-900 [&>option]:bg-white';
  const errorClasses = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200';
  const disabledClasses = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '';
  
  const classes = `${baseClasses} ${errorClasses} ${disabledClasses} ${className}`;
  
  return (
    <div className="relative">
      <select
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}; 