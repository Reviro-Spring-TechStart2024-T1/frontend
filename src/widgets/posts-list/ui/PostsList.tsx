'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { object, string } from 'yup';

import { Post } from '@/entities/post';
import { useCreatePost, useGetPosts } from '@/shared';
import { Button, Error, Input, Section, Textarea } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

interface CreatePostValues {
  title: string;
  comment: string;
}

export const PostsList = () => {
  const pathname = usePathname();
  const { data, mutate } = useGetPosts();
  const { trigger } = useCreatePost();

  const handleCreatePost = ({ title, comment }: CreatePostValues) => {
    trigger({ title: title, content: comment });

    mutate();
  };

  const CreatePostSchema = object().shape({
    title: string().required('The title filed is required'),
    comment: string().required('The comment filed is required'),
  });

  return (
    <>
      <Dialog title="Create a post">
        <Formik
          initialValues={{ title: '', comment: '' }}
          validationSchema={CreatePostSchema}
          validateOnBlur={false}
          onSubmit={(values, { resetForm }) => {
            handleCreatePost(values);
            resetForm();
          }}
        >
          <Form id="form" className="space-y-6 ">
            <div className="space-y-2">
              <Field
                title="Title"
                type="text"
                name="title"
                as={Input}
                className="w-full"
              />
              <ErrorMessage name="title" render={msg => <Error>{msg}</Error>} />
            </div>

            <div className="space-y-2">
              <Field
                title="Comment"
                name="comment"
                maxRows={10}
                minRows={4}
                as={Textarea}
              />
              <ErrorMessage
                name="comment"
                render={msg => <Error>{msg}</Error>}
              />
            </div>
          </Form>
        </Formik>
      </Dialog>

      <Section className="!m-0">
        <div className="flex justify-end">
          <Link href={`${pathname}?dialog=true`} scroll={false}>
            <Button className="gap-1">Create post</Button>
          </Link>
        </div>

        {data?.results?.map(post => {
          return <Post post={post} pathname={pathname} key={post.id} />;
        })}
      </Section>
    </>
  );
};
