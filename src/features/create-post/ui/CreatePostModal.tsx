'use client';

import toast from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import { useSWRConfig } from 'swr';
import { object, string } from 'yup';

import { Input, Textarea, useCreatePost, useModal } from '@/shared';
import { Dialog } from '@/widgets/dialog';

interface CreatePostValues {
  title: string;
  comment: string;
}

export const CreatePostModal = () => {
  const { isOpen, type, onClose } = useModal();
  const { trigger } = useCreatePost();
  const { mutate } = useSWRConfig();

  const isModalOpen = isOpen && type === 'createPost';

  const handleCreatePost = ({ title, comment }: CreatePostValues) => {
    trigger({ title: title, content: comment });
    onClose();
    toast.success('The post was created');

    // FIX_ME: Make pagination
    mutate('/support/posts/?limit=100&offset=0');
  };

  const CreatePostSchema = object().shape({
    title: string().required(),
    comment: string().required(),
  });
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} title="Create a post">
      <Formik
        initialValues={{ title: '', comment: '' }}
        validationSchema={CreatePostSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleCreatePost(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { errors } = formikProps;

          return (
            <Form id="form" className="space-y-6 ">
              <Field
                title="Title"
                type="text"
                name="title"
                errors={errors}
                as={Input}
                className="w-full"
              />

              <Field
                title="Comment"
                name="comment"
                maxRows={10}
                minRows={4}
                maxLength={120}
                errors={errors}
                as={Textarea}
              />
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
