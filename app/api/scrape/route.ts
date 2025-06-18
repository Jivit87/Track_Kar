// app/api/scrape/route.ts
import { NextResponse } from "next/server";
import { scrapeAndStoreProduct } from "@/lib/actions";

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  try {
    const product = await scrapeAndStoreProduct(url);

    if (!product || !product._id) {
      return NextResponse.json({ error: "Product not created" }, { status: 500 });
    }

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}