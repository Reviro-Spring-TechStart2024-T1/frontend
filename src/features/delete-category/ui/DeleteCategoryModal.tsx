'use client';

import { useDeleteCategory, useModal } from '@/shared';
import { Typography } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

export const DeleteCategoryModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { trigger } = useDeleteCategory({ id: data.id });

  const isModalOpen = isOpen && type === 'deleteCategory';

  const handleDeleteCategory = () => {
    if (data.id) {
      trigger();
    }
    onClose();
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      onSubmit={handleDeleteCategory}
      btnLabel="Yes, delete"
      isDelete={true}
      title="Are you sure?"
    >
      <div>
        <Typography variant="paragraph" color="grey">
          Do you really want to delete this category?
        </Typography>
        <Typography variant="paragraph" color="grey">
          This process cannot be undone
        </Typography>
      </div>
    </Dialog>
  );
};
