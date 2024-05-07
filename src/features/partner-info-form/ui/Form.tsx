'use client';

import { useState } from 'react';
import { StaticTimePicker } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { Dayjs } from 'dayjs';
import Image from 'next/image';

import { GoogleMap } from '@/entities/map';
import {
  END_TIME_PICKER,
  GOOGLE_MAP,
  START_TIME_PICKER,
  useMonitorTimePicker,
} from '@/features/partner-info-form';
import { SubmitButton } from '@/features/submit-form';
import { addImage, delete_, download, useCloseForm } from '@/shared';
import { useCreateEstablishment } from '@/shared/services/mutations/useCreateEstablishment';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const Form = () => {
  const { trigger } = useCreateEstablishment();

  const [startTimepicker, setStartTimepicker] = useState<Dayjs | null>(null);
  const [endTimepicker, setEndTimepicker] = useState<Dayjs | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(42.87656);
  const [longitude, setLongitude] = useState(74.588274);
  const [startHappyHours, setStartHappyHours] = useState('');
  const [endHappyHours, setEndHappyHours] = useState('');

  //TODO - onSubmit handler SWR

  const [isGoogleMapActive, setIsGoogleMapActive] = useState(false);
  const [isStartPickerActive, setIsStartPickerActive] = useState(false);
  const [isEndPickerActive, setIsEndPickerActive] = useState(false);

  useMonitorTimePicker(startTimepicker, setStartHappyHours);
  useMonitorTimePicker(endTimepicker, setEndHappyHours);

  useCloseForm(GOOGLE_MAP, setIsGoogleMapActive);
  useCloseForm(START_TIME_PICKER, setIsStartPickerActive);
  useCloseForm(END_TIME_PICKER, setIsEndPickerActive);

  const handleCreateEstablishment: React.FormEventHandler = e => {
    e.preventDefault();

    trigger({
      owner: '7',
      name,
      email,
      description,
      phone_number: phone,
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      happy_hour_start: startHappyHours,
      happy_hour_end: endHappyHours,
    });
  };

  return (
    <form
      className="grid grid-cols-1 gap-10 rounded-md bg-white p-9 md:grid-cols-2"
      onSubmit={handleCreateEstablishment}
    >
      <div className="grid grid-rows-[40px_50px_50px_100px] gap-2 2xl:grid-rows-[50px_100_100px_1fr]">
        <Typography variant="paragraph">General</Typography>
        <Input
          value={name}
          type="text"
          name="name"
          placeholder="Name"
          required
          onChange={e => setName(e.target.value)}
        />
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

        <Input
          type="text"
          placeholder="Location"
          className="cursor-pointer"
          defaultValue={`Lat: ${latitude || null}; Lng: ${longitude || null}`}
          onClick={() => setIsGoogleMapActive(true)}
        />
        <Input
          type="hidden"
          name="latitude"
          aria-label="Latitude"
          value={latitude}
        />
        <Input
          type="hidden"
          name="longitude"
          aria-label="Longitude"
          value={longitude}
        />
        <Input
          value={description}
          type="text"
          name="desc"
          placeholder="Description"
          required
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="grid gap-[35px]">
        <label className="relative flex items-center justify-between rounded-md border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              btnType="icon"
              className="bg-theme-grey-200"
            >
              <Input
                type="file"
                name="image"
                className="absolute left-0 top-0 z-10 block h-full w-2/4 opacity-0"
              />
              <Image
                src={addImage}
                alt="add-image"
                className=""
                width={40}
                height={40}
              />
            </Button>
            <Typography variant="paragraph">Choose image</Typography>
          </div>
          <div className="flex gap-2">
            <Button variant="none" size="sm" btnType="icon">
              <Image src={delete_} alt="delete" className="fill-red-500" />
            </Button>

            <Button variant="none" size="sm" btnType="icon">
              <Image src={download} alt="download" className="" />
            </Button>
          </div>
        </label>

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
                <div className="w-[320px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[560px]">
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

              <Input
                type="text"
                name="start"
                placeholder="Start of happy hours"
                className="w-full"
                value={startHappyHours}
                readOnly
                onClick={() => setIsStartPickerActive(true)}
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
                <div className="w-[320px] rounded-lg bg-white p-[24px] shadow-[0px_0px_30px_3000px_rgba(0,0,0,0.7)] sm:w-[560px]">
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
              <Input
                type="text"
                name="end"
                placeholder="End of happy hours"
                className="w-full"
                value={endHappyHours}
                readOnly
                onClick={() => setIsEndPickerActive(true)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography variant="h5">Contacts</Typography>

          <Input
            value={email}
            type="text"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            value={phone}
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <SubmitButton type="create" />
        </div>
      </div>
    </form>
  );
};
