"use client"

import Landing from "@/components/Landing/Landing";
import Onboarding from "@/components/Onboard/Onboard";
import Profile from "@/components/Profile";
import WelcomeCarousel from "@/components/WelcomeCarousel";
import { useAuth } from "@/utility/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { isOnboarded, user } = useAuth();

  const [signingIn, setSigningIn] = useState<boolean>(false);

  return !user ?
    !signingIn ?
      <WelcomeCarousel onNext={()=>setSigningIn(true)} />
      : <Landing />
    : !isOnboarded ?
      <Onboarding/>  
    : <main>
        youre on the home page
        <Profile />
      </main>
}