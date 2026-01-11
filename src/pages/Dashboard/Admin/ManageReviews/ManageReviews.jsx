import DataFetchError from '@/components/Shared/DataFetchError/DataFetchError';
import LoadingSpinner from '@/components/Shared/Loader/LoadingSpinner';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useFetch from '@/hooks/useFetch';
import useTitle from '@/hooks/useTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FaBullhorn, FaEdit, FaEye } from 'react-icons/fa';
import { FaDeleteLeft, FaNoteSticky } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ManageReviews = () => {
  useTitle('Manage Reviews');
  const { user, loading } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();
  const {
    data: reviews,
    isLoading,
    error,
    isError,
    refetch,
  } = useFetch(['all-reviews'], `/reviews/all`, true);

  const displayedReviews = reviews?.filter(r => r.isDisplay).length;

  const updateData = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.patch(`/reviews/${data.id}`, data);
        return res.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (response, data) => {
      console.log(response);
      if (response.modifiedCount) {
        toast.success('Review Updated Successfully');
      }
      queryClient.setQueryData(['all-reviews'], oldData => {
        return oldData.map(el =>
          el._id === data.id ? { ...el, isDisplay: data.currentStatus } : el
        );
      });
    },
    onError: error => {
      console.log(error);
      toast.error(error.message || 'Something went wrong');
    },
  });

  const { isPending } = updateData;

  const handleToggleReview = (id, currentStatus) => {
    if (!currentStatus && displayedReviews >= 6) {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Reached',
        text: 'You can only advertise up to 6 tickets at a time. Please unadvertise one first.',
      });
      return;
    }
    const newData = { id, currentStatus: !currentStatus };
    updateData.mutate(newData);
  };

  const deleteReview = useMutation({
    mutationFn: async id => {
      try {
        const result = await secureApi.delete(`/reviews/${id}`);
        return result;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (res, data) => {
      queryClient.setQueryData(['all-reviews'], prevData => {
        return prevData.filter(item => item._id !== data);
      });
      if (data.data.deletedCount) {
        toast.success(`Successfully deleted the review`);
      }
    },
    onError: error => {
      toast.error(error.response || 'something went wrong');
    },
  });

  const handleDelete = review => {
    Swal.fire({
      title: `Are you sure you want to delete "${review.tripName} review"?`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#40916c',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteReview.mutate(review._id);
        // toast.info(`Review has been deleted.`, {
        //   position: 'top-center',
        // });
      }
    });
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  if (isError) {
    const isNotFound = error?.response?.status === 404;
    if (isNotFound) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="text-9xl mb-4">🎫</div>
          <h2 className="text-3xl font-bold text-base-content mb-2">
            Adverties Tickets Not Found
          </h2>
          <p className="text-base-content/60 mb-6 max-w-md">
            There are something went wrong , please try again later.
          </p>
          <Link to="/" className="btn btn-primary text-white">
            Home
          </Link>
        </div>
      );
    }
    return <DataFetchError error={error} refetch={refetch} />;
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-base-content">
            Manage All Reviews
          </h2>
          <p className="text-base-content/60">
            Highlight top Reviews on the Homepage.
          </p>
        </div>

        <div
          className={`badge ${
            displayedReviews >= 6 ? 'badge-error text-white' : 'badge-primary'
          } p-4 text-sm font-bold`}
        >
          Slots Used: {displayedReviews} / 6
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Reviews</th>
                <th>User</th>
                <th>Rating</th>
                <th className="text-center">Reviews Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr key={review.id} className="hover">
                  <th>{index + 1}</th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="rounded-xl w-16 h-10">
                          <img
                            src={review.userImg}
                            alt="Review"
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div
                        className="font-bold max-w-[200px] truncate"
                        title={review.text}
                      >
                        {review.text}
                      </div>
                    </div>
                  </td>

                  <td className="text-sm opacity-70">{review.userName}</td>

                  <td className="font-bold">{review.rating} out of 5</td>

                  <td className="text-center">
                    {review.isDisplay ? (
                      <div className="badge badge-accent text-white gap-2">
                        <FaBullhorn /> Live on Home
                      </div>
                    ) : (
                      <div className="badge badge-ghost opacity-50">Hidden</div>
                    )}
                  </td>

                  <td className="text-center flex items-center gap-3 ">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: `${review.tripName}`,
                          text: `${review.text}`,
                          icon: 'info',
                        });
                      }}
                    >
                      <FaEye></FaEye>
                    </button>
                    <button onClick={() => handleDelete(review)}>
                      <FaDeleteLeft></FaDeleteLeft>
                    </button>
                    <div>
                      {isPending ? (
                        'loading'
                      ) : (
                        <input
                          type="checkbox"
                          defaultValue={review.isDisplay}
                          className={`toggle ${
                            review.isDisplay ? 'toggle-accent' : 'toggle-base'
                          }`}
                          checked={review.isDisplay}
                          onChange={() =>
                            handleToggleReview(review._id, review.isDisplay)
                          }
                        />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-base-content/40 mt-4 text-center">
        Note: Changes reflect immediately on the user homepage.
      </p>
    </div>
  );
};

export default ManageReviews;
