'use client';
import React from 'react';
import { supabaseClient } from '@/app/lib/supabaseClient';
import { useForm } from 'react-hook-form';
import { z, ZodError } from 'zod';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const successMsg = (data: string) => {
    toast.success(data, {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const errorMsg = () => {
    toast.error('Please try again', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const onSubmit = async (data: FormData) => {
    // console.log(data);

    try {
      let { data: userData, error } =
        await supabaseClient.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (userData.user !== null) {
        console.log(userData);
        successMsg('Successful log in with ' + data.email);
        setTimeout(() => {
          router.push('/dashboard');
        }, 3000);
      }

      if (error) {
        console.log(error);
        errorMsg();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form z-5 bg-cyan-500">
        <div className="flex justify-between">
          <label>Email:</label>
          <input
            type="email"
            {...register('email')}
            className="rounded-sm"
            required
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="flex justify-between">
          <label>Password:</label>
          <input type="password" {...register('password')} required />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn btn_submit">
          Sign In
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
