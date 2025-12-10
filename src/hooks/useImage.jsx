import axios from 'axios';

const useImage = async file => {
  const apiKey = import.meta.env.VITE_IMGBB_KEY;
  const formData = new FormData();
  formData.append('image', file);
  const result = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData
  );
  console.log(result.data.data.display_url);
  return result.data.data.display_url;
};

export default useImage;
