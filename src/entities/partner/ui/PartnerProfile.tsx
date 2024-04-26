import { RiTimeLine } from '@remixicon/react';
import Image from 'next/image';

import { SubmitButton } from '@/features';
import { addImage, delete_, download } from '@/shared';
import { Button, Typography } from '@/shared/ui';
import { Input } from '@/shared/ui/Input/Input';

export const PartnerProfile = () => {
  return (
    <div className="profile min-h-[calc(100dvh-144px)] p-10 lg:mx-[56px] lg:my-[72px] lg:p-0">
      <div className="mb-10">
        <Typography variant="h2">Establishment details</Typography>

        <Typography variant="h5" className="text-theme-grey-500">
          Create establishment
        </Typography>
      </div>

      <form className="grid grid-cols-1 gap-10 rounded-md bg-white p-9 md:grid-cols-2">
        <div className="grid grid-rows-[40px_50px_50px_100px] gap-2 2xl:grid-rows-[50px_100_100px_1fr]">
          <Typography variant="paragraph">General</Typography>

          <Input type="text" name="name" placeholder="Name" required />
          <Input type="text" name="location" placeholder="Location" required />
          <Input type="text" name="desc" placeholder="Description" required />
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
                <Input
                  type="text"
                  name="start"
                  placeholder="Start"
                  className="w-full"
                  required
                />
                <RiTimeLine className="absolute right-[15px] top-2/4 -translate-y-2/4" />
              </div>
              <div className="relative w-2/4">
                <Input
                  type="text"
                  name="end"
                  placeholder="End"
                  className="w-full"
                  required
                />
                <RiTimeLine className="absolute right-[15px] top-2/4 -translate-y-2/4" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography variant="h5">Contacts</Typography>

            <Input type="text" name="email" placeholder="Email" />
            <Input type="text" name="phone" placeholder="Phone number" />
          </div>
          <div className=" flex justify-end">
            <SubmitButton type="save" />
          </div>
        </div>
      </form>
    </div>
  );
};
