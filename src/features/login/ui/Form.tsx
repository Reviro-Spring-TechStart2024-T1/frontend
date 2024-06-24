'use client';

import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from '@remixicon/react';
import { ErrorMessage, Field, Form as FormikForm, Formik } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';

import { SubmitButton } from '@/features/submit-form';
import { Logo } from '@/shared';
import { useLogin } from '@/shared/services/mutations/useLogin/useLogin';
import { Button, Error, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

type TFormValues = {
  email: string;
  password: string;
};

export const Form = () => {
  const { trigger, isMutating, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async ({ email, password }: TFormValues) => {
    if (email && password) {
      trigger({ email: email, password: password });
    }
  };

  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().required('Required.').email(),
    password: Yup.string().required('Required.'),
  });

  return (
    <div className="flex w-[762px] rounded-xl bg-[#fdfdfd]">
      <div className="flex w-2/4 flex-col items-center justify-center gap-[56px] px-[56px] py-[129px]">
        <Typography variant="h2" weight="bold">
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleLogin}
          validationSchema={LoginFormSchema}
        >
          <FormikForm className="flex flex-col gap-2">
            <Field
              name="email"
              type="email"
              as={Input}
              className="w-full"
              placeholder="Email"
            />
            <ErrorMessage name="email" render={msg => <Error>{msg}</Error>} />
            <div className="relative w-full">
              <Field
                name="password"
                type={showPassword ? 'text' : 'password'}
                as={Input}
                className="w-full"
                placeholder="Password"
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
              </Button>
            </div>
            <ErrorMessage
              name="password"
              render={msg => <Error className="mb-6">{msg}</Error>}
            />
            {error && <Error>{error}</Error>}
            <Typography variant="caption" color="blue" className="text-right">
              <Link href="/forgot-password">Forgot password?</Link>
            </Typography>
            <SubmitButton isMutating={isMutating}>Login</SubmitButton>
          </FormikForm>
        </Formik>
      </div>
      <div className="w-2/4 rounded-r-xl bg-[#292B74] px-[70px] py-[56px]">
        <Logo />
      </div>
    </div>
  );
};
