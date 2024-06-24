'use client';

import clsx from 'clsx';

import { useCreatePartnerModal } from '@/app/_providers';
import { Form } from '@/features/create-partner';
import { CREATE_PARTNER, useCloseForm } from '@/shared';
import { Button, Section, Typography } from '@/shared/ui';

export const CreatePartner = () => {
  const { isActive: isCreatePartnerModalActive, setModalState } =
    useCreatePartnerModal();

  useCloseForm({ elementId: CREATE_PARTNER, setter: setModalState });

  return (
    <>
      <Section>
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => setModalState(true)}>
            <Typography variant="paragraph">Create partner</Typography>
          </Button>
        </div>
      </Section>

      <div
        id="create-partner"
        className={clsx(
          'fixed inset-0 z-50 mx-auto flex flex-col items-center justify-center gap-1 transition-all duration-300',
          {
            'invisible opacity-0': !isCreatePartnerModalActive,
            'visible opacity-100': isCreatePartnerModalActive,
          },
        )}
      >
        <div className="w-[320px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[560px]">
          <Typography variant="paragraph" weight="medium">
            Create Partner
          </Typography>
          <Form />
        </div>
      </div>
    </>
  );
};
