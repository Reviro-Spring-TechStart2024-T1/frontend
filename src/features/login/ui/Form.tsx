'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { handleLoginSubmit } from '@/features/login';
import { SubmitButton } from '@/features/submit-form';
import { logo } from '@/shared';
import { Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form = () => {
  const { push } = useRouter();

  const [formState, formAction] = useFormState(handleLoginSubmit, {
    status: '',
    message: '',
    user_id: null,
    access: null,
    refresh: null,
  });

  useEffect(() => {
    if (formState.status === 'success') {
      if (!!localStorage.getItem('user_id')) {
        push('/partner/profile');
      } else {
        localStorage.setItem('user_id', formState.user_id);
        push('/partner/profile');
      }
    }
    console.log(formState, 'login form state');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  return (
    <div className="flex w-[762px] rounded-xl bg-[#fdfdfd]">
      <div className="flex w-2/4 flex-col items-center justify-center gap-[56px] px-[56px] py-[129px]">
        <Typography variant="h2" weight="bold">
          Login
        </Typography>
        <form action={formAction}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-6 mt-3 w-full"
          />
          <SubmitButton type="login" />
        </form>
      </div>
      <div className="w-2/4 rounded-r-xl bg-[#292B74] px-[70px] py-[56px]">
        <Image src={logo} alt="logo" width={240} height={400} />
      </div>
    </div>
  );
};
