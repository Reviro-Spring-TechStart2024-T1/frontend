'use client';

import { Post } from '@/entities/post';
import { useGetPosts } from '@/shared';
import { Section } from '@/shared/ui';

export const Posts = () => {
  const { data } = useGetPosts();

  return (
    <Section>
      {data?.results.map(post => {
        return <Post {...post} key={post.id} />;
      })}
    </Section>
  );
};
