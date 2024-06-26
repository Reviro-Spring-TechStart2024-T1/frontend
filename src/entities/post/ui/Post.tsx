import { RiChat4Line } from '@remixicon/react';
import Link from 'next/link';

import { dateToRelative, Post as PostType } from '@/shared';
import { Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';

interface PostProps {
  post: PostType;
  pathname: string;
}

export const Post = ({ post, pathname }: PostProps) => {
  const { id, title, content, created_at, author, comments } = post;

  return (
    <Link href={`${pathname}/${id}`} className="block">
      <div className="cursor-pointer space-y-3 overflow-hidden rounded-md border p-6 shadow-lg transition-colors hover:bg-theme-grey-100">
        <div className="space-y-4">
          <Typography variant="h5" className="line-clamp-1">
            {title}
          </Typography>

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
              <Avatar
                avatar={author.avatar}
                alt="User"
                name={author.first_name}
                isAdmin={!author.first_name}
              />

              <Typography
                variant="caption"
                color="grey"
                className="line-clamp-1 flex gap-1"
              >
                Posted by
                {author.first_name || author.last_name ? (
                  <Typography variant="caption" color="blue">
                    {author.first_name} {author.last_name}
                  </Typography>
                ) : (
                  <Typography variant="caption" color="blue">
                    Admin
                  </Typography>
                )}
              </Typography>
            </div>

            <Typography variant="caption" color="grey">
              {dateToRelative(created_at)}
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
    </Link>
  );
};
