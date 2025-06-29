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
        <div className="text-center py-20">
          <Text variant="body" color="muted" align="center">
            Selecciona una marca para ver las preguntas frecuentes
          </Text>
        </div>
      )}
    </PageTemplate>
  );
};
