import { BrandSettings } from '../models/brand-setting';

/** 
* Configuraciones específicas para cada marca
*/

const brandSettings: BrandSettings[] = [
  {
    brandId: "karyn_coo",
    logistics: {
      requiresWashing: false,
      requiresWorkshopReview: false,
      shippingOptions: ['home_pickup', 'blue_express'],
    },
    payments: {
      creditEnabled: true,
      bankTransferEnabled: true,
      creditPercentage: 100,
      transferPercentage: 80,
    },
    faq: {
      showCouponsPolicy: true,
    },
  },
  {
    brandId: "andesgear",
    logistics: {
      requiresWashing: false,
      requiresWorkshopReview: false,
      shippingOptions: ['home_pickup', 'blue_express'],
    },
    payments: {
      creditEnabled: false,
      bankTransferEnabled: true,
      transferPercentage: 100,
    },
    faq: {
      showCouponsPolicy: false,
    },
  },
  {
    brandId: "milu_rugs",
    logistics: {
      requiresWashing: true,
      washingCost: 10000,
      requiresWorkshopReview: false,
      shippingOptions: ['home_pickup'],
    },
    payments: {
      creditEnabled: true,
      bankTransferEnabled: true,
      creditPercentage: 100,
      transferPercentage: 80,
    },
    faq: {
      showCouponsPolicy: true,
    },
  },
  {
    brandId: "kokoro",
    logistics: {
      requiresWashing: false,
      requiresWorkshopReview: true,
      shippingOptions: ['home_pickup', 'blue_express'],
    },
    payments: {
      creditEnabled: true,
      bankTransferEnabled: true,
      creditPercentage: 100,
      transferPercentage: 80,
    },
    faq: {
      showCouponsPolicy: true,
    },
  },
];

export default brandSettings;
