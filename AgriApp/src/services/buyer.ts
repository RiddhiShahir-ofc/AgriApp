import api from './api';

export async function registerBuyer(payload: any) {
  console.log('[buyer.register] payload:', payload);
  const res = await api.post('/buyer/register', payload);
  console.log('[buyer.register] success:', res.data);
  return res.data;
}

export async function getBuyerStatus() {
  const res = await api.get('/buyer/status');
  return res.data;
}

export async function getBuyerProfile() {
  const res = await api.get('/buyer/profile');
  return res.data;
}
