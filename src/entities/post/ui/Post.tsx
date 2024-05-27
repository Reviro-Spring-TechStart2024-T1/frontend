import { RiChat4Line } from '@remixicon/react';
import Image from 'next/image';

import { Post as PostType } from '@/shared';
import { Typography } from '@/shared/ui';

export const Post = (props: PostType) => {
  const { title, content, created_at, author, comments } = props;

  return (
    <div className="cursor-pointer space-y-3 overflow-hidden rounded-md border p-6 shadow-lg">
      <div className="space-y-4">
        <Typography variant="h5">{title}</Typography>

        <div className="max-h-16">
          <Typography
            variant="caption"
            color="grey"
            className="line-clamp-3 break-words"
          >
            {content}
          </Typography>
        </div>
      </div>

      <hr />

      <div className="flex items-center">
        <div className="flex flex-1 items-center space-x-6">
          <div className="inline-flex items-center space-x-2">
            {author.avatar ? (
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image src={author.avatar} alt="User" fill />
              </div>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-theme-grey-300">
                N
              </div>
            )}

            <Typography variant="caption" color="grey">
              Posted by{' '}
              <Typography variant="caption" color="blue">
                {author.first_name} {author.last_name}
              </Typography>
            </Typography>
          </div>

          <Typography variant="caption" color="grey">
            {created_at}
          </Typography>
        </div>

        <Typography
          variant="caption"
          color="grey"
          className="flex items-center gap-1"
        >
          <RiChat4Line size={20} /> {comments.length}
        </Typography>
      </div>
    </div>
  );
};
