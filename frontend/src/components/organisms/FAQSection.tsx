import { useState, useEffect } from 'react';
import { Text, Spinner } from '../atoms';
import { FAQItem } from '../molecules';
import { BrandWithFAQs, apiService } from '../../services/api';

interface FAQSectionProps {
  brandId: string;
  className?: string;
}

export const FAQSection = ({ brandId, className = '' }: FAQSectionProps) => {
  const [data, setData] = useState<BrandWithFAQs | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  useEffect(() => {
    const fetchBrandFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const brandData = await apiService.getBrandWithFAQs(brandId);
        setData(brandData);
        setExpandedItem(0);
      } catch (err) {
        setError('Error al cargar las preguntas frecuentes');
        console.error('Error fetching brand FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandFAQs();
  }, [brandId]);

  const toggleExpanded = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  if (loading) {
    return (
      <div className={`w-full max-w-3xl mx-auto ${className}`}>
        <div className="flex flex-col items-center justify-center py-16">
          <Spinner size="lg" color="gray" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-3xl mx-auto ${className}`}>
        <div className="text-center text-gray-500 py-8">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <Text variant="h1" color="primary" align="center" className="mb-8 text-5xl font-light tracking-wider">
          FAQ
        </Text>
      </div>

      <div className="space-y-3">
        {data.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isExpanded={expandedItem === index}
            onToggle={() => toggleExpanded(index)}
          />
        ))}
      </div>
    </div>
  );
}; 