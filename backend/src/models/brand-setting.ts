/** 
* Debes completar este modelo como consideres adecuado
*/
export type BrandSettings = {
  brandId: string;
  logistics: {
    requiresWashing: boolean;
    washingCost?: number;
    requiresWorkshopReview: boolean;
    shippingOptions: ('home_pickup' | 'blue_express')[];
  };
  payments: {
    creditEnabled: boolean;
    bankTransferEnabled: boolean;
    creditPercentage?: number;
    transferPercentage?: number;
  };
  faq: {
    showCouponsPolicy: boolean;
  };
};