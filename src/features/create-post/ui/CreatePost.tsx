import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSWRConfig } from 'swr';
import { object, string } from 'yup';

import { Error, Input, Textarea, useCreatePost } from '@/shared';

interface CreatePostValues {
  title: string;
  comment: string;
}

export const CreatePost = () => {
  const { trigger } = useCreatePost();
  const { mutate } = useSWRConfig();

  const handleCreatePost = ({ title, comment }: CreatePostValues) => {
    trigger({ title: title, content: comment });

    // FIX_ME: Make pagination
    mutate('/support/posts/?limit=100&offset=0');
  };

  const CreatePostSchema = object().shape({
    title: string().required('The title filed is required'),
    comment: string().required('The comment filed is required'),
  });
  return (
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
          <ErrorMessage name="comment" render={msg => <Error>{msg}</Error>} />
        </div>
      </Form>
    </Formik>
  );
};
