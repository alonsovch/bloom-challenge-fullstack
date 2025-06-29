import { ReactNode, createElement } from 'react';

interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'subtitle' | 'caption';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'white';
  align?: 'left' | 'center' | 'right';
  children: ReactNode;
  className?: string;
}

export const Text = ({ 
  variant = 'body', 
  color = 'primary', 
  align = 'left',
  children, 
  className = '' 
}: TextProps) => {
  const variantClasses = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-base',
    subtitle: 'text-lg',
    caption: 'text-sm'
  };
  
  const colorClasses = {
    primary: 'text-gray-800',
    secondary: 'text-gray-600',
    muted: 'text-gray-500',
    error: 'text-red-600',
    white: 'text-white'
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  const element = variant.startsWith('h') ? variant : 'p';
  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${alignClasses[align]} ${className}`;
  
  return createElement(element, { className: classes }, children);
}; 