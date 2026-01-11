import HeroSliderSafe from '@/components/Home/HeroSliderSafe';
import Advertiesment from '@/components/Home/Advertiesment';
import LatestTickets from '@/components/Home/LatestTickets';
import PopularDestinations from '@/components/Home/PopularDestinations';
import Newsletter from '@/components/Home/NewsLatter';
import SearchForm from '@/components/Shared/SearchForm/SearchForm';
import useTitle from '@/hooks/useTitle';
import Testimonials from '@/components/Home/Testimonials';
import BusPartners from '@/components/Home/BusPertners';
import FaqSection from '@/components/Home/Faq';

export default function Home() {
  useTitle('Home');
  return (
    <div className="min-h-screen max-w-11/12 mx-auto">
      <HeroSliderSafe></HeroSliderSafe>
      <SearchForm redirectTo="all-tickets"></SearchForm>
      <Advertiesment></Advertiesment>
      <LatestTickets></LatestTickets>
      <PopularDestinations></PopularDestinations>
      <BusPartners></BusPartners>
      <Testimonials></Testimonials>
      <FaqSection></FaqSection>
      <Newsletter></Newsletter>
    </div>
  );
}
