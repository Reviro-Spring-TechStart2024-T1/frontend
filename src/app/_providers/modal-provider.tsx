'use client';

import { useEffect, useState } from 'react';

import { AddSubscriptionPlanModal } from '@/features/add-subscription-plan';
import { CreatePostModal } from '@/features/create-post';

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
    </>
  );
};
