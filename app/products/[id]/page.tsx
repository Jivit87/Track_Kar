import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import CopyLinkButton from "@/components/semiComponents/CopyLinkButton";
import ShareButton from "@/components/semiComponents/ShareButton";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductDetails = async ({ params }: Props) => {

  const { id } = await params;
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  const similarProducts = await getSimilarProducts(id);

  return (
    <div className="product-container">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-16 2xl:gap-28">
        <div className="flex-shrink-0 w-full xl:w-auto">
          <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] xl:max-w-[580px] mx-auto">
            <Image
              src={product.image}
              alt={product.title}
              width={580}
              height={400}
              className="w-full h-auto object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-5 pb-6 border-b border-gray-200">
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-[28px] text-secondary font-semibold leading-tight break-words">
                {product.title}
              </h1>

              <Link
                href={product.url}
                target="_blank"
                className="text-sm sm:text-base text-blue-700 hover:text-blue-900 opacity-70 hover:opacity-100 transition-all duration-200 w-fit"
              >
                Visit Product →
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <CopyLinkButton productSlug={id} />
              <ShareButton title={product.title} slug={product.url} />
            </div>
          </div>

          <div className="py-6 space-y-6">
            <div className="flex flex-col gap-2">
              <p className="text-2xl sm:text-3xl lg:text-[34px] text-secondary font-bold">
                {product.currency} {formatNumber(product.currentPrice)}
              </p>
              {product.originalPrice &&
                product.originalPrice !== product.currentPrice && (
                  <p className="text-lg sm:text-xl lg:text-[21px] text-gray-500 line-through">
                    {product.currency} {formatNumber(product.originalPrice)}
                  </p>
                )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    width={16}
                    height={16}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm font-semibold text-primary-orange">
                    {product.stars || "4.5"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    width={16}
                    height={16}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm font-semibold text-secondary">
                    {product.reviewsCount || 0} Reviews
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <span className="text-primary-green font-semibold">93% </span>
                of buyers have recommended this.
              </p>
            </div>
          </div>

          {/* Price Info Cards */}
          <div className="py-6 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency} ${formatNumber(
                  product.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency} ${formatNumber(
                  product.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency} ${formatNumber(
                  product.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency} ${formatNumber(
                  product.lowestPrice
                )}`}
              />
            </div>
          </div>

          {/* Modal */}
          <div className="pt-4">
            <Modal productId={id} />
          </div>
        </div>
      </div>

      <div className="flex justify-center py-8 sm:py-12">
        <Link
          href={product.url}
          target="_blank"
          className="btn w-full sm:w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px] max-w-[300px] sm:max-w-none px-6 py-3 hover:transform hover:scale-105 transition-all duration-200"
        >
          <Image
            src="/assets/icons/bag.svg"
            alt="shopping bag"
            width={22}
            height={22}
            className="flex-shrink-0"
          />
          <span className="text-base text-white font-medium">Buy Now</span>
        </Link>
      </div>

      {similarProducts && similarProducts?.length > 0 && (
        <div className="pb-5 sm:pb-10">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl section-text pb-2 font-bold text-gray-900 mb-4">
              Similar
              <span className="text-red-500 ml-3">Products</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-7 w-full">
              {similarProducts.map((product) => (
                <div key={product._id} className="w-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
