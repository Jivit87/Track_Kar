import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";
import How from "@/components/How";

const Home = async () => {
  const allProducts = await getAllProducts();
  const count = allProducts.length;

  return (
    <>
      <section className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20 bg-[#FFDCDC]/70">
      <div className="flex flex-col lg:flex-row justify-between gap-8 sm:gap-12 md:gap-16 ml-6">
          <div className="flex flex-col justify-center">
            <div className="px-4 sm:px-6 py-2 w-fit rounded-[50px] backdrop-blur-md bg-blue-200/10 border border-blue-700/30 text-xs sm:text-sm flex items-center gap-2 shadow-inner glassy-tube">
              <span>Smart Shopping Starts Here</span>
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={14}
                height={14}
                className="sm:w-4 sm:h-4"
              />
            </div>

            <h1 className="text-3xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-6xl font-extrabold text-gray-900 pt-3 sm:pt-5 leading-tight">
              <span className="block">Unleash the</span>
              <span className="block">Power of</span>
              <span className="block mt-2">
                <span className="bg-red-400 inline-block px-2 sm:px-3 py-1 rounded-[5px]">
                  <span className="text-white">
                    Track<span className="text-white">_Kar</span>
                  </span>
                </span>
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg">
              Scrape Amazon with precision — get live product data, price
              history, and deal alerts effortlessly
            </p>

            <div className="mt-0 sm:mt-8">
              <Searchbar />
            </div>
          </div>
          <div className="flex justify-center xl:justify-end">
            <HeroCarousel />
          </div>
        </div>
      </section>

      <section className="trending-section px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-100 rounded-full mb-3 sm:mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 text-xs sm:text-sm font-medium">
              Hot Deals
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Trending
            <span className="text-red-500 ml-2 sm:ml-3">Products</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover the most popular products searched by other users.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <How count={count} />
    </>
  );
};

export default Home;
