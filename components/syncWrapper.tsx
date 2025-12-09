// ./components/SyncWrapper.tsx
'use client'; 
import useClerkStrapiSync from '@/components/hooks/useClerkStrapiSync'; 

export default function SyncWrapper() {
  useClerkStrapiSync();
  return null; 
}