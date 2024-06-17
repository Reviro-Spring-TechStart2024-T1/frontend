'use client';

import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiEyeCloseLine, RiEyeLine } from '@remixicon/react';
import { Field, Form as FormikForm, Formik } from 'formik';
import { useRouter } from 'next/navigation';

import { SubmitButton } from '@/features/submit-form';
import { useUpdatePassword } from '@/shared';
import { Button, Error, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

type TFormValues = {
  password: string;
};

export const Form: FC<{ token: string | undefined }> = ({ token }) => {
  const { trigger, isMutating, error, data } = useUpdatePassword();
  const { push } = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async ({ password }: TFormValues) => {
    if (password && token) {
      trigger({ password, token });
    }
  };

  useEffect(() => {
    if (data) {
      toast.success('Your password has been successfully updated!');
      push('/login');
    }
  }, [data]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-theme-blue-100">
      <div className="flex w-2/4 flex-col items-center justify-center gap-10 rounded-xl border border-gray-400 bg-[#fdfdfd] p-10">
        <Typography variant="h2">Enter your new password</Typography>
        <Formik initialValues={{ password: '' }} onSubmit={handleSubmit}>
          <FormikForm className="relative flex flex-col gap-4">
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
            {error && <Error className="text-center">{error}</Error>}
            <SubmitButton className="" isMutating={isMutating}>
              Update password
            </SubmitButton>
          </FormikForm>
        </Formik>
      </div>
    </div>
  );
};
