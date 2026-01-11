import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

import { SearchX } from 'lucide-react';
import {
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaPlane,
  FaShip,
  FaSnowflake,
  FaTrain,
  FaWifi,
} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';

const RelevantTickets = ({ relevantTickets: randomDeals }) => {
  const navigate = useNavigate();
  const getTransportStyle = type => {
    switch (type.toLowerCase()) {
      case 'bus':
        return { icon: <FaBus />, color: 'badge-primary' };
      case 'train':
        return { icon: <FaTrain />, color: 'badge-secondary' };
      case 'launch':
        return { icon: <FaShip />, color: 'badge-info' };
      case 'plane':
        return { icon: <FaPlane />, color: 'badge-warning' };
      default:
        return { icon: <FaBus />, color: 'badge-ghost' };
    }
  };
  if (!randomDeals?.length)
    return (
      <div className="w-full py-10 flex flex-col items-center justify-center text-center bg-base-100 rounded-xl border border-gray-100">
        <SearchX size={32} className="text-gray-400 mb-2" />
        <p className="text-gray-600 font-medium text-sm">
          No Relevant Ticket found right now. Browse{' '}
          <Link to="/all-tickets" className="text-primary">
            All Tickets
          </Link>
        </p>
      </div>
    );

  return (
    <section className="py-12 px-4 max-w-[1400px] mx-auto">
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
          Explore
        </h3>
        <h2 className="text-3xl text-base-content font-normal">
          Others Tickets
        </h2>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper !pb-12"
      >
        {randomDeals?.map(deal => (
          <SwiperSlide key={deal._id} className="h-auto">
            <div
              onClick={() => navigate(`/ticket/${deal._id}`)}
              className="flex flex-col h-full group cursor-pointer bg-transparent"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden mb-3">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  className={`absolute top-3 right-3 badge ${
                    getTransportStyle(deal.transportType).color
                  } badge-lg gap-2 text-white font-bold shadow-sm`}
                >
                  {getTransportStyle(deal.transportType).icon}{' '}
                  {deal.transportType}
                </div>

                <div className="absolute top-3 left-3 badge badge-neutral bg-opacity-80 backdrop-blur-sm text-white">
                  {deal.quantity} Seats Left
                </div>

                <div className="absolute bottom-0 right-0 bg-white px-4 py-1.5 rounded-tl-2xl shadow-sm z-10">
                  <span className="text-lg font-bold text-gray-900">
                    ${deal.price}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <h2
                  className="card-title text-lg font-bold text-base-content line-clamp-1 w-2/3"
                  title={deal.title}
                >
                  {deal.title}
                </h2>
                <div className="text-sm text-base-content/70 mb-2 flex items-center gap-2">
                  <span className="font-semibold">{deal.from}</span>
                  <span className="text-primary text-xs">●─────●</span>
                  <span className="font-semibold">{deal.to}</span>
                </div>
                <div className="flex gap-4 text-xs text-base-content/80 bg-base-100 p-2 rounded-lg mb-3">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-primary" />
                    <span>{deal.departureDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-secondary" />
                    <span>{deal.departureTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {deal.perks.slice(0, 3).map((perk, index) => (
                    <div
                      key={index}
                      className="badge badge-outline badge-xs gap-1 py-2"
                    >
                      {perk === 'AC' && (
                        <FaSnowflake className="text-cyan-400" />
                      )}
                      {perk === 'WiFi' && <FaWifi className="text-blue-400" />}
                      {perk}
                    </div>
                  ))}
                  {deal.perks.length > 3 && (
                    <span className="text-xs opacity-50">
                      +{deal.perks.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RelevantTickets;
