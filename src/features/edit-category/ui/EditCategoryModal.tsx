'use client';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { useEditCategory, useModal } from '@/shared';
import { Input } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

interface FormValues {
  name?: string;
}

export const EditCategoryModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { trigger } = useEditCategory({ id: data?.id });

  const isModalOpen = isOpen && type === 'editCategory';

  // FIX_ME: replace any
  const handleCreateCategory = (props: FormValues) => {
    const { name } = props;

    if (data.id) {
      data.title !== name ? trigger({ name }) : null;
    }
    onClose();
  };

  const CreateCategorySchema = object().shape({
    name: string().required(),
  });

  const initialValues: FormValues = {
    name: data.title,
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      title="Edit a category"
      btnLabel="Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CreateCategorySchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleCreateCategory(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { errors } = formikProps;

          return (
            <Form id="form" className="space-y-4">
              <Field
                title="Name"
                type="text"
                name="name"
                errors={errors}
                as={Input}
              />
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
