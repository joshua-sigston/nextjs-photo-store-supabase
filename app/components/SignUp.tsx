'use client';
import React from 'react';
import { supabaseClient } from '@/app/lib/supabaseClient';
import { useForm } from 'react-hook-form';
import { z, ZodError } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address').min(1),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    try {
      let { data: userData, error } = await supabaseClient.auth.signUp({
        email: data.email,
        password: data.password,
      });
      if (userData) console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form z-5 bg-green-500">
      <div className="flex justify-between">
        <label>Email:</label>
        <input type="email" {...register('email')} required />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="flex justify-between">
        <label>Password:</label>
        <input type="password" {...register('password')} required />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="flex justify-between">
        <label>Confirm Password:</label>
        <input type="password" {...register('confirmPassword')} required />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <button type="submit" className="btn btn_submit">
        Sign Up
      </button>
    </form>
  );
}
