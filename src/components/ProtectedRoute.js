'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isAuthenticated } from '../lib/auth';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    
    if (typeof window !== 'undefined') {
      if (isAuthenticated()) {
        setAuthorized(true);
      } else {
        router.replace('/login');
      }
    }
  }, [router]);

  
  return authorized ? <>{children}</> : null;
}