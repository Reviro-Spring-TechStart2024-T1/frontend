'use client';

import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiInformationLine, RiLockPasswordLine } from '@remixicon/react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { useChosenEstablishmentContext } from '@/app/_providers';
import { SubmitButton } from '@/features';
import {
  Button,
  Error,
  ESTABLISHMENT_EDIT_PATH,
  ESTABLISHMENT_PATH,
  Input,
  Modal,
  ShowPassword,
  TChangePassForm,
  Typography,
  useChangePassword,
  useDeleteEstablishment,
} from '@/shared';

type TTab = 'info' | 'security';
type TPassword = 'old' | 'new' | 'confirm';

export const PartnerProfile = () => {
  const { chosenEstablishment } = useChosenEstablishmentContext();
  const { data, trigger, error, isMutating } = useDeleteEstablishment({
    id: chosenEstablishment?.id,
  });
  const { changePassword, changePasswordError, isPasswordChanging } =
    useChangePassword();
  const [chosenTab, setChosenTab] = useState<TTab>('info');
  const [showPassword, setShowPassword] = useState<TPassword | null>(null);
  const { mutate } = useSWRConfig();
  const pathname = usePathname();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const establishmentId = 'establishmentId';

  const onEstablishmentDelete = useCallback(() => {
    trigger();
  }, []);
  const onModalOpen = useCallback(() => {
    params.set(establishmentId, String(chosenEstablishment?.id));
    console.log(params.get(establishmentId));

    push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [params]);
  const onModalClose = useCallback(() => {
    params.delete(establishmentId, '');
    push(pathname, { scroll: false });
  }, []);

  const onTabChoose = (tab: TTab) => {
    setChosenTab(tab);
  };
  const onFormSubmit = async (
    { old_password, password, confirm_password }: TChangePassForm,
    { resetForm }: FormikHelpers<TChangePassForm>,
  ) => {
    const res = await changePassword({
      old_password,
      password,
      confirm_password,
    });

    if (res) {
      toast.success('Password has been successfully changed!');
      resetForm();
    }
  };

  useEffect(() => {
    if (data) {
      toast.success(
        `${chosenEstablishment?.name} has been successfully deleted!`,
      );

      params.delete(establishmentId, '');
      push(pathname);

      mutate('/establishments/partner/');
      localStorage.removeItem('establishment_id');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      params.delete(establishmentId, '');
      push(pathname);
    }
  }, [error]);

  if (!chosenEstablishment) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <Typography variant="h2">No Establishment!</Typography>
        <Link
          href={ESTABLISHMENT_PATH}
          className="rounded-md bg-theme-grey-150 px-4 py-4 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
        >
          <Typography variant="h4">Create Establishment</Typography>
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex h-full flex-col gap-16 overflow-y-scroll"
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onTabChoose('info')}
          type="button"
          variant={chosenTab === 'info' ? 'primary' : 'outline'}
        >
          <RiInformationLine />
          <Typography variant="paragraph">Info</Typography>
        </Button>
        <Button
          onClick={() => onTabChoose('security')}
          type="button"
          variant={chosenTab === 'security' ? 'primary' : 'outline'}
        >
          <RiLockPasswordLine />
          <Typography variant="paragraph">Security</Typography>
        </Button>
      </div>
      {chosenTab === 'info' && (
        <>
          <div className="flex flex-1 flex-col gap-2">
            <Typography variant="paragraph">
              <strong>Establishment name:</strong> {chosenEstablishment?.name}
            </Typography>
            <Typography variant="paragraph">
              <strong>Description:</strong> {chosenEstablishment?.description}
            </Typography>
            <Typography variant="paragraph">
              <strong> Happy hours:</strong>{' '}
              {chosenEstablishment?.happy_hour_start} -{' '}
              {chosenEstablishment?.happy_hour_end}
            </Typography>
            <Typography variant="paragraph">
              <strong>Email:</strong> {chosenEstablishment?.email}
            </Typography>
          </div>
          <div className="flex justify-end gap-2">
            <Link
              href={ESTABLISHMENT_EDIT_PATH}
              className="rounded-md bg-theme-grey-150 px-4 py-4 transition-colors duration-200 hover:bg-theme-grey-200 active:bg-theme-grey-300"
            >
              Edit establishment
            </Link>
          </div>
        </>
      )}
      {chosenTab === 'security' && (
        <>
          <div className="flex flex-1 gap-10">
            <Formik
              initialValues={{
                old_password: '',
                password: '',
                confirm_password: '',
              }}
              onSubmit={onFormSubmit}
            >
              {() => {
                return (
                  <Form className="flex w-1/2 flex-col gap-2">
                    <div className="relative w-full">
                      <Field
                        title="Old password"
                        name="old_password"
                        type={showPassword === 'old' ? 'text' : 'password'}
                        as={Input}
                      />
                      <ShowPassword
                        state={showPassword === 'old'}
                        onClick={() =>
                          setShowPassword(prev =>
                            prev === 'old' ? null : 'old',
                          )
                        }
                      />
                    </div>
                    <div className="relative w-full">
                      <Field
                        title="New password"
                        name="password"
                        type={showPassword === 'new' ? 'text' : 'password'}
                        as={Input}
                      />
                      <ShowPassword
                        state={showPassword === 'new'}
                        onClick={() =>
                          setShowPassword(prev =>
                            prev === 'new' ? null : 'new',
                          )
                        }
                      />
                    </div>
                    <div className="relative w-full">
                      <Field
                        title="Confirm new password"
                        name="confirm_password"
                        type={showPassword === 'confirm' ? 'text' : 'password'}
                        as={Input}
                      />
                      <ShowPassword
                        state={showPassword === 'confirm'}
                        onClick={() =>
                          setShowPassword(prev =>
                            prev === 'confirm' ? null : 'confirm',
                          )
                        }
                      />
                    </div>
                    <SubmitButton isMutating={isPasswordChanging}>
                      Change password
                    </SubmitButton>
                  </Form>
                );
              }}
            </Formik>
            {changePasswordError && (
              <div className="flex flex-col gap-1">
                {changePasswordError?.map(([key, value]) => (
                  <Error key={key}>
                    <Typography variant="caption" weight="semibold">
                      {key}
                    </Typography>
                    {value}
                  </Error>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 rounded-md border-2 border-red-300 p-5">
            <Typography variant="h5">Danger zone</Typography>
            <Button variant="delete" onClick={onModalOpen}>
              Delete establishment
            </Button>
            <Modal
              query={establishmentId}
              isSubmitting={isMutating}
              onModalSubmit={onEstablishmentDelete}
              close={onModalClose}
            >
              Delete establishment
            </Modal>
          </div>
        </>
      )}
    </div>
  );
};
