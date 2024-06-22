'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { RiCloseLargeLine } from '@remixicon/react';
import clsx from 'clsx';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSWRConfig } from 'swr';

import { useChosenEstablishmentContext } from '@/app/_providers';
import {
  EstablishmentBannersSchema,
  TEstablishmentBannersForm,
} from '@/features/partner-banners-form';
import { SubmitButton } from '@/features/submit-form';
import {
  addImage,
  Button,
  delete_,
  Error,
  ESTABLISHMENT_EDIT_PATH,
  ESTABLISHMENT_PATH,
  ImageUploaderWithCrop,
  Typography,
  useDeleteBanner,
  useUploadBanners,
} from '@/shared';

export const Form = () => {
  const pathname = usePathname();
  const { mutate } = useSWRConfig();

  const [bannerId, setBannerId] = useState('');

  const { data, uploadBanner, bannerUploadError, isBannerUploading } =
    useUploadBanners();
  const {
    isBannerDeletionSuccessful,
    deleteBanner,
    bannerDeletionError,
    isBannerDeleting,
  } = useDeleteBanner({ id: bannerId });

  const { chosenEstablishment } = useChosenEstablishmentContext();

  // const [isBannerDeletionActive, setIsBannerDeletionActive] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(''); //NOTE - Banner's interactive data
  const [bannerName, setBannerName] = useState('Choose banner');

  const handleBannersFormSubmit = async (values: TEstablishmentBannersForm) => {
    const { banner } = values;

    if (chosenEstablishment?.id && banner) {
      uploadBanner({
        banner,
        establishmentId: String(chosenEstablishment?.id),
      });
    }
  };

  const establishmentBannersFormik = useFormik({
    initialValues: {
      banner: null,
    },
    onSubmit: handleBannersFormSubmit,
    validationSchema: EstablishmentBannersSchema,
  });
  const { setFieldValue, handleSubmit, handleReset } =
    establishmentBannersFormik;

  const onBannerDeletion = (bannerId: number) => {
    setBannerId(String(bannerId));

    deleteBanner();
  };
  // const onBannerDeletionUnfocus = useCallback(() => {
  //   setIsBannerDeletionActive(false);
  // }, []);

  const handleOnImageCropped = (croppedFile: File) => {
    setSelectedBanner(URL.createObjectURL(croppedFile));
    setBannerName(croppedFile.name);
    setFieldValue('banner', croppedFile);
  };

  const handleRemoveImage = () => {
    if (selectedBanner) {
      URL.revokeObjectURL(selectedBanner);
    }
    setSelectedBanner('');
    setBannerName('Choose banner');
    setFieldValue('banner', null);
  };

  useEffect(() => {
    if (data) {
      toast.success('Banner has been successfully uploaded!');
      mutate('/establishments/partner/');
    }
  }, [data]);

  useEffect(() => {
    if (isBannerDeletionSuccessful) {
      toast.success('Banner has been successfully deleted!');
      mutate('/establishments/partner/');
    }
  }, [isBannerDeletionSuccessful]);

  return (
    <FormikProvider value={establishmentBannersFormik}>
      {/* <DeleteBannerModal
        isActive={isBannerDeletionActive}
        close={onBannerDeletionUnfocus}
      /> */}
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col gap-[25px] rounded-md bg-white p-9"
      >
        <Typography variant="h4">Banners</Typography>
        <div
          className={clsx(
            'grid place-items-center gap-4 lg:grid-cols-2 sm:grid-cols-1',
            {
              'grid-cols-1 grid-rows-[100px]':
                !chosenEstablishment ||
                chosenEstablishment?.banners?.length === 0 ||
                pathname === ESTABLISHMENT_PATH,
              'grid-cols-3':
                chosenEstablishment?.banners?.length !== undefined &&
                chosenEstablishment?.banners?.length > 0 &&
                pathname === ESTABLISHMENT_EDIT_PATH,
            },
          )}
        >
          {!chosenEstablishment && pathname === ESTABLISHMENT_EDIT_PATH && (
            <Typography variant="h3">Loading...</Typography>
          )}
          {pathname === ESTABLISHMENT_PATH && (
            <Typography variant="h3">Upload some!</Typography>
          )}
          {chosenEstablishment?.banners?.length === 0 && (
            <Typography variant="h3">No banners. Upload some!</Typography>
          )}
          {pathname === ESTABLISHMENT_EDIT_PATH &&
            chosenEstablishment?.banners?.map(banner => (
              <div key={banner.id} className="relative">
                <Image
                  key={banner.id}
                  src={banner.url}
                  className="object-cover"
                  width={300}
                  height={100}
                  alt="Banner"
                />
                <Button
                  onClick={() => onBannerDeletion(banner.id)}
                  variant="ghost"
                  type="button"
                  className="group absolute right-0 top-0 rounded-tr-none bg-theme-grey-200 px-2 transition-colors hover:bg-red-300"
                >
                  <RiCloseLargeLine className="fill-red-400 group-hover:fill-white" />
                </Button>
              </div>
            ))}
        </div>

        <div className="relative flex items-center justify-between rounded-md border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <Field name="banner">
              {() => (
                <ImageUploaderWithCrop
                  cropWidth={354}
                  cropHeight={393}
                  imageTitle="banner"
                  onImageCropped={handleOnImageCropped}
                />
              )}
            </Field>
            {selectedBanner ? (
              <Image
                src={selectedBanner}
                alt="selected"
                width={40}
                height={40}
              />
            ) : (
              <Image src={addImage} alt="add-image" width={40} height={40} />
            )}
            <Typography variant="paragraph">{bannerName}</Typography>
            <ErrorMessage name="banner" render={msg => <Error>{msg}</Error>} />
          </div>

          {selectedBanner && (
            <Button
              variant="none"
              size="sm"
              btnType="icon"
              type="button"
              onClick={handleRemoveImage}
            >
              <Image src={delete_} alt="delete" className="fill-red-500" />
            </Button>
          )}
        </div>
        <SubmitButton isMutating={isBannerUploading || isBannerDeleting}>
          Upload banner
        </SubmitButton>
        {bannerUploadError && (
          <Error>
            {bannerUploadError === typeof Object
              ? JSON.stringify(bannerUploadError)
              : bannerUploadError}
          </Error>
        )}
        {bannerDeletionError && (
          <Error>
            {bannerDeletionError === typeof Object
              ? JSON.stringify(bannerDeletionError)
              : bannerDeletionError}
          </Error>
        )}
      </form>
    </FormikProvider>
  );
};
