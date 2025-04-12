import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import { Tenant } from '../types';
import { toast } from 'react-hot-toast';

export const useTenants = () => {
  const queryClient = useQueryClient();

  const { data: tenants, isLoading } = useQuery({
    queryKey: ['tenants'],
    queryFn: async () => {
      const { data } = await api.get<Tenant[]>('/tenants');
      return data;
    },
  });

  const createTenant = useMutation({
    mutationFn: async (newTenant: Omit<Tenant, 'id'>) => {
      const { data } = await api.post<Tenant>('/tenants', newTenant);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Tenant added successfully');
    },
    onError: () => {
      toast.error('Failed to add tenant');
    },
  });

  const updateTenant = useMutation({
    mutationFn: async ({ id, ...updateData }: Partial<Tenant> & { id: number }) => {
      const { data } = await api.put<Tenant>(`/tenants/${id}`, updateData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Tenant updated successfully');
    },
    onError: () => {
      toast.error('Failed to update tenant');
    },
  });

  const deleteTenant = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/tenants/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] });
      toast.success('Tenant deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete tenant');
    },
  });

  return {
    tenants,
    isLoading,
    createTenant,
    updateTenant,
    deleteTenant,
  };
};