'use client';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { Input, Typography, useCreateCategory, useModal } from '@/shared';
import { Dialog } from '@/widgets/dialog';

interface FormValues {
  name: string;
}

export const CreateCategoryModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { trigger } = useCreateCategory();

  const isModalOpen = isOpen && type === 'createCategory';

  // FIX_ME: replace any
  const handleCreateCategory = (props: FormValues) => {
    trigger({ ...props });
    onClose();
  };

  const CreateCategorySchema = object().shape({
    name: string().required(),
  });

  const initialValues: FormValues = {
    name: '',
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} title="Create a category">
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
              <div>
                <Typography variant="paragraph" color="grey">
                  Manually create a category, and once created, they will be
                  available in the partner menu.
                </Typography>
              </div>
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
