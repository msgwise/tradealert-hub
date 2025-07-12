import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const AdminDashboard: React.FC = () => {
  const [form, setForm] = useState({ name: '', endpoint: '', api_key: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('api_configs').insert(form);
    if (error) console.error(error);
    else setForm({ name: '', endpoint: '', api_key: '' });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Add News API</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="block mb-2 p-2 bg-gray-700 w-full" />
        <input name="endpoint" placeholder="Endpoint" value={form.endpoint} onChange={handleChange} className="block mb-2 p-2 bg-gray-700 w-full" />
        <input name="api_key" placeholder="API Key" value={form.api_key} onChange={handleChange} className="block mb-2 p-2 bg-gray-700 w-full" />
        <button type="submit" className="bg-blue-600 p-2 rounded">Add</button>
      </form>
    </div>
  );
};

export default AdminDashboard;

Update for Firebase
