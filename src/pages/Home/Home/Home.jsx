import Swal from 'sweetalert2';
import { FaReact } from 'react-icons/fa';
import HeroSlider from '@/components/Home/HeroSlider';
import HeroSliderSafe from '@/components/Home/HeroSliderSafe';
import Advertiesment from '@/components/Home/Advertiesment';
import LatestTickets from '@/components/Home/LatestTickets';
import PopularDestinations from '@/components/Home/PopularDestinations';
import Newsletter from '@/components/Home/NewsLatter';

export default function Home() {
  return (
    <div className="min-h-screen max-w-full mx-auto">
      <HeroSlider></HeroSlider>
      <Advertiesment></Advertiesment>
      <LatestTickets></LatestTickets>
      <PopularDestinations></PopularDestinations>
      <Newsletter></Newsletter>
    </div>
  );
}
