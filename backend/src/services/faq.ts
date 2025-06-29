import { BrandSettings } from '../models/brand-setting';
import { Brand } from '../models/brand';

export type FAQ = {
  question: string;
  answer: string;
};

export type FAQResponse = {
  brand: Pick<Brand, 'id' | 'name' | 'url'>;
  faqs: FAQ[];
};

const FAQService = {
  generateFAQs(brand: Brand): FAQResponse {
    if (!brand.settings) {
      throw new Error('Brand settings not found');
    }

    const faqs: FAQ[] = [
      // Pregunta 1: Siempre se muestra para todas las marcas
      {
        question: '¿Cómo puedo publicar un producto para la venta?',
        answer: '¡Publicar tu producto es muy fácil! Simplemente haz clic en "Vender", crea una cuenta y sigue el proceso de publicación. Una vez que completes el formulario de venta, la publicación será revisada por nuestro equipo y en un plazo máximo de 24 horas, te avisaremos si está aprobada o rechazada. Después de ser revisada y aprobada, se hará pública. Si hay algún problema, recibirás un correo electrónico pidiendo hacer cambios antes de que pueda ser aceptada.'
      },

      // Pregunta 2: Dinámica según logística
      {
        question: '¿Cómo envío mi artículo después de que alguien lo compra?',
        answer: this.generateShippingAnswer(brand.settings)
      },

      // Pregunta 3: Dinámica según métodos de pago
      {
        question: '¿Cómo y cuándo recibo el pago?',
        answer: this.generatePaymentAnswer(brand.settings)
      },

      // Pregunta 4: Dinámica según costos adicionales
      {
        question: '¿Hay cobros adicionales por vender mi producto por acá?',
        answer: this.generateAdditionalChargesAnswer(brand.settings)
      }
    ];

    // Pregunta 5: Solo si tiene cupones habilitados
    if (brand.settings.faq.showCouponsPolicy) {
      faqs.push({
        question: 'Política de uso de cupones',
        answer: this.generateCouponsAnswer(brand.url)
      });
    }

    return {
      brand: {
        id: brand.id,
        name: brand.name,
        url: brand.url
      },
      faqs
    };
  },

  generateShippingAnswer(settings: BrandSettings): string {
    const { shippingOptions } = settings.logistics;
    
    if (shippingOptions.includes('home_pickup') && shippingOptions.includes('blue_express')) {
      return 'Puedes enviar tu producto de dos formas: con retiro a domicilio o por Blue Express. Una vez que se confirme la compra, te contactaremos para coordinar el método de envío de tu preferencia.';
    } else if (shippingOptions.includes('home_pickup')) {
      return 'El envío se realiza únicamente con retiro a domicilio. Una vez que se confirme la compra, te contactaremos para coordinar el retiro del producto.';
    } else {
      return 'El envío se realiza por Blue Express. Una vez que se confirme la compra, te contactaremos para coordinar el envío.';
    }
  },

  generatePaymentAnswer(settings: BrandSettings): string {
    const { creditEnabled, bankTransferEnabled, creditPercentage, transferPercentage } = settings.payments;
    
    if (creditEnabled && bankTransferEnabled) {
      return `Puedes recibir el pago de dos formas: ${creditPercentage}% del valor en cupones de descuento para usar en el sitio, o ${transferPercentage}% del valor por transferencia bancaria. El pago se realiza una vez que el comprador confirme que recibió el producto en buenas condiciones.`;
    } else if (bankTransferEnabled) {
      return `Recibirás el ${transferPercentage}% del valor de la venta por transferencia bancaria. El pago se realiza una vez que el comprador confirme que recibió el producto en buenas condiciones.`;
    } else {
      return 'El pago se realiza una vez que el comprador confirme que recibió el producto en buenas condiciones.';
    }
  },

  generateAdditionalChargesAnswer(settings: BrandSettings): string {
    const { requiresWashing, washingCost, requiresWorkshopReview } = settings.logistics;
    
    if (requiresWashing && washingCost) {
      return `Sí, se descuenta un monto fijo de $${washingCost.toLocaleString('es-CL')} por el lavado y sanitizado del producto, ya que todos los productos pasan por este proceso antes de ser enviados al comprador.`;
    } else if (requiresWorkshopReview) {
      return 'Todos los productos pasan por nuestro taller para revisión. En caso de que el producto requiera tintorería para estar en condiciones óptimas, el costo se descontará del pago al vendedor.';
    } else {
      return 'No hay cobros adicionales. El producto se envía directamente al comprador una vez confirmada la compra.';
    }
  },

  generateCouponsAnswer(brandUrl: string): string {
    return `Los cupones que recibas por la venta de tus productos tienen las siguientes restricciones:
a. Se pueden utilizar únicamente para compras en el sitio web ${brandUrl}.
b. Tiene un tiempo máximo para ser utilizado de 6 meses.
c. Está restringido a un monto mínimo de pedido para que pueda utilizarse en el ecommerce. El monto mínimo está definido por el monto del cupón + $1.000 CLP.`;
  }
};

export default FAQService; 