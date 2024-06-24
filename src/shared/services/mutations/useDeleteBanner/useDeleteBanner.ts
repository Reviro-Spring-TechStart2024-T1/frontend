'use client';

import useSWRMutation from 'swr/mutation';

import { deleteBanner } from '../../api';

import { DeleteBannerProps } from './types';

export const useDeleteBanner = ({ id }: DeleteBannerProps) => {
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
