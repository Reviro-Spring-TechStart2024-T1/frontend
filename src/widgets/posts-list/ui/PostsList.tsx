'use client';

import { useState } from 'react';
import { TextareaAutosize } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Post } from '@/entities/post';
import { useCreatePost, useGetPosts } from '@/shared';
import { Button, Input, Section, Typography } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

export const PostsList = () => {
  const pathname = usePathname();
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const { data } = useGetPosts();
  const { trigger } = useCreatePost();

  const handleClearState = () => {
    setTitle('');
    setComment('');
  };

  const handleCreatePost = () => {
    if (title && comment) {
      trigger({ title: title, content: comment });
    }

    handleClearState();
  };

  return (
    <>
      <Dialog
        title="Create a post"
        onSubmit={handleCreatePost}
        onClose={handleClearState}
        required={title && comment}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Typography variant="caption">Title:</Typography>

            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Typography variant="caption">Comment:</Typography>
            <TextareaAutosize
              maxRows={10}
              minRows={4}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="block h-20 w-full resize-none rounded-md border border-theme-grey-200 bg-transparent px-4 py-2.5 text-sm text-theme-black outline-none placeholder:text-sm placeholder:text-theme-grey-400 focus-within:border-theme-grey-400 focus:ring-0 disabled:bg-theme-grey-300 disabled:placeholder:text-theme-grey-400"
            />
          </div>
        </div>
      </Dialog>

      <Section className="!m-0">
        <div className="flex justify-end">
          <Link href={`${pathname}?dialog=true`} scroll={false}>
            <Button className="gap-1">Create post</Button>
          </Link>
        </div>

        {data?.results.map(post => {
          return <Post {...post} key={post.id} />;
        })}
      </Section>
    </>
  );
};
