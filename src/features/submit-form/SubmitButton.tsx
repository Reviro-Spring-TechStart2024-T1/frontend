'use client';

import { useFormStatus } from 'react-dom';

import { Button } from '@/shared/ui';

export const SubmitButton = ({
  type,
}: {
  type: 'create' | 'edit' | 'save' | 'delete' | 'login';
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      {type === 'create' && (
        <Button width="full">{pending ? 'Creating...' : 'Create'}</Button>
      )}
      {type === 'edit' && (
        <Button width="full">{pending ? 'Editing...' : 'Edit'}</Button>
      )}
      {type === 'save' && (
        <Button width="full">{pending ? 'Saving...' : 'Save'}</Button>
      )}
      {type === 'login' && (
        <Button width="full">{pending ? 'Logging in...' : 'Login'}</Button>
      )}
      {type === 'delete' && (
        <Button variant="delete" width="full">
          {pending ? 'Deleting...' : 'Delete'}
        </Button>
      )}
    </>
  );
};
