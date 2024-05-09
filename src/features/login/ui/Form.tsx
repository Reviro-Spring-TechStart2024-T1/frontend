'use client';

import { useState } from 'react';
import Image from 'next/image';

import { SubmitButton } from '@/features/submit-form';
import { logo } from '@/shared';
import { useLogin } from '@/shared/services/mutations/useLogin';
import { Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form = () => {
  const { trigger } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin: React.FormEventHandler = e => {
    e.preventDefault();

    if (email && password) {
      trigger({ email: email, password: password });
    }
  };

  return (
    <div className="flex w-[762px] rounded-xl bg-[#fdfdfd]">
      <div className="flex w-2/4 flex-col items-center justify-center gap-[56px] px-[56px] py-[129px]">
        <Typography variant="h2" weight="bold">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Input
            value={email}
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            value={password}
            type="password"
            name="password"
            placeholder="Password"
            className="mb-6 mt-3 w-full"
            onChange={e => setPassword(e.target.value)}
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
