import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ type }: { type: 'create' | 'edit' }) => {
  const { pending } = useFormStatus();

  const className = 'w-2/4 rounded-md bg-[#292b74] text-sm font-normal';

  return (
    <>
      {type === 'create' && (
        <button type="submit" className={className}>
          {pending ? 'Creating...' : 'Create'}
        </button>
      )}
      {type === 'edit' && (
        <button type="submit" className={className}>
          {pending ? 'Editing...' : 'Edit'}
        </button>
      )}
    </>
  );
};
