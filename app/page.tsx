import { HomeHero } from '@/components/sections/HomeHero';
import { BrandsStrip } from '@/components/sections/BrandsStrip';
import { CategoryGrid } from '@/components/sections/CategoryGrid';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { EditorialPromo } from '@/components/sections/EditorialPromo';
import { LaptopPicker } from '@/components/sections/LaptopPicker';
import { BestSellers } from '@/components/sections/BestSellers';
import { WhyUs } from '@/components/sections/WhyUs';
import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { BuyingGuides } from '@/components/sections/BuyingGuides';
import { Newsletter } from '@/components/sections/Newsletter';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandsStrip />
      <CategoryGrid />
      <NewArrivals />
      <EditorialPromo />
      <LaptopPicker />
      <BestSellers />
      <WhyUs />
      <CustomerReviews />
      <BuyingGuides />
      <Newsletter />
    </>
  );
}