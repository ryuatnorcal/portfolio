'use client'
import {useState} from 'react'
import { useLocale } from '@/hooks/useLocale';
import { email_labels, emailSuccessMessage } from '../../consts'

const Email = () => {
  const { locale } = useLocale()
  const { email, name, message, submit } = email_labels[locale] || {}
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
  
    const endpoint = '/api/email';
    const options = {
      method: 'POST',
      body: formData,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if(result.status === 'success') {
      setSuccess(emailSuccessMessage[locale])      
      event?.currentTarget?.reset();
    }
    if (result.status === 'error') {
      setError(result.data.message);
    }
  }
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {email}
          </label>
          <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder={email} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {name}
          </label>
          <input className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" name="name" type="text" placeholder={name} />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {message}
          </label>
          <textarea className=" appearance-none border rounded w-full h-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" name="message" placeholder={message}></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button className="w-full bg-black text-white py-2 px-4 rounded">
            {submit}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Email