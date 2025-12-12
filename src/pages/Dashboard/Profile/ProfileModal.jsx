import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import useAxios from '@/hooks/useAxios';
import useImage from '@/hooks/useImage';

const ProfileModal = ({ user, userData, isOpen, closeModal }) => {
  const { updateUserProfile } = useAuth();
  const secureApi = useAxios();
  const queryClient = useQueryClient();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      name: user?.displayName || '',
      phoneNumber: userData?.phoneNumber || '',
      address: userData?.address || '',
      photo: null,
    },
  });

  const watchedValues = watch();
  const isFormChanged = () => {
    const nameChanged =
      watchedValues.name && watchedValues.name !== user?.displayName;
    const phoneChanged =
      watchedValues.phoneNumber &&
      watchedValues.phoneNumber !== userData?.phoneNumber;
    const addressChanged =
      watchedValues.address && watchedValues.address !== userData?.address;
    const photoChanged = watchedValues.photo && watchedValues.photo.length > 0;

    return nameChanged || phoneChanged || addressChanged || photoChanged;
  };

  const uploadToImgbb = async file => {
    const apiKey = import.meta.env.VITE_IMGBB_KEY;
    const formData = new FormData();
    formData.append('image', file);

    const result = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );
    return result.data.data.display_url;
  };

  const updateMutation = useMutation({
    mutationFn: async formData => {
      const updatePayload = {};
      let imageURL = user?.photoURL;
      if (formData.name && formData.name !== user?.displayName) {
        updatePayload.name = formData.name;
      }
      if (
        formData.phoneNumber &&
        formData.phoneNumber !== userData?.phoneNumber
      ) {
        updatePayload.phoneNumber = formData.phoneNumber;
      }
      if (formData.address && formData.address !== userData?.address) {
        updatePayload.address = formData.address;
      }
      if (formData.photo && formData.photo.length > 0) {
        const file = formData.photo[0];
        imageURL = await useImage(file);
        if (imageURL !== user?.photoURL) {
          updatePayload.photoURL = imageURL;
        }
      }

      if (updatePayload.name || updatePayload.photoURL) {
        await updateUserProfile(
          updatePayload.name || user?.displayName,
          updatePayload.photoURL || user?.photoURL
        );
      }

      if (Object.keys(updatePayload).length > 0) {
        return secureApi.patch(`/user/${user?.email}`, updatePayload);
      }

      return null;
    },

    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries(['user', user?.email]);
      closeModal();
    },

    onError: err => {
      console.error(err);
      toast.error('Failed to update profile!');
    },
  });

  const onSubmit = data => {
    updateMutation.mutate(data);
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box max-w-lg">
        <h3 className="font-bold text-xl mb-4">Edit Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              defaultValue={user?.displayName}
              {...register('name')}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Email (not editable)</label>
            <input
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="label">Phone Number</label>
            <input
              defaultValue={userData?.phoneNumber || ''}
              {...register('phoneNumber')}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">Address</label>
            <input
              defaultValue={userData?.address || ''}
              {...register('address')}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {!isFormChanged() && (
            <p className="text-sm text-gray-500">No changes to save</p>
          )}

          <div className="modal-action">
            <button
              type="submit"
              disabled={updateMutation.isPending || !isFormChanged()}
              className="btn btn-primary text-white"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              className="btn btn-ghost"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
