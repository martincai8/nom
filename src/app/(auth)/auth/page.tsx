"use client"

import Profile from "@/components/Profile";
import { useAuth } from "@/utility/Auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const { user } = useAuth();

  if (user) return router.push('/')
    return (
      <main>
        youre on the login page. Login: <Profile />
      </main>
    );
  }
  