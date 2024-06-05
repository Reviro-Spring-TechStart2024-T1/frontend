'use client';

import { useState } from 'react';
import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikProvider,
  useFormik,
} from 'formik';
import Image from 'next/image';

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
  ExtendedFieldProps,
  Input,
  Typography,
  useLocalStorage,
  useUploadBanners,
} from '@/shared';

export const Form = () => {
  const { uploadBanner, bannerUploadError, isBannerUploading } =
    useUploadBanners();

  const [establishmentId] = useLocalStorage('establishment_id', null);
  const [selectedBanner, setSelectedBanner] = useState(''); //NOTE - Banner's interactive data
  const [bannerName, setBannerName] = useState('Choose banner');
  console.log(establishmentId, 'establishmentId');

  const handleBannersFormSubmit = async (values: TEstablishmentBannersForm) => {
    const { banner } = values;

    console.log('Form submitted');
    console.log(establishmentId, 'establishmentId inside submit');
    console.log(banner, 'banner inside submit');

    if (establishmentId && banner) {
      uploadBanner({
        banner,
        establishmentId,
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedBanner(URL.createObjectURL(file));
      setBannerName(file.name);
      setFieldValue('banner', file);
    }
  };

  const handleRemoveImage = () => {
    if (selectedBanner) {
      URL.revokeObjectURL(selectedBanner);
    }
    setSelectedBanner('');
    setBannerName('Choose image');
    setFieldValue('banner', null);
  };

  const renderInput = ({
    field,
    type,
    placeholder,
    className,
    onClick,
  }: ExtendedFieldProps): JSX.Element => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === 'file') {
        handleImageChange(e);
      } else {
        setFieldValue(field.name, e.target.value);
      }
    };

    return (
      <Input
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={handleChange}
        onClick={onClick}
      />
    );
  };

  return (
    <FormikProvider value={establishmentBannersFormik}>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="flex flex-col gap-[25px] rounded-md bg-white p-9"
      >
        <Typography variant="paragraph">Banners</Typography>
        <div className="flex justify-around">
          {
            //NOTE - When there is an establishment switcher, and we get data of a certain establishment, there will also be banners - we should show them here
          }
          <div>Banner 1</div>
          <div>Banner 2</div>
          <div>Banner 3</div>
        </div>

        <div className="relative flex items-center justify-between rounded-md border border-gray-300 p-3">
          <label>
            <div className="flex items-center gap-2">
              <Field name="banner">
                {(props: FieldProps) =>
                  renderInput({
                    ...props,
                    type: 'file',
                    className: 'absolute left-0 top-0 z-10 w-1/4 opacity-0',
                  })
                }
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
              <ErrorMessage
                name="banner"
                render={msg => <Error>{msg}</Error>}
              />
            </div>
          </label>
          <div className="flex gap-2">
            {selectedBanner && (
              <Button
                variant="none"
                size="sm"
                btnType="icon"
                onClick={handleRemoveImage}
              >
                <Image src={delete_} alt="delete" className="fill-red-500" />
              </Button>
            )}
          </div>
        </div>
        {JSON.stringify(bannerUploadError)}
        <SubmitButton isMutating={isBannerUploading}>
          Upload banner
        </SubmitButton>
      </form>
    </FormikProvider>
  );
};
