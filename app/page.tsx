import BannerProduct from "@/components/banner-product";
import CarouselTextBanner from "@/components/carousel-text-banner";
import ChooseCategory from "@/components/choose-category";
import FeaturedProducts from "@/components/featured-products";
import ProfileSelector from "@/components/ProfileSelector";

export default function Home() {
  return (
      <main>
      <CarouselTextBanner/>
      <FeaturedProducts/>
      <ProfileSelector/>
      <ChooseCategory/>
      <BannerProduct/>
      </main>
  );
}
