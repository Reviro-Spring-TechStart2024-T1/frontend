'use client';

import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';

import { deletePlan } from '../../api';

interface DeletePlanProps {
  plan_id?: string | number;
}

export const useDeletePlan = ({ plan_id }: DeletePlanProps) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(`/subscriptions/plans/delete/${plan_id}/`, deletePlan, {
    onError() {
      toast.error('The error occurred');
    },
    onSuccess() {
      toast.success('The plan was deleted');

      mutate('/subscriptions/plans/');
    },
  });
};
