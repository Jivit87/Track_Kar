import { PriceHistoryItem, Product } from "@/types";

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

const THRESHOLD_PERCENTAGE = 40;

// Extracting price from string or DOM textContent
export function extractPrice(...elements: any): string {
  for (const element of elements) {
    let priceText = "";

    if (typeof element === 'string') {
      priceText = element.trim();
    } else if (element && element.textContent) {
      priceText = element.textContent.trim();
    }

    if (priceText) {
      const cleanPrice = priceText.replace(/[^\d.]/g, "");
      const firstPrice = cleanPrice.match(/\d+\.\d{2}/)?.[0];
      return firstPrice || cleanPrice;
    }
  }
  return "";
}

// Extracting currency from string or DOM
export function extractCurrency(input: any): string {
  if (typeof input === 'string') {
    return input.trim().slice(0, 1);
  }

  if (input && input.textContent) {
    return input.textContent.trim().slice(0, 1);
  }

  return "";
}

export function extractDescription(input: any): string {
  if (typeof input === 'string') {
    return input.trim();
  }

  if (input && input.textContent) {
    return input.textContent.trim();
  }

  return "";
}

export function getHighestPrice(priceList: PriceHistoryItem[]): number {
  if (!priceList?.length) return 0;
  return Math.max(...priceList.map(p => p.price));
}

export function getLowestPrice(priceList: PriceHistoryItem[]): number {
  if (!priceList?.length) return 0;
  return Math.min(...priceList.map(p => p.price));
}

export function getAveragePrice(priceList: PriceHistoryItem[]): number {
  if (!priceList?.length) return 0;
  const sum = priceList.reduce((acc, item) => acc + item.price, 0);
  return sum / priceList.length;
}

export function getEmailNotifyType(
  scrapedProduct: Product,
  currentProduct: Product
): keyof typeof Notification | null {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return "LOWEST_PRICE";
  }

  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return "CHANGE_OF_STOCK";
  }

  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return "THRESHOLD_MET";
  }

  return null;
}

export function formatNumber(num: number = 0): string {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
