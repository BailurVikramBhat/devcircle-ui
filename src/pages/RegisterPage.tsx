import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import FieldError from '@/components/ui/FieldError';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { registerUser } from '@/api/authApi';
import { isAxiosError } from 'axios';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: typeof errors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = 'tell us your good name please!';
    }
    if (!email.trim()) {
      validationErrors.email = 'tell us where to reach out to you!';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!password.trim()) {
      validationErrors.password = "oops you've left this empty!";
    } else if (password.length < 6) {
      validationErrors.password = 'must be at least 6 characters :)';
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirmRegistration = async () => {
    if (isLoading) return;
    const validationErrors: typeof errors = {};
    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = 'Required';
      setErrors(validationErrors);
      return;
    }

    if (confirmPassword === password) {
      setIsLoading(true);
      setConfirmPassword('');
      setIsLoading(false);
      try {
        const { userId, token, message } = await registerUser({
          fullName,
          email,
          password,
        });
        toast.success(message);
        toast.info('Here is your generated userId: ' + userId);
        login(userId, token);
        navigate(`/dashboard`);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          if (!err.response) {
            toast.error(
              '🚧 Our servers are currently unavailable. Please try again later.'
            );
          } else if (err.response.status === 409) {
            // backend should return { message: "Invalid credentials" }
            toast.error(
              err.response.data?.message || 'User with email already exists'
            );
          } else {
            toast.error('Something went wrong. Please try again.');
          }
        } else {
          console.error(err);
          toast.error(
            'An unexpected error occurred. Server might be down. Please try again!'
          );
        }
      } finally {
        setIsLoading(false);
      }
      // toast.success(`Welcome ${fullName}! Registration confirmed 🚀`);
      setConfirmDialogOpen(false);
      setEmail('');
      setConfirmPassword('');
    } else {
      toast.error('Passwords do not match. Please try again.');
    }
  };

  return (
    <>
      <div className='flex min-h-screen flex-col justify-evenly md:flex-row p-4'>
        {/* Left Panel */}
        <div className='flex md:w-2/5 bg-gray-100 flex-col justify-center items-center p-10 space-y-6'>
          <h1 className='text-4xl font-bold text-gray-800'>
            Welcome to Dev
            <span className='text-teal-700'>Circle</span>
            🚀
          </h1>

          <p className='text-gray-600 text-center'>
            Connect. Collaborate. Grow.
            <br />
            Join a passionate community of developers working on exciting
            real-world projects!
          </p>
          <ul className='text-gray-600 text-left list-disc list-inside space-y-2'>
            <li>🤝 Network with developers worldwide</li>
            <li>🚀 Contribute to live open-source projects</li>
            <li>🎯 Personalized mentorship & feedback</li>
            <li>🏆 Earn certifications and recognition</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className='w-full md:w-3/5 bg-gradient-to-br from-blue-600 via-purple-500 to-indigo-900 flex justify-center items-center p-8'>
          <div className='bg-gray-50 rounded-xl shadow-lg w-full max-w-md p-8 space-y-6'>
            <h2 className='text-3xl font-bold text-center text-gray-800'>
              <div className='flex justify-between items-center'>
                <span>⭐</span>
                <span>People are waiting for you!</span>
                <span>⭐</span>
              </div>
            </h2>
            <form className='space-y-5' onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder='Full Name'
                  type='text'
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                />
                <FieldError message={errors.fullName} />
              </div>
              <div>
                <Input
                  placeholder='Email Address'
                  type='email'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                <FieldError message={errors.email} />
              </div>
              <div>
                <Input
                  placeholder='Password'
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                <FieldError message={errors.password} />
              </div>
              <Button
                type='submit'
                className='w-full hover:scale-105 transition-transform duration-300 hover:cursor-pointer'
              >
                Next
              </Button>
              <div className='text-center text-sm text-gray-600 mt-4'>
                Already have an account?{' '}
                <Link
                  to='/login'
                  className='text-blue-600 hover:underline font-semibold'
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>Confirm Your Password 🔐</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder='Confirm Password'
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
              }}
            />
            <FieldError message={errors.confirmPassword} />
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              onClick={handleConfirmRegistration}
              className='w-full hover:scale-105 transition-transform duration-300 hover:cursor-pointer'
            >
              {isLoading ? (
                <div className='flex justify-center items-center gap-2'>
                  <svg
                    className='animate-spin h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8z'
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                'Register!'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisterPage;
