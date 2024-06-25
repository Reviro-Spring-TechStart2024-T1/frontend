'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Field, Form, Formik } from 'formik';
import { number, object, string } from 'yup';

import { Input, Textarea, Typography, useAddPlan, useModal } from '@/shared';
import { Select } from '@/shared/ui/Select';
import { SelectOption } from '@/shared/ui/Select/types/Select.types';
import { Dialog } from '@/widgets/dialog';

import { FormValues } from '../model';

const periodOptions = [
  { id: 1, key: 'MONTH', label: 'Monthly' },
  { id: 2, key: 'QUARTER', label: 'Quarterly' },
  { id: 3, key: 'YEAR', label: 'Yearly' },
];

export const AddSubscriptionPlanModal = () => {
  const [addTrial, setAddTrial] = useState(false);
  const { isOpen, onClose, type } = useModal();
  const { trigger } = useAddPlan();

  const isModalOpen = isOpen && type === 'createPlan';

  // FIX_ME: replace any
  const handleAddSubscriptionPlan = (props: FormValues) => {
    trigger({ ...props });
    onClose();
    toast.success('The plan was created');
  };

  const handleAddTrial = () => {
    setAddTrial(!addTrial);
  };

  const AddSubscriptionSchema = object().shape({
    title: string().required(),
    description: string().required(),
    period: object().shape({
      key: string().required(),
    }),
    price: number().required().positive().integer(),
    days: number().when('addTrial', (_, schema) => {
      if (addTrial) return number().required().positive().integer();

      return schema.notRequired();
    }),
  });

  const initialValues: FormValues = {
    title: '',
    description: '',
    period: null,
    price: 0,
    days: 0,
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} title="Create a plan">
      <Formik
        initialValues={initialValues}
        validationSchema={AddSubscriptionSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { resetForm }) => {
          handleAddSubscriptionPlan(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { values, setFieldValue, errors } = formikProps;

          return (
            <Form id="form" className="space-y-4">
              <Field
                title="Title"
                type="text"
                name="title"
                errors={errors}
                as={Input}
              />

              <div className="flex items-center gap-4">
                <Field
                  value={values.period}
                  options={periodOptions}
                  title="Period"
                  name="period"
                  as={Select}
                  errors={errors}
                  placeholder="Select period"
                  onChange={(option: SelectOption) =>
                    setFieldValue('period', option)
                  }
                />

                <Field
                  title="Price"
                  type="number"
                  name="price"
                  errors={errors}
                  as={Input}
                />
              </div>

              {addTrial ? (
                <Field
                  title="Days"
                  type="number"
                  name="days"
                  placeholder="Max. 30"
                  max="30"
                  errors={errors}
                  as={Input}
                />
              ) : null}

              {/* FIX_ME: use reusable link as */}
              <div className="flex justify-end" onClick={handleAddTrial}>
                <Typography variant="link">
                  {!addTrial ? 'Add free trial' : 'Remove free trial'}
                </Typography>
              </div>

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
