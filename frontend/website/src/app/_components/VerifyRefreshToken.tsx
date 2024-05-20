"use client"

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useAuth } from '../(authentication)/_context/AuthContext';

const VerifyUser = ({
  children
}: {
  children?: React.ReactNode;
}) => {
  const router = useRouter()

  const { auth, setAuth } = useAuth()

  toast.info("Helllow!")

  return children
}

export default VerifyUser
