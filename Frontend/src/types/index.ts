export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  room: string;
  status: 'Active' | 'Late' | 'Inactive';
  rentDue: string;
  payment: string;
  checkInDate: string;
  checkOutDate?: string;
}

export interface Room {
  id: number;
  number: string;
  type: 'Single' | 'Double' | 'Suite';
  floor: number;
  status: 'Occupied' | 'Vacant' | 'Maintenance';
  price: number;
  facilities: string[];
}

export interface Payment {
  id: number;
  tenantId: number;
  tenantName: string;
  roomNumber: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Failed';
  date: string;
  method: 'Cash' | 'Bank Transfer' | 'Credit Card';
}