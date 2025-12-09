const useTime = time => {
  let [hour, minute] = time.split(':').map(Number);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;

  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
};

export default useTime;
