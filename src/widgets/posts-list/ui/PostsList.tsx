'use client';

import { Post } from '@/entities/post';
import { useGetPosts } from '@/shared';
import { Section } from '@/shared/ui';

export const PostsList = () => {
  const { data } = useGetPosts();

  return (
    <Section>
      {data?.results.map(post => {
        return <Post {...post} key={post.id} />;
      })}
    </Section>
  );
};
