import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, CheckCircle, Quote, Star, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxios from '@/hooks/useAxios';
import useAuth from '@/hooks/useAuth';
import { Spinner } from '@/components/ui/spinner';
import useFetch from '@/hooks/useFetch';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { set } from 'zod';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ReviewModal = ({ trip }) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  // const [reviewData, setReviewData] = useState(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const secureApi = useAxios();
  const { user, loading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const {
    data: review,
    isLoading,
    error: reviewError,
    isError: reviewIsError,
    refetch: reviewRefetch,
  } = useFetch(
    ['my-reviews', user?.email, trip._id],
    `/reviews/reviews?email=${user.email}&bookingId=${trip._id}`,
    true
  );

  let reviewData = review?.length === 0 ? false : review?.[0];
  console.log(review);

  const addReview = useMutation({
    mutationFn: async data => {
      try {
        const res = await secureApi.post('/reviews', data);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data, insertedData) => {
      console.log(data);
      if (data.insertedId) {
        queryClient.setQueryData(['my-reviews', user?.email, trip._id], old => {
          if (!old) return [data.review];
          return [...old, data.review];
        });
        reset();
        setRating(0);
        setOpen(false);
        toast.success('Review Submitted Successfully');
        Swal.fire({
          title: `Review Submitted Success `,
          text: 'Thanks for your kind reviews . stay with us',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#03C988',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Go Home',
          cancelButtonText: 'Close',
        }).then(result => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      }
    },
    onError: error => {
      console.log(error);
      const message = error?.response?.data?.message || 'Something went wrong';
      toast.error(message, {
        position: 'top-center',
      });
    },
  });

  const { isPending } = addReview;

  const onSubmit = data => {
    const finalData = {
      ...data,
      tripName: trip.ticketTitle,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      rating,
      bookingId: trip._id,
      ticketId: trip.ticketId,
      isDisplay: false,
      date: new Date().toISOString(),
    };
    addReview.mutate(finalData);
  };

  const handleStarClick = score => {
    setRating(score);
    setValue('rating', score, { shouldValidate: true });
  };

  if (isLoading || loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="btn btn-warning btn-sm w-full text-white font-bold">
          Write A Review
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-900">
        {reviewData ? (
          <div className="py-4 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                Thanks for sharing!
              </DialogTitle>
              <DialogDescription>
                Your review for{' '}
                <span className="font-semibold text-primary">
                  {reviewData.tripName}
                </span>{' '}
                has been submitted.
              </DialogDescription>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
              <Quote className="absolute top-4 right-4 text-gray-200 h-10 w-10 rotate-180" />

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={20}
                    className={`${
                      star <= reviewData?.rating
                        ? 'fill-orange-400 text-orange-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 italic mb-6 leading-relaxed">
                {reviewData?.text}
              </p>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <User className="h-4 w-4 text-indigo-600" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">
                    {reviewData?.userName}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Briefcase size={10} />
                    <span>{reviewData?.role}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Rate your Trip
              </DialogTitle>
              <DialogDescription>
                How was your journey on <strong>{trip.ticketTitle}</strong>?
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="flex flex-col items-center gap-2 mb-2">
                <Label className="text-sm font-medium">Tap to Rate</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={32}
                      onClick={() => handleStarClick(star)}
                      className={`cursor-pointer transition-colors duration-200 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300 fill-gray-100 hover:text-yellow-200'
                      }`}
                    />
                  ))}
                </div>
                <input
                  type="hidden"
                  {...register('rating', {
                    required: 'Please select a star rating',
                  })}
                  value={rating}
                />
                {errors.rating && (
                  <span className="text-red-500 text-xs font-medium">
                    {errors.rating.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g. Best"
                  {...register('experience', {
                    required: 'Experience is required',
                  })}
                />
                {errors.experience && (
                  <span className="text-red-500 text-xs">
                    {errors.experience.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">Role / Designation</Label>
                <Input
                  id="role"
                  placeholder="e.g. Tourist, Student"
                  {...register('role', { required: 'Role is required' })}
                />
                {errors.role && (
                  <span className="text-red-500 text-xs">
                    {errors.role.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Tell us about the bus condition, timing, etc."
                  className="h-24 resize-none"
                  {...register('text', {
                    required: 'Review text is required',
                    minLength: {
                      value: 10,
                      message: 'Review must be at least 10 characters',
                    },
                  })}
                />
                {errors.text && (
                  <span className="text-red-500 text-xs">
                    {errors.text.message}
                  </span>
                )}
              </div>

              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center gap-1.5">
                      <Spinner /> Submitting....
                    </div>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
