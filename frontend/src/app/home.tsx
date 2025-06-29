"use client";

import { useState } from "react";
import { PageTemplate } from "../components/templates";
import { FAQSection } from "../components/organisms";
import { Text } from "../components/atoms";

export const Home = () => {
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrandId(brandId);
  };

  return (
    <PageTemplate
      selectedBrandId={selectedBrandId}
      onBrandSelect={handleBrandSelect}
    >
      {selectedBrandId && (
        <FAQSection brandId={selectedBrandId} />
      )}

      {!selectedBrandId && (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🏷️</div>
          <Text variant="h3" color="secondary" align="center" className="mb-2">
            Elige una marca para comenzar
          </Text>
          <Text variant="body" color="muted" align="center">
            Selecciona una marca del menú superior para ver sus preguntas frecuentes específicas
          </Text>
        </div>
      )}
    </PageTemplate>
  );
};
