import { Star } from 'lucide-react';

const TicketReviews = ({ reviews = [] }) => {
  if (!reviews.length) {
    return (
      <div className="text-center py-10 bg-base-200 rounded-xl border my-4">
        <p className="text-base-contentfont-medium">
          No reviews yet for this ticket.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Passenger Reviews ({reviews.length})
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map(review => (
          <div
            key={review._id}
            className="bg-base-200 rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base-content text-sm">
                  {review.userName}
                </h3>
                <span className="text-xs font-semibold text-primary uppercase">
                  {review.role}
                </span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={14}
                    className={
                      star <= review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  {review.rating}/5
                </span>
              </div>

              <span className="inline-block mb-3 px-3 py-1 text-xs font-bold rounded-full bg-primary/10 text-primary">
                {review.experience}
              </span>

              <p className="text-gray-500 text-sm leading-relaxed line-clamp-4 italic">
                “{review.text}”
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
              <div className="bg-neutral text-neutral-content rounded-full w-9 h-9 flex items-center justify-center font-bold text-sm">
                {review?.userImage}
              </div>
              <div>
                <p className="text-xs font-semibold text-base-content">
                  {review.tripName}
                </p>
                <p className="text-[11px] text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TicketReviews;
