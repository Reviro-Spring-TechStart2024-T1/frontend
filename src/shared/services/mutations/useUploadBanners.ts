'use client';

import useSWRMutation from 'swr/mutation';

import { uploadBanners } from '@/shared';

export const useUploadBanners = () => {
  const { data, trigger, error, isMutating } = useSWRMutation(
    '/establishments/banners/',
    uploadBanners,
    {
      onError() {
        console.log('Error');
      },
      onSuccess() {
        console.log('success');
      },
    },
  );

  return {
    data,
    uploadBanner: trigger,
    bannerUploadError: error,
    isBannerUploading: isMutating,
  };
};
