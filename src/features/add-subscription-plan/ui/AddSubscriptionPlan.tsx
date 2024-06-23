'use client';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { number, object, string } from 'yup';

import { Error, Input, Textarea, useAddPlan, useModal } from '@/shared';
import { Select } from '@/shared/ui/Select';
import { SelectOption } from '@/shared/ui/Select/types/Select.types';
import { Dialog } from '@/widgets/dialog';

const periodOptions = [
  { id: 1, key: 'MONTH', label: 'Monthly' },
  { id: 2, key: 'QUARTER', label: 'Quarterly' },
  { id: 3, key: 'YEAR', label: 'Yearly' },
];

export const AddSubscriptionPlan = () => {
  const { isOpen, onClose, type } = useModal();
  const { trigger } = useAddPlan();

  const isModalOpen = isOpen && type === 'createPlan';

  // FIX_ME: replace any
  const handleAddSubscriptionPlan = (props: any) => {
    trigger({ ...props });
  };

  const AddSubscriptionSchema = object().shape({
    title: string().required('The title is required'),
    description: string().required('The description is required'),
    price: number().required('The price is required'),
  });

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose} title="Create a plan">
      <Formik
        initialValues={{
          title: '',
          description: '',
          period: null,
          price: '',
        }}
        validationSchema={AddSubscriptionSchema}
        validateOnBlur={false}
        onSubmit={(values, { resetForm }) => {
          handleAddSubscriptionPlan(values);
          resetForm();
        }}
      >
        {formikProps => {
          const { values, setFieldValue } = formikProps;

          return (
            <Form id="form" className="space-y-6">
              <div className="space-y-2">
                <Field title="Title" type="text" name="title" as={Input} />
                <ErrorMessage
                  name="title"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>

              <div className="space-y-2">
                <Field
                  value={values.period}
                  options={periodOptions}
                  title="Period"
                  name="period"
                  as={Select}
                  placeholder="Select period"
                  onChange={(option: SelectOption) =>
                    setFieldValue('period', option)
                  }
                />
                <ErrorMessage
                  name="period"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>

              <div className="space-y-2">
                <Field title="Price" name="price" as={Input} />
                <ErrorMessage
                  name="price"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>

              <div className="space-y-2">
                <Field
                  title="Description"
                  name="description"
                  maxRows={10}
                  minRows={4}
                  as={Textarea}
                />
                <ErrorMessage
                  name="description"
                  render={msg => <Error>{msg}</Error>}
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
};
