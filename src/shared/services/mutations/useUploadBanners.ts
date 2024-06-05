'use client';

import useSWRMutation from 'swr/mutation';

import { uploadBanners } from '@/shared';

export const useUploadBanners = () => {
  const { trigger, error, isMutating } = useSWRMutation(
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
    uploadBanner: trigger,
    bannerUploadError: error,
    isBannerUploading: isMutating,
  };
};
