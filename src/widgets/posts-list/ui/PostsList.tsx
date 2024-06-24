'use client';

import { usePathname } from 'next/navigation';

import { Post } from '@/entities/post';
import { useGetPosts, useModal } from '@/shared';
import { Button, Section } from '@/shared/ui';

export const PostsList = () => {
  const { onOpen } = useModal();
  const pathname = usePathname();
  const { data } = useGetPosts();

  return (
    <Section className="!m-0">
      <div className="flex justify-end">
        <Button className="gap-1" onClick={() => onOpen('createPost')}>
          Create post
        </Button>
      </div>

      {data?.results?.map(post => {
        return <Post post={post} pathname={pathname} key={post.id} />;
      })}
    </Section>
  );
};
