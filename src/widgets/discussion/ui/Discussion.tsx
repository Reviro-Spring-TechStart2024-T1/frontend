'use client';

import { RiArrowLeftSLine } from '@remixicon/react';
import { useParams } from 'next/navigation';

import { dateToRelative, useGetPost } from '@/shared';
import { Input, Section, Typography } from '@/shared/ui';
import { Avatar } from '@/shared/ui/Avatar';
import { CommentsList } from '@/widgets/comments-list';

export const Discussion = () => {
  const params = useParams<{ id: string }>();
  const { post } = useGetPost(params.id);

  return (
    <Section>
      <div className="space-y-6">
        <div className="mr-8 space-y-4">
          <div className="flex items-center gap-2">
            <RiArrowLeftSLine className="cursor-pointer text-theme-grey-500" />
            <Typography variant="h5" weight="medium">
              {post?.title}
            </Typography>
          </div>

          <div className="inline-flex space-x-2">
            <Avatar avatar="" alt="User" name="S" className="mt-1" />

            <div>
              <Typography variant="paragraph" color="blue">
                {post?.author.first_name} {post?.author.last_name}
              </Typography>
              <Typography variant="caption" color="grey">
                {dateToRelative(post?.created_at)}
              </Typography>
            </div>
          </div>

          <Typography variant="caption">{post?.content}</Typography>
        </div>

        <Input className="w-full" placeholder="Add a comment" />
      </div>

      <CommentsList />
    </Section>
  );
};
