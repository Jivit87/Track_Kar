"use server";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types"
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl: string) {
    if (!productUrl) return;
  
    try {
      await connectToDB();
  
      const scrapedProduct = await scrapeAmazonProduct(productUrl);
      if (!scrapedProduct) return;
  
      const existingProduct = await Product.findOne({ url: scrapedProduct.url });
  
      if (existingProduct) {
        const updatedPriceHistory = [
          ...existingProduct.priceHistory,
          { price: scrapedProduct.currentPrice },
        ];
  
        const updatedProduct = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };
  
        const savedProduct = await Product.findOneAndUpdate(
          { url: scrapedProduct.url },
          updatedProduct,
          { upsert: true, new: true }
        );
  
        return savedProduct; 
      }
  
      const newProduct = await Product.findOneAndUpdate(
        { url: scrapedProduct.url },
        scrapedProduct,
        { upsert: true, new: true }
      );
  
      return newProduct; 
    } catch (error: any) {
      throw new Error(`Failed to create/update product: ${error.message}`);
    }
  }

export async function getProductById(productId: string) {

    try {
        await connectToDB();

        const product = await Product.findOne({ _id: productId })

        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProducts() {

    try {
        await connectToDB()

        const products = await Product.find().sort({ _id: -1 });;

        return products;
    } catch (error) {
        console.log(error);
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        await connectToDB();

        const currentProduct = await Product.findById(productId);

        if (!currentProduct) return null;

        const similarProducts = await Product.find({
            _id: { $ne: productId },
        }).limit(4);

        return similarProducts;
    } catch (error) {
        console.log(error)
    }
}

export async function addUserEmailToProduct(productId: string, userEmail: string) {

    try {
        const product = await Product.findById(productId);

        if (!product) return;

        const userExists = product.users.some((user: User) => user.email === userEmail);

        if (!userExists) {
            product.users.push({email: userEmail});

            await product.save();

            const emailContent = await generateEmailBody(product, "WELCOME");

            await sendEmail(emailContent, [userEmail]);
        }
    }catch(error){
        console.log(error)
    }
    
}


export async function getProductByUrl(productUrl: string) {
    try {
      await connectToDB();
  
      const product = await Product.findOne({ url: productUrl });
  
      if (!product) return null;
  
      return product;
    } catch (error) {
      console.error("Failed to fetch product by URL:", error);
      return null;
    }
  }