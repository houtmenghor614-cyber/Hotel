import HeroSection from '../components/home/HeroSection.jsx';
import SearchBox from '../components/home/SearchBox.jsx';
import PopularHotels from '../components/home/PopularHotels.jsx';
import FeaturedRooms from '../components/home/FeaturedRooms.jsx';
import WhyChooseUs from '../components/home/WhyChooseUs.jsx';
import AmenitiesSection from '../components/home/AmenitiesSection.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import Newsletter from '../components/home/Newsletter.jsx';

export default function Home() {
  return (
    <>
      <HeroSection />
      <SearchBox />
      <PopularHotels />
      <FeaturedRooms />
      <WhyChooseUs />
      <AmenitiesSection />
      <Testimonials />
      <Newsletter />
    </>
  );
}
