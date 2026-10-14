'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirm: z.string(),
}).refine((d) => d.password === d.confirm, { message: 'Passwords do not match', path: ['confirm'] });

export default function AccountPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const loginForm = useForm<z.infer<typeof loginSchema>>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) });

  return (
    <div className="container-page py-10">
      <Breadcrumbs items={[{ label: 'Account' }]} />
      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-2 border-b border-brand-line mb-6">
            <button onClick={() => setMode('login')} className={`px-4 py-3 text-sm ${mode === 'login' ? 'text-brand-ink border-b border-brand-ink -mb-px' : 'text-brand-muted'}`}>Sign in</button>
            <button onClick={() => setMode('register')} className={`px-4 py-3 text-sm ${mode === 'register' ? 'text-brand-ink border-b border-brand-ink -mb-px' : 'text-brand-muted'}`}>Create account</button>
          </div>
          {mode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(() => alert('Demo: signed in'))} className="space-y-4">
              <Input type="email" placeholder="Email" {...loginForm.register('email')} />
              <Input type="password" placeholder="Password" {...loginForm.register('password')} />
              <Button type="submit">Sign in</Button>
              <Link href="/forgot" className="block text-xs font-mono uppercase tracking-widest link-underline">Forgot password?</Link>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(() => alert('Demo: registered'))} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="First name" {...registerForm.register('firstName')} />
                <Input placeholder="Last name" {...registerForm.register('lastName')} />
              </div>
              <Input type="email" placeholder="Email" {...registerForm.register('email')} />
              <Input type="password" placeholder="Password" {...registerForm.register('password')} />
              <Input type="password" placeholder="Confirm password" {...registerForm.register('confirm')} />
              <Button type="submit">Create account</Button>
            </form>
          )}
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="font-display text-display-md">Why create an account?</div>
          <ul className="mt-6 space-y-4">
            {['Track your orders in real time', 'Save multiple shipping addresses', 'Get early access to new products', 'Earn loyalty points on every purchase'].map((t) => (
              <li key={t} className="flex gap-3 text-sm"><span className="text-brand-red font-mono">—</span><span>{t}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}