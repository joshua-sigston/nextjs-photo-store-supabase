import { Nunito, Rubik, DM_Sans } from 'next/font/google';

export const nunito = Nunito({
  weight: '600',
  subsets: ['latin'],
  display: 'swap',
  variable: '--nunito-font',
});

export const dm= DM_Sans({
  weight: '300',
  subsets: ['latin'],
  display: 'swap',
  variable: '--dm-font',
});

export const rubik= Rubik({
  weight: '500',
  subsets: ['latin'],
  display: 'swap',
  variable: '--rubik-font',
});