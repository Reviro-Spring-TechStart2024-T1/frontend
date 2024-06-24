'use client';

import { useEffect, useState } from 'react';

import {
  AddSubscriptionPlanModal,
  ArchiveSubscriptionPlanModal,
  CreatePostModal,
  UnarchiveSubscriptionPlanModal,
} from '@/features';

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
