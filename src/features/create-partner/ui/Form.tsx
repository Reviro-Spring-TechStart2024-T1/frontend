import { FormEvent } from 'react';

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

        <Button>{isMutating ? 'Creating...' : 'Create'}</Button>
      </div>
    </form>
  );
};
