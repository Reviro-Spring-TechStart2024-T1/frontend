'use client';

import { useEffect, useState } from 'react';

import { AddSubscriptionPlanModal } from '@/features/add-subscription-plan';
import { ArchiveSubscriptionPlanModal } from '@/features/archive-subscription-plan/ui/ArchiveSubscriptionPlanModal';
import { CreatePostModal } from '@/features/create-post';
import { UnarchiveSubscriptionPlanModal } from '@/features/unarchive-subscription-plan';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AddSubscriptionPlanModal />
      <CreatePostModal />
      <ArchiveSubscriptionPlanModal />
      <UnarchiveSubscriptionPlanModal />
    </>
  );
};
