"use server"
import puppeteer from 'puppeteer';
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    let browser;
    let page;

    try {
        // Launch browser
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        page = await browser.newPage();

        // Set user agent to mimic real browser
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        // Set viewport
        await page.setViewport({ width: 1366, height: 768 });

        // Navigate to the product page
        await page.goto(url, { 
            waitUntil: 'networkidle2',
            timeout: 30000 
        });

        // Wait for the main content to load
        await page.waitForSelector('#productTitle', { timeout: 10000 });

        // Extract product data using page.evaluate
        const productData = await page.evaluate(() => {
            // Helper function to get text content safely
            const getTextContent = (selector: string): string => {
                const element = document.querySelector(selector);
                return element ? element.textContent?.trim() || '' : '';
            };

            // Helper function to get attribute safely
            const getAttribute = (selector: string, attribute: string): string => {
                const element = document.querySelector(selector);
                return element ? element.getAttribute(attribute) || '' : '';
            };


            const title = getTextContent('#productTitle');

            // Extract current price (try multiple selectors)
            const currentPriceSelectors = [
                '.priceToPay span.a-price-whole',
                '.a-size-base.a-color-price',
                '.a-button-selected .a-color-base',
                '.a-price-whole'
            ];

            let currentPriceText = '';
            for (const selector of currentPriceSelectors) {
                currentPriceText = getTextContent(selector);
                if (currentPriceText) break;
            }

            // Extract original price (try multiple selectors)
            const originalPriceSelectors = [
                '#priceblock_ourprice',
                '.a-price.a-text-price span.a-offscreen',
                '#listPrice',
                '#priceblock_dealprice',
                '.a-size-base.a-color-price'
            ];

            let originalPriceText = '';
            for (const selector of originalPriceSelectors) {
                originalPriceText = getTextContent(selector);
                if (originalPriceText) break;
            }

            
            const availabilityText = getTextContent('#availability span').toLowerCase();
            const outOfStock = availabilityText.includes('currently unavailable') || 
                             availabilityText.includes('out of stock');

      
            let imageUrls: string[] = [];
            const imageData = getAttribute('#imgBlkFront', 'data-a-dynamic-image') ||
                            getAttribute('#landingImage', 'data-a-dynamic-image') ||
                            '{}';

            try {
                const imageObject = JSON.parse(imageData);
                imageUrls = Object.keys(imageObject);
            } catch (e) {
                // Fallback to single image if JSON parsing fails
                const singleImage = getAttribute('#imgBlkFront', 'src') ||
                                  getAttribute('#landingImage', 'src');
                if (singleImage) imageUrls = [singleImage];
            }

            
            const currencySymbol = getTextContent('.a-price-symbol');

           
            const discountText = getTextContent('.savingsPercentage');
            const discountRate = discountText.replace(/[-%]/g, '');

            

            return {
                title,
                currentPriceText,
                originalPriceText,
                outOfStock,
                imageUrls,
                currencySymbol,
                discountRate
            };
        });

        // Process the extracted data using your utility functions
        const currentPrice = extractPrice(productData.currentPriceText);
        const originalPrice = extractPrice(productData.originalPriceText);
        const currency = extractCurrency(productData.currencySymbol);

  
        const data = {
            url,
            currency: currency || "$",
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
        console.log('Scraping error:', error);
        return null;
    } finally {
        // Clean up resources
        if (page) await page.close();
        if (browser) await browser.close();
    }
}