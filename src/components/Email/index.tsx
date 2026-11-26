'use client'
import {useState, useEffect} from 'react'
import { useLocale } from '@/hooks/useLocale';
import { usePathname } from 'next/navigation'
import { useText } from '@/hooks/useContent'
import Window from '@/components/Window'

const Email = () => {
  const { locale } = useLocale()
  const pathname = usePathname()
  const t = useText()
  const email = t('email.email')
  const name = t('email.name')
  const message = t('email.message')
  const submit = t('email.submit')
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [emailValue, setEmailValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [messageValue, setMessageValue] = useState('')

  useEffect(() => {
    setSuccess(null)
  }, [pathname, locale])

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
      setSuccess(t('email.success'))      
      setEmailValue('')
      setNameValue('')
      setMessageValue('')
      
    }
    if (result.status === 'error') {
      setSuccess(null)
      setError(result.data.message);
    }
  }
  return (
    <div className="mx-auto mb-16 max-w-md px-4">
      <Window title="new_message.txt" className="mb-4" bodyClassName="p-0">
      <form onSubmit={handleSubmit} className="px-8 pb-8 pt-6">
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
            {email}
          </label>
          <input className="win-input" name="email" id="email" type="email" placeholder={email} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
            {name}
          </label>
          <input className="win-input" id="name" name="name" type="text" placeholder={name} value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-fg-muted">
            {message}
          </label>
          <textarea className="win-input h-20" id="message" name="message" placeholder={message} value={messageValue} onChange={(e) => setMessageValue(e.target.value)}></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button className="win-btn w-full px-4 py-2">
            {submit}
          </button>
        </div>
      </form>
      </Window>
    </div>
  )
}

export default Email
