'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

declare global {
  interface Window {
    botino?: (command: string, payload?: Record<string, unknown>) => void;
    __BOTINO_CFG?: { websiteId?: string; widgetPublicKey?: string };
  }
}

interface BotinoInitProps {
  demoUserId: string;
  demoName: string;
  demoEmail: string;
  demoUserHash: string | null;
}

const demoCart = [
  { id: 'mobile-accessories-4', title: 'هندزفری بلوتوثی مدل SoundBuds Pro', quantity: 1 },
  { id: 'laptops-1', title: 'لپ‌تاپ ایسوس مدل VivoBook 15 پردازنده i7', quantity: 1 },
];

export function BotinoInit({ demoUserId, demoName, demoEmail, demoUserHash }: BotinoInitProps) {
  const [open, setOpen] = useState(false);
  const [log, setLog] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.botino) return;

    window.botino('register', {
      name: 'get_cart_items',
      handler: () => ({ items: demoCart, count: demoCart.length }),
    });

    window.botino('register', {
      name: 'get_user_info',
      handler: () => ({ name: demoName, email: demoEmail, userId: demoUserId }),
    });

    window.botino('register', {
      name: 'open_help',
      handler: () => {
        window.location.href = '/help';
      },
    });
  }, [demoUserId, demoName, demoEmail]);

  function identifyAnonymous() {
    if (!window.botino) {
      setLog('اسکریپت ویجت هنوز بارگذاری نشده است.');
      return;
    }
    const sessionId = Math.random().toString(36).slice(2, 10);
    window.botino('identify', {
      userId: `guest-${sessionId}`,
      contact: { name: 'کاربر مهمان' },
    });
    setLog(`ورود ناشناس با شناسه guest-${sessionId} انجام شد.`);
  }

  function identifyWithHash() {
    if (!window.botino) {
      setLog('اسکریپت ویجت هنوز بارگذاری نشده است.');
      return;
    }
    if (!demoUserHash) {
      setLog('برای این روش باید BOTINO_IDENTITY_SECRET را در فایل .env تنظیم کنید.');
      return;
    }
    window.botino('identify', {
      userId: demoUserId,
      userHash: demoUserHash,
      contact: { name: demoName, email: demoEmail },
    });
    setLog(`ورود با HMAC برای کاربر ${demoUserId} انجام شد.`);
  }

  async function identifyWithJwt() {
    if (!window.botino) {
      setLog('اسکریپت ویجت هنوز بارگذاری نشده است.');
      return;
    }
    try {
      const res = await fetch('/api/auth/botino-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: demoUserId, name: demoName, email: demoEmail }),
      });
      if (!res.ok) {
        throw new Error('token request failed');
      }
      const { token } = await res.json();
      window.botino('identify', { token });
      setLog('ورود با JWT با موفقیت انجام شد.');
    } catch {
      setLog('دریافت توکن JWT با خطا مواجه شد. مقدار BOTINO_IDENTITY_SECRET را بررسی کنید.');
    }
  }

  return (
    <div dir="rtl" className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {open && (
        <div className="w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
          <h3 className="mb-1 text-sm font-bold text-slate-800">پنل تست احراز هویت باتینو</h3>
          <p className="mb-3 text-xs leading-6 text-slate-500">
            یکی از سه روش شناسایی کاربر را برای تست ویجت باتینو اجرا کنید.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={identifyAnonymous}
              className="rounded-lg border border-slate-200 px-3 py-2 text-right text-sm text-slate-700 hover:bg-slate-50"
            >
              ۱. ورود ناشناس (Anonymous)
            </button>
            <button
              onClick={identifyWithHash}
              className="rounded-lg border border-slate-200 px-3 py-2 text-right text-sm text-slate-700 hover:bg-slate-50"
            >
              ۲. ورود با هش HMAC
            </button>
            <button
              onClick={identifyWithJwt}
              className="rounded-lg border border-slate-200 px-3 py-2 text-right text-sm text-slate-700 hover:bg-slate-50"
            >
              ۳. ورود با توکن JWT
            </button>
          </div>
          {log && (
            <p className="mt-3 rounded-lg bg-primary-50 px-3 py-2 text-xs leading-6 text-primary-800">
              {log}
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full bg-primary-700 text-white shadow-lg transition-transform hover:scale-105'
        )}
        aria-label="باز کردن پنل تست باتینو"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
