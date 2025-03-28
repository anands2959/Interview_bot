'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev <= 1 ? 0 : prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      router.push('/');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-cta backdrop-blur-sm bg-gradient-to-br from-slate-800/40 to-slate-900/40 hover:from-slate-800/50 hover:to-slate-900/50 bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 max-w-2xl w-full text-center p-8 rounded-2xl">
        <div className="flex flex-col items-center gap-8">
          <Image
            src="/robot.png"
            alt="404 Robot"
            width={200}
            height={200}
            className="hover:scale-105 transition-transform duration-300"
          />
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent animate-gradient">
            404
          </h1>
          
          <h2 className="text-2xl text-light-100/90">
            Oops! Page Not Found
          </h2>
          
          <p className="text-light-100/70 text-lg">
            Redirecting to home in <span className="text-cyan-400 font-bold">{countdown}</span> seconds
          </p>

          <Button 
            onClick={() => router.push('/')}
            className="btn-primary transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}