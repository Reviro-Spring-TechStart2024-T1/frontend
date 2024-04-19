import Image from 'next/image';

import { SubmitButton } from '@/features';
import { addImage, delete_, download } from '@/shared';
import { Button, Typography } from '@/shared/ui';

export const PartnerProfile = () => {
  return (
    <div className="profile p-5 lg:px-[200px] lg:py-[150px] xl:px-[300px] xl:py-[190px]">
      <div className="pb-10">
        <Typography variant="h2">Establishment details</Typography>

        <Typography variant="h5" className="text-theme-grey-500">
          Create establishment
        </Typography>
      </div>

      <form className="grid grid-cols-1 gap-5 rounded-md border border-gray-300 sm:grid-cols-2">
        <div className="grid grid-rows-[40px_50px_50px_100px] gap-2 p-5 2xl:grid-rows-[50px_100_100px_1fr]">
          <Typography variant="paragraph">General</Typography>
          <input
            type="text"
            name="name"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 2xl:placeholder:text-2xl"
            placeholder="Name"
            required
          />
          <input
            type="text"
            name="location"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 2xl:placeholder:text-2xl"
            placeholder="Location"
            required
          />
          <input
            type="text"
            name="desc"
            className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 2xl:placeholder:text-2xl"
            placeholder="Description"
            required
          />
        </div>
        <div className="grid grid-rows-[80px_1fr_1fr_100px_100_100px_auto] gap-2 p-5 pt-5 2xl:grid-rows-[100px_100_100px_auto]">
          <label className="relative flex items-center justify-between rounded-md border border-gray-300 p-3 px-5">
            <div className="flex items-center gap-2 ">
              <input
                type="file"
                name="image"
                className="absolute -z-10 block h-0 w-0 opacity-0"
              />
              <Button
                variant="outline"
                btnType="icon"
                className="bg-theme-grey-200 p-3.5"
              >
                <Image
                  src={addImage}
                  alt="add-image"
                  className=""
                  width={40}
                  height={40}
                />
              </Button>

              <button
                type="button"
                className="relative inline-block rounded-md border border-gray-300 text-xs transition-opacity duration-200 hover:opacity-80"
              ></button>
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
          <div>
            <label className="mb-2 flex flex-col gap-2">
              <Typography variant="h5">Add happy hours</Typography>

              <input
                type="text"
                name="start"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400 "
                placeholder="Start"
                required
              />
            </label>
            <input
              type="text"
              name="end"
              className="w-full rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
              placeholder="End"
              required
            />
          </div>
          <div>
            <label className="mb-2 flex flex-col gap-2">
              <Typography variant="h5">Contacts</Typography>
              <input
                type="text"
                name="email"
                className="rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
                placeholder="Email"
              />
            </label>
            <input
              type="text"
              name="phone"
              className="w-full rounded-md border border-gray-300 px-2 py-1 placeholder:text-gray-400"
              placeholder="Phone number"
            />
          </div>
          <div className=" flex justify-end">
            <SubmitButton type="save" />
          </div>
        </div>
      </form>
    </div>
  );
};
