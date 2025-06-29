import { useState, useRef, useEffect } from 'react';
import { Text } from '../atoms';
import { FAQ } from '../../services/api';

interface FAQItemProps {
  faq: FAQ;
  isExpanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export const FAQItem = ({ 
  faq, 
  isExpanded = false, 
  onToggle,
  className = '' 
}: FAQItemProps) => {
  const [internalExpanded, setInternalExpanded] = useState(isExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
  const expanded = onToggle ? isExpanded : internalExpanded;
  const handleToggle = onToggle ? onToggle : () => setInternalExpanded(!internalExpanded);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(expanded ? contentRef.current.scrollHeight : 0);
    }
  }, [expanded, faq.answer]);

  useEffect(() => {
    if (expanded && containerRef.current) {
      setTimeout(() => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollOffset = 20;

        const elementBottom = rect.bottom + contentHeight;
        const isFullyVisible = rect.top >= scrollOffset && elementBottom <= viewportHeight - scrollOffset;

        if (!isFullyVisible) {
          container.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }
  }, [expanded, contentHeight]);

  return (
    <div ref={containerRef} className={`border-b border-gray-100 py-6 ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full text-left focus:outline-none group"
      >
        <div className="flex justify-between items-start">
          <Text variant="h4" color="primary" className="mb-3 font-medium pr-4 group-hover:text-gray-600 transition-colors">
            {faq.question}
          </Text>
          <span 
            className={`text-gray-400 text-lg flex-shrink-0 transition-transform duration-300 ease-in-out ${
              expanded ? 'rotate-45' : 'rotate-0'
            }`}
          >
            +
          </span>
        </div>
      </button>
      
      <div
        style={{ height: contentHeight }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pt-2">
          <Text 
            variant="body" 
            color="secondary" 
            className={`leading-relaxed whitespace-pre-line transition-opacity duration-300 ease-in-out ${
              expanded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {faq.answer}
          </Text>
        </div>
      </div>
    </div>
  );
}; 