import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import Searchbar from "@/components/Searchbar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="pl-6 md:px-10 py-20 bg-[#FFDCDC]/70">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <div className="px-6 py-2 w-fit rounded-[50px] backdrop-blur-md bg-blue-200/10 border border-blue-700/30 text-sm flex items-center gap-2 shadow-inner glassy-tube">
              <span>Smart Shopping Starts Here</span>
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </div>

            <h1 className="head-text pt-5">
              Unleash the Power of
              <div className="bg-red-400 inline-block px-3 py-0 rounded-[5px]">
                <span>
                  {" "}
                  Track<span className="text-white">_Kar</span>
                </span>
              </div>
            </h1>

            <p className="mt-6">
              Scrape Amazon with precision — get live product data, price
              history, and deal alerts effortlessly
            </p>

            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section px-6 sm:px-12 lg:px-20 py-12">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 rounded-full mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-700 text-sm font-medium">Hot Deals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trending
            <span className="text-red-500 ml-3">Products</span>
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular products searched by other users.
          </p>
        </div>
        <div className="flex flex-wrap gap-8 justify-center">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
