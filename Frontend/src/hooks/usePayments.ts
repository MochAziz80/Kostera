import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { Payment } from '../types';
import { toast } from 'react-hot-toast';

export const usePayments = () => {
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data } = await api.get<Payment[]>('/payments');
      return data;
    },
  });

  const createPayment = useMutation({
    mutationFn: async (newPayment: Omit<Payment, 'id'>) => {
      const { data } = await api.post<Payment>('/payments', newPayment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment recorded successfully');
    },
    onError: () => {
      toast.error('Failed to record payment');
    },
  });

  const updatePayment = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Payment> & { id: number }) => {
      const { data } = await api.put<Payment>(`/payments/${id}`, updateData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment updated successfully');
    },
    onError: () => {
      toast.error('Failed to update payment');
    },
  });

  return {
    payments,
    isLoading,
    createPayment,
    updatePayment,
  };
};