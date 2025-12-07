import { toast } from 'react-toastify';

const handleFirebaseError = error => {
  switch (error.code) {
    case 'auth/invalid-credential':
      toast.error('Invalid User Credential.');
      break;
    case 'auth/email-already-in-use':
      toast.error('This email is already registered. Please log in instead.');
      break;
    case 'auth/user-not-found':
      toast.error('No account found with this email.');
      break;
    case 'auth/too-many-requests':
      toast.error('Too many attempts. Try again later.');
      break;
    default:
      toast.error('Login failed. Please try again.');
  }
};

export { handleFirebaseError };
