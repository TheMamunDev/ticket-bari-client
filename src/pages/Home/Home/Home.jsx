import Swal from 'sweetalert2';
import { FaReact } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="p-8 min-h-screen">
      <section className="max-w-4xl mx-auto">
        <div data-aos="fade-up" className="text-center">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <FaReact /> Well come to ticket bari
          </h1>
        </div>
      </section>
    </div>
  );
}
