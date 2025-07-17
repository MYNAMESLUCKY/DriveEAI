import React, { useState } from 'react';
import InputField from '@/components/ui/InputField';
import Button from '@/components/ui/Button';
import SectionTitle from '@/components/ui/SectionTitle';
import { submitEnquiry } from './enquiryService';
import { Enquiry } from './types/enquiry';

const initialState: Omit<Enquiry, 'submittedAt'> = {
  name: '',
  contact: '',
  riceType: '',
  quantity: '',
  location: '',
};

const riceTypes = ['Basmati', 'Sona Masoori', 'Parboiled', 'Brown'];

export const EnquiryForm: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitEnquiry(form);
      setSuccess(true);
      setForm(initialState);
    } catch {
      setError('Submission failed. Try again.');
    }
    setLoading(false);
  };

  if (success) return <div className="text-green-600">Enquiry submitted successfully!</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <SectionTitle>Order Enquiry</SectionTitle>
      <InputField label="Name" name="name" value={form.name} onChange={handleChange} required />
      <InputField label="Contact" name="contact" value={form.contact} onChange={handleChange} required />
      <label className="block text-sm font-medium">Rice Type</label>
      <select name="riceType" value={form.riceType} onChange={handleChange} required className="w-full border rounded p-2">
        <option value="">Select type</option>
        {riceTypes.map(type => <option key={type} value={type}>{type}</option>)}
      </select>
      <InputField label="Quantity (quintals)" name="quantity" value={form.quantity} onChange={handleChange} required />
      <InputField label="Location" name="location" value={form.location} onChange={handleChange} required />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button type="submit" loading={loading}>Submit Enquiry</Button>
    </form>
  );
};
