'use client';

import { useEffect, useState } from 'react';

import { AddSubscriptionPlanModal } from '@/features/add-subscription-plan';

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
    </>
  );
};
