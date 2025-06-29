import { useState } from 'react';
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
  
  const expanded = onToggle ? isExpanded : internalExpanded;
  const handleToggle = onToggle ? onToggle : () => setInternalExpanded(!internalExpanded);

  return (
    <div className={`border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <button
        onClick={handleToggle}
        className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className="flex justify-between items-start">
          <Text variant="h4" color="primary" className="pr-4">
            {faq.question}
          </Text>
          <span className="text-gray-500 text-xl flex-shrink-0">
            {expanded ? '−' : '+'}
          </span>
        </div>
      </button>
      
      {expanded && (
        <div className="px-6 pb-4">
          <div className="pt-2 border-t border-gray-100">
            <Text variant="body" color="secondary" className="leading-relaxed whitespace-pre-line">
              {faq.answer}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
}; 