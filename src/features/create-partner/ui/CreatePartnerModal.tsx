'use client';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { useCreatePartner, useModal } from '@/shared';
import { Input, Typography } from '@/shared/ui';
import { Dialog } from '@/widgets/dialog';

interface FormValues {
  email: string;
}

export const CreatePartnerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const { trigger } = useCreatePartner();

  const isModalOpen = isOpen && type === 'createPartner';

  const handleCreatePartner = (props: FormValues) => {
    trigger({ ...props });
    onClose();
  };

  const CreateCategorySchema = object().shape({
    email: string().required(),
  });

  const initialValues: FormValues = {
    email: '',
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} title="Create a partner">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateCategorySchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleCreatePartner(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { errors } = formikProps;

          return (
            <Form id="form" className="space-y-4">
              <div>
                <Typography variant="paragraph" color="grey">
                  Manually create a partner, and once created, they will be
                  added to your partner list.
                </Typography>
              </div>
              <Field
                title="Email"
                type="text"
                name="email"
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
