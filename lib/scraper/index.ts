import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import { extractCurrency, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  let browser = null;
  let page = null;

  try {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath || '/usr/bin/google-chrome',
      headless: chromium.headless,
    });

    page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    await page.setViewport({ width: 1366, height: 768 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForSelector('#productTitle', { timeout: 10000 });

    const productData = await page.evaluate(() => {
      const getText = (selector: string): string => {
        const el = document.querySelector(selector);
        return el?.textContent?.trim() || '';
      };
      const getAttr = (selector: string, attr: string): string => {
        const el = document.querySelector(selector);
        return el?.getAttribute(attr) || '';
      };

      const title = getText('#productTitle');
      const currentPriceText =
        getText('.priceToPay span.a-price-whole') ||
        getText('.a-size-base.a-color-price') ||
        getText('.a-button-selected .a-color-base') ||
        getText('.a-price-whole');

      const originalPriceText =
        getText('#priceblock_ourprice') ||
        getText('.a-price.a-text-price span.a-offscreen') ||
        getText('#listPrice') ||
        getText('#priceblock_dealprice');

      const availability = getText('#availability span').toLowerCase();
      const outOfStock = availability.includes('out of stock') || availability.includes('unavailable');

      const imageData =
        getAttr('#imgBlkFront', 'data-a-dynamic-image') ||
        getAttr('#landingImage', 'data-a-dynamic-image') ||
        '{}';

      let imageUrls: string[] = [];
      try {
        const imageObj = JSON.parse(imageData);
        imageUrls = Object.keys(imageObj);
      } catch {
        const fallbackImage = getAttr('#imgBlkFront', 'src') || getAttr('#landingImage', 'src');
        if (fallbackImage) imageUrls = [fallbackImage];
      }

      const currencySymbol = getText('.a-price-symbol');
      const discountText = getText('.savingsPercentage').replace(/[-%]/g, '');

      return {
        title,
        currentPriceText,
        originalPriceText,
        outOfStock,
        imageUrls,
        currencySymbol,
        discountRate: discountText,
      };
    });

    const currentPrice = extractPrice(productData.currentPriceText);
    const originalPrice = extractPrice(productData.originalPriceText);
    const currency = extractCurrency(productData.currencySymbol);

    const data = {
      url,
      currency: currency || '$',
      image: productData.imageUrls[0] || '',
      title: productData.title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(productData.discountRate),
      category: 'category',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: productData.outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    return data;
  } catch (error: any) {
    console.error('Scraping error:', error);
    return null;
  } finally {
    if (page) await page.close();
    if (browser) await browser.close();
  }
}