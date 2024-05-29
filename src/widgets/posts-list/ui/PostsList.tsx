'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Post } from '@/entities/post';
import { useGetPosts } from '@/shared';
import { Button, Section, Typography } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

export const PostsList = () => {
  const pathname = usePathname();

  const { data } = useGetPosts();

  return (
    <>
      <Dialog title="test">
        <Typography variant="caption">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit in id
          saepe, sapiente aliquid ratione ea exercitationem error ipsa ex.
        </Typography>
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
