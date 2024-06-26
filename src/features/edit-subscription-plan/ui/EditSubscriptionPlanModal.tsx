'use client';

import toast from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import { number, object, string } from 'yup';

import { Input, Textarea, useEditPricePlan, useModal } from '@/shared';
import { useEditPlan } from '@/shared/services/mutations/useEditPlan';
import { Dialog } from '@/widgets/dialog';

export interface FormValues {
  plan_id?: string | number;
  title?: string;
  description?: string;
  price?: number;
}

export const EditSubscriptionPlanModal = () => {
  const { isOpen, type, onClose, data } = useModal();
  const { trigger: updatePlan } = useEditPlan();
  const { trigger: updatePrice } = useEditPricePlan();

  const isModalOpen = isOpen && type === 'editPlan';

  const handleEditSubscriptionPlan = (props: FormValues) => {
    const { title, description, price } = props;

    if (data.id) {
      data.title !== title || data.description !== description
        ? updatePlan({ plan_id: data.id, name: title, description })
        : null;
      data.price !== price ? updatePrice({ plan_id: data.id, price }) : null;
    }

    onClose();
    toast.success('The plan was updated');
  };

  const initialValues: FormValues = {
    title: data.title,
    description: data.description,
    price: data.price,
  };

  const EditSubscriptionSchema = object().shape({
    title: string().required(),
    description: string().required(),
    price: number().required().positive().integer(),
  });

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
      title="Edit plan"
      btnLabel="Update"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={EditSubscriptionSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleEditSubscriptionPlan(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { errors } = formikProps;

          return (
            <Form id="form" className="space-y-4">
              <Field
                title="Title"
                type="text"
                name="title"
                errors={errors}
                as={Input}
              />

              <Field
                title="Price"
                type="number"
                name="price"
                errors={errors}
                as={Input}
              />

              <Field
                title="Description"
                name="description"
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
