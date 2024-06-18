import { FormEvent } from 'react';

import { SubmitButton } from '@/features/submit-form';
import { useCreatePartnerModal } from '@/shared';
import { useCreatePartner } from '@/shared/services';
import { Button, Input } from '@/shared/ui';

export const Form = () => {
  const { setModalState } = useCreatePartnerModal();

  const { trigger, isMutating } = useCreatePartner();

  const handleOnClose = () => {
    setModalState(false);
  };

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');

    trigger({ email: email });
    setModalState(false);
  };

  return (
    <form onSubmit={handleOnSubmit} className="mt-[16px] flex flex-col gap-3">
      <Input type="email" name="email" placeholder="Email" />

      <div className="flex gap-2.5">
        <Button
          type="button"
          variant="outline"
          width="full"
          onClick={handleOnClose}
        >
          Close
        </Button>

        <SubmitButton isMutating={isMutating}>Create</SubmitButton>
      </div>
    </form>
  );
};
