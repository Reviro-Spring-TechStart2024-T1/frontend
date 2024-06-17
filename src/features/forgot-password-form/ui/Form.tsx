'use client';

import { RiCheckboxCircleLine } from '@remixicon/react';
import { Field, Form as FormikForm, Formik } from 'formik';

import { SubmitButton } from '@/features/submit-form';
import { useForgotPassword } from '@/shared';
import { Error, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

type TFormValues = {
  email: string;
};

export const Form = () => {
  const { trigger, isMutating, error, data } = useForgotPassword();

  const handleSubmit = async ({ email }: TFormValues) => {
    if (email) {
      trigger({ email: email });
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-theme-blue-100">
      <div className="flex w-2/4 flex-col items-center justify-center gap-10 rounded-xl border border-gray-400 bg-[#fdfdfd] p-10">
        <Typography variant="h2">Enter your email</Typography>
        <Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
          <FormikForm className="flex w-full flex-col gap-4">
            <Field
              name="email"
              type="email"
              as={Input}
              className="w-full"
              placeholder="Email"
            />
            {error &&
              error.map(error => (
                <Error key={error} className="text-center">
                  {error}
                </Error>
              ))}
            <SubmitButton className="" isMutating={isMutating}>
              Next
            </SubmitButton>
            {data && (
              <div className="flex gap-2">
                <RiCheckboxCircleLine className="fill-green-400" />
                <Typography
                  variant="caption"
                  className="text-center text-green-400"
                >
                  Please, check your email!
                </Typography>
              </div>
            )}
          </FormikForm>
        </Formik>
      </div>
    </div>
  );
};
