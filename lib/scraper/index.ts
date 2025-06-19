"use server"
import axios from 'axios';
import { load } from 'cheerio';
import { extractCurrency, extractPrice } from "../utils";

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

export async function scrapeAmazonProduct(url: string) {
    if (!url) return;

    try {
        const apiUrl = `https://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&url=${encodeURIComponent(url)}`;

        // Mimicing browser headers
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Connection': 'keep-alive',
        };

        // Fetching the page HTML
        const response = await axios.get(apiUrl, { headers });
        const html = response.data;
        const $ = load(html);

        // Helper functions for Cheerio
        const getTextContent = (selector: string): string => {
            return $(selector).first().text().trim();
        };
        const getAttribute = (selector: string, attribute: string): string => {
            return $(selector).first().attr(attribute) || '';
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

        const currentPrice = extractPrice(currentPriceText);
        const originalPrice = extractPrice(originalPriceText);
        const currency = extractCurrency(currencySymbol);

        const data = {
            url,
            currency: currency || "$",
            image: imageUrls[0] || '',
            title,
            currentPrice: Number(currentPrice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [],
            discountRate: Number(discountRate),
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            lowestPrice: Number(currentPrice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice) || Number(originalPrice),
        };

        return data;
    } catch (error: any) {
        console.log('Scraping error:', error);
        return null;
    }
}