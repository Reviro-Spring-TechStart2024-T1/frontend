'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { TextareaAutosize } from '@mui/material';
import { StaticTimePicker } from '@mui/x-date-pickers';
import { useMask } from '@react-input/mask';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import {
  ErrorMessage,
  Field,
  FieldProps,
  FormikProvider,
  useFormik,
} from 'formik';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { GoogleMap } from '@/entities/map';
import {
  END_TIME_PICKER,
  getEstablishmentInfoSchema,
  GOOGLE_MAP,
  START_TIME_PICKER,
  TEstablishmentInfoForm,
  useMonitorTimePicker,
} from '@/features/partner-info-form';
import { SubmitButton } from '@/features/submit-form';
import {
  addImage,
  delete_,
  Error,
  ESTABLISHMENT_EDIT_PATH,
  ESTABLISHMENT_PATH,
  ImageUploaderWithCrop,
  useChosenEstablishmentContext,
  useCloseForm,
  useEditEstablishment,
} from '@/shared';
import { Button, ExtendedFieldProps, Input, Typography } from '@/shared';
import { useCreateEstablishment } from '@/shared/services/mutations/useCreateEstablishment';
import { InputProps } from '@/shared/ui/Input/types/Input.types';

export const Form = () => {
  //TODO - Refactor the form (almost 600 lines of code)
  const pathname = usePathname();

  const { chosenEstablishment } = useChosenEstablishmentContext();

  const {
    createEstablishmentData,
    createEstablishment,
    createEstablishmentError,
    isCreateEstablishmentMutating,
  } = useCreateEstablishment(); //NOTE - POST establishment
  const {
    editEstablishmentData,
    editEstablishment,
    editEstablishmentError,
    isEditEstablishmentMutating,
  } = useEditEstablishment(chosenEstablishment?.id); //NOTE - PATCH establishment

  const [startTimepicker, setStartTimepicker] = useState<Dayjs | null>(null); //NOTE - MUI Timepicker state in dayjs
  const [endTimepicker, setEndTimepicker] = useState<Dayjs | null>(null);

  const inputRef = useMask({
    //NOTE - Mask placeholder for phone number
    mask: '+996-___-______',
    replacement: { _: /\d/ },
  });

  const editErrorRef = useRef<HTMLDivElement | null>(null);
  const createErrorRef = useRef<HTMLDivElement | null>(null);

  const [latitude, setLatitude] = useState(42.87656); //SECTION - Inputs' data
  const [longitude, setLongitude] = useState(74.588274);
  const [startHappyHours, setStartHappyHours] = useState('');
  const [endHappyHours, setEndHappyHours] = useState(''); //!SECTION

  const [selectedImage, setSelectedImage] = useState(''); //NOTE - Image's interactive data
  const [imageName, setImageName] = useState('Choose logo');

  const [isGoogleMapActive, setIsGoogleMapActive] = useState(false); //NOTE - Google Map and Timepicker modal windows' states
  const [isStartPickerActive, setIsStartPickerActive] = useState(false);
  const [isEndPickerActive, setIsEndPickerActive] = useState(false);

  useMonitorTimePicker(startTimepicker, setStartHappyHours); //NOTE - For time formatting (dayjs => HH:mm)
  useMonitorTimePicker(endTimepicker, setEndHappyHours);

  useCloseForm(GOOGLE_MAP, setIsGoogleMapActive); //NOTE - 'close' listeners for modal windows
  useCloseForm(START_TIME_PICKER, setIsStartPickerActive);
  useCloseForm(END_TIME_PICKER, setIsEndPickerActive);

  const [initialValues, setInitialValues] = useState({
    //SECTION - Initial values of each field for further check to Edit or to Create
    name: '',
    description: '',
    street_name: '',
    street_number: '',
    email: '',
    phone_number: '',
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    happy_hour_start: '',
    happy_hour_end: '',
    logo: null,
  }); //!SECTION

  const handleCreateEstablishment = (values: TEstablishmentInfoForm) => {
    const changedFields = Object.keys(values).reduce((acc, key) => {
      const typedKey = key as keyof TEstablishmentInfoForm;
      if (values[typedKey] !== initialValues[typedKey]) {
        //@ts-ignore
        acc[typedKey] = values[typedKey]; //FIXME - key type regarding logo
      }
      return acc;
    }, {} as Partial<TEstablishmentInfoForm>);

    if (pathname === ESTABLISHMENT_EDIT_PATH) {
      editEstablishment(changedFields);
    } else {
      createEstablishment(values);
    }
  };

  const establishmentInfoFormik = useFormik({
    initialValues: {
      name: '',
      description: '',
      street_name: '',
      street_number: '',
      email: '',
      phone_number: '',
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      happy_hour_start: '',
      happy_hour_end: '',
      logo: null,
    },
    onSubmit: handleCreateEstablishment,
    validationSchema: getEstablishmentInfoSchema(
      pathname === ESTABLISHMENT_PATH,
    ),
  });
  const { setFieldValue, handleSubmit, handleReset, values } =
    establishmentInfoFormik;

  const handleOnImageCropped = (croppedFile: File) => {
    setSelectedImage(URL.createObjectURL(croppedFile));
    setImageName(croppedFile.name);
    setFieldValue('logo', croppedFile);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageName(file.name);
      setFieldValue('logo', file);
    }
  };

  const handleRemoveImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage('');
    setImageName('Choose logo');
    setFieldValue('logo', null);
  };

  const renderInput = ({
    field,
    type,
    placeholder,
    label = placeholder,
    className,
    ref,
    value,
    defaultValue,
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
      <label>
        <Typography variant="caption">{label}</Typography>
        <Input
          type={type as InputProps['type']}
          placeholder={placeholder}
          className={clsx(className, 'w-full')}
          value={value}
          onChange={handleChange}
          onClick={onClick}
          ref={ref}
          defaultValue={defaultValue}
        />
      </label>
    );
  };

  useEffect(() => {
    createEstablishmentData &&
      toast.success(
        `${createEstablishmentData.name} has been successfully edited!`,
      );
  }, [createEstablishmentData]);
  useEffect(() => {
    editEstablishmentData &&
      toast.success(
        `${chosenEstablishment?.name} has been successfully edited!`,
      );
  }, [editEstablishmentData]);

  useEffect(() => {
    if (chosenEstablishment && pathname === ESTABLISHMENT_EDIT_PATH) {
      setFieldValue('name', chosenEstablishment.name || '');
      setFieldValue('latitude', chosenEstablishment.latitude?.toString() || '');
      setFieldValue(
        'longitude',
        chosenEstablishment.longitude?.toString() || '',
      );
      setFieldValue('description', chosenEstablishment.description || '');
      setFieldValue(
        'happy_hour_start',
        chosenEstablishment.happy_hour_start || '',
      );
      setFieldValue('happy_hour_end', chosenEstablishment.happy_hour_end || '');
      setFieldValue('street_name', chosenEstablishment.street_name || '');
      setFieldValue('street_number', chosenEstablishment.street_number || '');
      setFieldValue('email', chosenEstablishment.email || '');
      setFieldValue('phone_number', chosenEstablishment.phone_number || '');

      setInitialValues({
        name: chosenEstablishment.name || '',
        description: chosenEstablishment.description || '',
        street_name: chosenEstablishment.street_name || '',
        street_number: chosenEstablishment.street_number || '',
        email: chosenEstablishment.email || '',
        phone_number: chosenEstablishment.phone_number || '',
        latitude: chosenEstablishment.latitude?.toString() || '',
        longitude: chosenEstablishment.longitude?.toString() || '',
        happy_hour_start: chosenEstablishment.happy_hour_start || '',
        happy_hour_end: chosenEstablishment.happy_hour_end || '',
        logo: null,
      });
    }
  }, [chosenEstablishment]);

  useEffect(() => {
    setFieldValue('latitude', latitude.toFixed(8));
    setFieldValue('longitude', longitude.toFixed(8));
  }, [latitude, latitude]);

  useEffect(() => {
    startHappyHours && setFieldValue('happy_hour_start', startHappyHours);
  }, [startHappyHours]);

  useEffect(() => {
    endHappyHours && setFieldValue('happy_hour_end', endHappyHours);
  }, [endHappyHours]);

  useEffect(() => {
    createEstablishmentError &&
      createErrorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [createEstablishmentError]);

  useEffect(() => {
    createEstablishmentError &&
      editErrorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [editEstablishmentError]);

  return (
    <FormikProvider value={establishmentInfoFormik}>
      <div
        id="google-map"
        className={clsx(
          'fixed left-2/4 top-2/4 z-10 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
          {
            'invisible opacity-0': !isGoogleMapActive,
            'visible opacity-100': isGoogleMapActive,
          },
        )}
      >
        <div className="h-[80dvh] w-[80dvw] rounded-lg bg-white p-2 shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]">
          <GoogleMap
            lat={latitude}
            lng={longitude}
            setLat={setLatitude}
            setLng={setLongitude}
            closeMap={() => setIsGoogleMapActive(false)}
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="grid grid-cols-2 gap-10 rounded-md bg-white p-9 lg:grid-cols-1 sm:p-4"
      >
        <div className="flex flex-col gap-[25px]">
          {createEstablishmentError && (
            <div ref={createErrorRef}>
              <>
                Create errors:
                {createEstablishmentError?.map(([key, value]) => (
                  <Error key={key}>
                    <Typography variant="caption" weight="semibold">
                      {key}
                    </Typography>
                    {value}
                  </Error>
                ))}
              </>
            </div>
          )}
          {editEstablishmentError && (
            <div ref={editErrorRef}>
              <>
                Edit errors:
                {editEstablishmentError?.map(([key, value]) => (
                  <Error key={key}>
                    <Typography variant="caption" weight="semibold">
                      {key}
                    </Typography>
                    {value}
                  </Error>
                ))}
              </>
            </div>
          )}
          <Typography variant="h4">General</Typography>
          <Field name="name">
            {(props: FieldProps) =>
              renderInput({
                ...props,
                form: props.form as any,
                type: 'text',
                placeholder: 'Name',
                value: props.field.value,
              })
            }
          </Field>
          <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
          <label>
            <Typography variant="caption">Location</Typography>
            <Input
              type="text"
              placeholder="Location"
              className="w-full cursor-pointer"
              value={`Lat: ${values.latitude}; Lng: ${values.longitude};`}
              onClick={() => setIsGoogleMapActive(true)}
            />
          </label>
          <ErrorMessage name="latitude" render={msg => <Error>{msg}</Error>} />
          <ErrorMessage name="longitude" render={msg => <Error>{msg}</Error>} />
          <Field name="description">
            {(props: FieldProps) => (
              <label>
                <Typography variant="caption">Description</Typography>
                <TextareaAutosize
                  maxRows={10}
                  onChange={e =>
                    setFieldValue(props.field.name, e.target.value)
                  }
                  value={props.field.value}
                  placeholder="Description"
                  className="w-full resize-none rounded-md border border-theme-grey-200 bg-transparent px-4 py-2.5 text-sm text-theme-black outline-none placeholder:text-sm placeholder:text-theme-grey-400"
                />
              </label>
            )}
          </Field>
          <ErrorMessage
            name="description"
            render={msg => <Error>{msg}</Error>}
          />
          <div className="relative flex items-center justify-between rounded-md border border-gray-300 p-3">
            <div className="flex items-center gap-2">
              <Field name="logo">
                {() => (
                  <ImageUploaderWithCrop
                    cropWidth={1024}
                    cropHeight={768}
                    imageTitle="logo"
                    onImageCropped={handleOnImageCropped}
                  />
                )}
              </Field>
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt="selected"
                  width={40}
                  height={40}
                />
              ) : (
                <Image src={addImage} alt="add-image" width={40} height={40} />
              )}
              <Typography variant="paragraph">{imageName}</Typography>
              <ErrorMessage name="logo" render={msg => <Error>{msg}</Error>} />
            </div>
            {selectedImage && (
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
        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Add happy hours</Typography>
            <div className="flex w-full justify-between gap-3">
              <div className="relative w-2/4">
                <div
                  id="start-time-picker"
                  className={clsx(
                    'fixed left-2/4 top-2/4 z-10 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
                    {
                      'invisible opacity-0': !isStartPickerActive,
                      'visible opacity-100': isStartPickerActive,
                    },
                  )}
                >
                  <div className="rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]">
                    <StaticTimePicker
                      onChange={newVal => setStartTimepicker(newVal)}
                      value={startTimepicker}
                      onAccept={newVal => {
                        setStartTimepicker(newVal);
                        setIsStartPickerActive(false);
                      }}
                      onClose={() => {
                        setIsStartPickerActive(false);
                      }}
                    />
                  </div>
                </div>
                <Field name="happy_hour_start">
                  {(props: FieldProps) =>
                    renderInput({
                      ...props,
                      form: props.form as any,
                      type: 'text',
                      placeholder: 'Start of happy hours',
                      className: 'w-full',
                      onClick: () => setIsStartPickerActive(true),
                      value: props.field.value,
                    })
                  }
                </Field>
                <ErrorMessage
                  name="happy_hour_start"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>
              <div className="relative w-2/4">
                <div
                  id="end-time-picker"
                  className={clsx(
                    'fixed left-2/4 top-2/4 z-10 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center justify-center gap-1 transition-all duration-300',
                    {
                      'invisible opacity-0': !isEndPickerActive,
                      'visible opacity-100': isEndPickerActive,
                    },
                  )}
                >
                  <div className="rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)]">
                    <StaticTimePicker
                      onChange={newVal => setEndTimepicker(newVal)}
                      value={endTimepicker}
                      onAccept={newVal => {
                        setEndTimepicker(newVal);
                        setIsEndPickerActive(false);
                      }}
                      onClose={() => {
                        setIsEndPickerActive(false);
                      }}
                    />
                  </div>
                </div>
                <Field name="happy_hour_end">
                  {(props: FieldProps) =>
                    renderInput({
                      ...props,
                      form: props.form as any,
                      type: 'text',
                      placeholder: 'End of happy hours',
                      className: 'w-full',
                      onClick: () => setIsEndPickerActive(true),
                      value: props.field.value,
                    })
                  }
                </Field>
                <ErrorMessage
                  name="happy_hour_end"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Address</Typography>
            <Field name="street_name">
              {(props: FieldProps) =>
                renderInput({
                  ...props,
                  form: props.form as any,
                  type: 'text',
                  placeholder: 'Street name',
                  value: props.field.value,
                })
              }
            </Field>
            <ErrorMessage
              name="street_name"
              render={msg => <Error>{msg}</Error>}
            />
            <Field name="street_number">
              {(props: FieldProps) =>
                renderInput({
                  ...props,
                  form: props.form as any,
                  type: 'text',
                  placeholder: 'House number',
                  value: props.field.value,
                })
              }
            </Field>
            <ErrorMessage
              name="street_number"
              render={msg => <Error>{msg}</Error>}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Contacts</Typography>
            <Field name="email">
              {(props: FieldProps) =>
                renderInput({
                  ...props,
                  form: props.form as any,
                  type: 'email',
                  placeholder: 'Email',
                  value: props.field.value,
                })
              }
            </Field>
            <ErrorMessage name="email" render={msg => <Error>{msg}</Error>} />
            <Field name="phone_number">
              {(props: FieldProps) =>
                renderInput({
                  ...props,
                  form: props.form as any,
                  ref: inputRef,
                  type: 'text',
                  label: 'Phone',
                  placeholder: '+996-___-______',
                  value: props.field.value,
                })
              }
            </Field>
            <ErrorMessage
              name="phone_number"
              render={msg => <Error>{msg}</Error>}
            />
          </div>
          <SubmitButton
            isMutating={
              isEditEstablishmentMutating || isCreateEstablishmentMutating
            }
          >
            {pathname === ESTABLISHMENT_EDIT_PATH ? 'Edit' : 'Create'}
          </SubmitButton>
        </div>
      </form>
    </FormikProvider>
  );
};
