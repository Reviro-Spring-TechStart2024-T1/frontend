'use client';

import useSWRMutation from 'swr/mutation';

import { deleteBanner } from '@/shared';

export const useDeleteBanner = (id: string | null) => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    () => (id ? `/establishments/banners/${id}/` : null),
    deleteBanner,
    {
      onError() {
        console.log('error');
      },
      onSuccess() {
        console.log('success');
      },
    },
  );

  return {
    isBannerDeletionSuccessful: data,
    deleteBanner: trigger,
    bannerDeletionError: error,
    isBannerDeleting: isMutating,
  };
};
