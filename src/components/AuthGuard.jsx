'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../lib/auth';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthorized(true);
    } else {
      router.replace('/login');
    }
  }, [router]);

  return authorized ? <>{children}</> : null;
}
