'use client';

import { useEffect, useRef, useState } from 'react';
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

import { GoogleMap } from '@/entities/map';
import {
  END_TIME_PICKER,
  EstablishmentSchema,
  ExtendedFieldProps,
  GOOGLE_MAP,
  START_TIME_PICKER,
  TFormValues,
  useMonitorTimePicker,
} from '@/features/partner-info-form';
import { SubmitButton } from '@/features/submit-form';
import { addImage, delete_, download, Error, useCloseForm } from '@/shared';
import { Button, Input, Typography } from '@/shared';
import { useCreateEstablishment } from '@/shared/services/mutations/useCreateEstablishment';

export const Form = () => {
  const { trigger, isMutating, error } = useCreateEstablishment(); //NOTE - GET establishment

  const [startTimepicker, setStartTimepicker] = useState<Dayjs | null>(null); //NOTE - MUI Timepicker state in dayjs
  const [endTimepicker, setEndTimepicker] = useState<Dayjs | null>(null);

  const inputRef = useMask({
    //NOTE - Mask placeholder for phone number
    mask: '+996-___-______',
    replacement: { _: /\d/ },
  });

  const errorRef = useRef<HTMLDivElement | null>(null);

  const [latitude, setLatitude] = useState(42.87656); //SECTION - Inputs' data
  const [longitude, setLongitude] = useState(74.588274);
  const [startHappyHours, setStartHappyHours] = useState('');
  const [endHappyHours, setEndHappyHours] = useState(''); //!SECTION

  const [selectedImage, setSelectedImage] = useState(''); //NOTE - Image's interactive data
  const [imageName, setImageName] = useState('Choose image');

  const [isGoogleMapActive, setIsGoogleMapActive] = useState(false); //NOTE - Google Map and Timepicker modal windows' states
  const [isStartPickerActive, setIsStartPickerActive] = useState(false);
  const [isEndPickerActive, setIsEndPickerActive] = useState(false);

  useMonitorTimePicker(startTimepicker, setStartHappyHours); //NOTE - For time formatting (dayjs => HH:mm)
  useMonitorTimePicker(endTimepicker, setEndHappyHours);

  useCloseForm(GOOGLE_MAP, setIsGoogleMapActive); //NOTE - 'close' listeners for modal windows
  useCloseForm(START_TIME_PICKER, setIsStartPickerActive);
  useCloseForm(END_TIME_PICKER, setIsEndPickerActive);

  const handleCreateEstablishment = ({
    name,
    description,
    email,
    phone_number,
    street_name,
    street_number,
    latitude,
    longitude,
    happy_hour_start,
    happy_hour_end,
    logo,
  }: TFormValues) => {
    if (logo)
      trigger({
        owner: '7', //FIXME - HARDCODE - maybe verify token on server side, send it to client, so we can use user_id which is inside accessToken?
        name,
        email,
        description,
        phone_number,
        latitude,
        longitude,
        happy_hour_start,
        happy_hour_end,
        street_name,
        street_number,
        logo,
      });
  };

  const formik = useFormik({
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
    validationSchema: EstablishmentSchema,
  });

  const { setFieldValue, handleSubmit, handleReset } = formik;

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
    setImageName('Choose image');
    setFieldValue('logo', null);
  };

  const renderInput = ({
    field,
    type,
    placeholder,
    className,
    ref,
    value,
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
        value={type === 'file' ? undefined : value ? value : field.value}
        onChange={handleChange}
        onClick={onClick}
        ref={ref}
      />
    );
  };

  useEffect(() => {
    startHappyHours && setFieldValue('happy_hour_start', startHappyHours);
  }, [startHappyHours]);

  useEffect(() => {
    endHappyHours && setFieldValue('happy_hour_end', endHappyHours);
  }, [endHappyHours]);

  useEffect(() => {
    error && errorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [error]);
  //TODO - refactor the form
  return (
    <FormikProvider value={formik}>
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
          <Typography variant="paragraph">General</Typography>
          {error && (
            <div ref={errorRef}>
              <>
                {error.map(([key, value]) => (
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
          <Field name="name">
            {(props: FieldProps) =>
              renderInput({
                ...props,
                type: 'text',
                placeholder: 'Name',
              })
            }
          </Field>
          <ErrorMessage name="name" render={msg => <Error>{msg}</Error>} />
          <Field name="latitude">
            {({ field }: FieldProps) => (
              <Input type="hidden" aria-label="Latitude" {...field} />
            )}
          </Field>
          <ErrorMessage name="latitude" render={msg => <Error>{msg}</Error>} />
          <Field name="longitude">
            {({ field }: FieldProps) => (
              <Input type="hidden" aria-label="Longitude" {...field} />
            )}
          </Field>
          <ErrorMessage name="longitude" render={msg => <Error>{msg}</Error>} />
          <Input
            type="text"
            placeholder="Location"
            readOnly
            className="cursor-pointer"
            value={`Lat: ${latitude.toFixed(7) || ''}; Lng: ${longitude.toFixed(7) || ''};`}
            onClick={() => setIsGoogleMapActive(true)}
          />
          <Field name="description">
            {(props: FieldProps) => (
              <TextareaAutosize
                maxRows={10}
                onChange={e => setFieldValue(props.field.name, e.target.value)}
                placeholder="Description"
                className="resize-none rounded-md border border-theme-grey-200 bg-transparent px-4 py-2.5 text-sm text-theme-black outline-none placeholder:text-sm placeholder:text-theme-grey-400"
              />
            )}
          </Field>
          <ErrorMessage
            name="description"
            render={msg => <Error>{msg}</Error>}
          />
        </div>
        <div className="grid gap-[25px]">
          <div className="relative flex items-center justify-between rounded-md border border-gray-300 p-3">
            <label>
              <div className="flex items-center gap-2">
                <Field name="logo">
                  {(props: FieldProps) =>
                    renderInput({
                      ...props,
                      type: 'file',
                      className: 'absolute left-0 top-0 z-10 w-1/4 opacity-0',
                    })
                  }
                </Field>
                {selectedImage ? (
                  <Image
                    src={selectedImage}
                    alt="selected"
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={addImage}
                    alt="add-image"
                    width={40}
                    height={40}
                  />
                )}
                <Typography variant="paragraph">{imageName}</Typography>
                <ErrorMessage
                  name="logo"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>
            </label>
            <div className="flex gap-2">
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
              <Button variant="none" size="sm" btnType="button" type="button">
                {
                  <Image src={download} alt="download" className="" /> //TODO - Do we need DOWNLOAD button at all?
                }
              </Button>
            </div>
          </div>
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
                      type: 'text',
                      placeholder: 'Start of happy hours',
                      className: 'w-full',
                      onClick: () => setIsStartPickerActive(true),
                      value: startHappyHours,
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
                      type: 'text',
                      placeholder: 'End of happy hours',
                      className: 'w-full',
                      onClick: () => setIsEndPickerActive(true),
                      value: endHappyHours,
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
                  type: 'text',
                  placeholder: 'Street name',
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
                  type: 'text',
                  placeholder: 'House number',
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
                  type: 'email',
                  placeholder: 'Email',
                })
              }
            </Field>
            <ErrorMessage name="email" render={msg => <Error>{msg}</Error>} />
            <Field name="phone_number">
              {(props: FieldProps) =>
                renderInput({
                  ...props,
                  ref: inputRef,
                  type: 'text',
                  placeholder: '+996-___-______',
                })
              }
            </Field>
            <ErrorMessage
              name="phone_number"
              render={msg => <Error>{msg}</Error>}
            />
          </div>
          <div className="flex justify-end">
            <SubmitButton isMutating={isMutating}>Create</SubmitButton>
          </div>
        </div>
      </form>
    </FormikProvider>
  );
};
