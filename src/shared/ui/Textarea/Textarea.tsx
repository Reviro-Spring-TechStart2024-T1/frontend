import TextareaAutosize from 'react-textarea-autosize';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Typography } from '../Typography';

import { TextareaProps } from './types/Textarea.types';

export const Textarea = (props: TextareaProps) => {
  const { title, name, className, errors, ...rest } = props;

  return (
    <div className="space-y-2">
      {title ? <Typography variant="caption">{title}:</Typography> : null}
      {
        //@ts-ignore
        //FIXME - style property type conflict
        <TextareaAutosize
          name={name}
          {...rest}
          className={twMerge(
            clsx(
              'block h-20 w-full resize-none rounded-md border border-theme-grey-200 bg-transparent px-4 py-2.5 text-sm text-theme-black outline-none placeholder:text-sm placeholder:text-theme-grey-400 focus-within:border-theme-grey-400 focus:ring-0 disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400',
              { ['border-theme-red-500']: name && errors?.[name] },
              className,
            ),
          )}
        />
      }
    </div>
  );
};
