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
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchBrandFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const brandData = await apiService.getBrandWithFAQs(brandId);
        setData(brandData);
        setExpandedItems(new Set([0]));
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
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  if (loading) {
    return (
      <div className={`w-full max-w-4xl mx-auto mt-8 ${className}`}>
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="lg" />
          <Text variant="body" color="muted" className="mt-4">
            Cargando preguntas frecuentes...
          </Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`w-full max-w-4xl mx-auto mt-8 ${className}`}>
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <Text variant="body" color="error" align="center">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`w-full max-w-4xl mx-auto mt-8 ${className}`}>
      <div className="text-center mb-8">
        <Text variant="h2" color="primary" align="center" className="mb-2">
          PREGUNTAS FRECUENTES
        </Text>
        <Text variant="h3" color="secondary" align="center" className="mb-4">
          PREGUNTAS FRECUENTES AL VENDER
        </Text>
        <Text variant="subtitle" color="secondary" align="center">
          <span className="font-medium">{data.brand.name}</span>
        </Text>
      </div>

      <div className="space-y-4">
        {data.faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isExpanded={expandedItems.has(index)}
            onToggle={() => toggleExpanded(index)}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Text variant="caption" color="muted">
          Más información en:{' '}
          <a
            href={data.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {data.brand.url}
          </a>
        </Text>
      </div>
    </div>
  );
}; 