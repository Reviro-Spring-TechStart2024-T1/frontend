'use client';

import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { Input, Typography, useDeletePlan, useModal } from '@/shared';
import { Dialog } from '@/widgets/dialog';

interface FormValues {
  delete: string;
}

export const DeleteSubscriptionPlanModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { trigger } = useDeletePlan({ plan_id: data?.plan_id });

  const isModalOpen = isOpen && type === 'deletePlan';

  const handleDeletePlan = () => {
    trigger();
    onClose();
  };

  const initialValues: FormValues = {
    delete: '',
  };

  const DeleteSubscriptionSchema = object().shape({
    delete: string().oneOf(['delete']).required(),
  });

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      isDelete={true}
      btnLabel="Yes, delete"
      title="Are you sure?"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={DeleteSubscriptionSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(_, { resetForm }) => {
          handleDeletePlan();
          resetForm();
        }}
      >
        {formikProps => {
          const { errors } = formikProps;

          return (
            <Form id="form" className="space-y-4">
              <div>
                <Typography variant="paragraph" color="grey">
                  Do you really want to delete this plan?
                </Typography>
                <Typography variant="paragraph" color="grey">
                  This process cannot be undone
                </Typography>
              </div>

              <Field
                title="Please type DELETE to confirm."
                type="text"
                name="delete"
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
