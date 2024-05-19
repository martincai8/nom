"use client"

import Landing from "@/components/Landing/Landing";
import Onboarding from "@/components/Onboard/Onboard";
import Profile from "@/components/Profile";
import { useAuth } from "@/utility/Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isOnboarded, user } = useAuth();

  return !user ?
    <Landing />
   : isOnboarded ? (
    <main>
      youre on the home page
      <Profile />
    </main>
  ) : <Onboarding/> 
}

