'use client';

import toast from 'react-hot-toast';

import { Typography, useActionPlan, useModal } from '@/shared';
import { Dialog } from '@/widgets/dialog';

export const ArchiveSubscriptionPlanModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { trigger } = useActionPlan();

  const isModalOpen = isOpen && type === 'archivePlan';

  const handleArchivePlan = () => {
    if (data.id) {
      trigger({ plan_id: data.id, action: 'deactivate' });
    }

    onClose();
    toast.success('The plan was archived');
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      onSubmit={handleArchivePlan}
      btnLabel="Yes, archive"
      title="Are you sure?"
    >
      <div>
        <Typography variant="paragraph" color="grey">
          Do you really want to archive this plan?
        </Typography>
        <Typography variant="paragraph" color="grey">
          You can unarchive the plan later
        </Typography>
      </div>
    </Dialog>
  );
};
