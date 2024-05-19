"use client"

import Landing from "@/components/Landing/Landing";
import Onboarding from "@/components/Onboard/Onboard";
import { useAuth } from "@/utility/Auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Home from "@/components/Home/Home";
import Groups from "@/components/Groups/Groups";

export default function App() {
  const router = useRouter();
  const { isOnboarded, user } = useAuth();

  const [signingIn, setSigningIn] = useState<boolean>(false);

  return !user ?
    !signingIn ?
      // <WelcomeCarousel onNext={()=>setSigningIn(true)} />
      <Groups />
      : <Landing />
    : !isOnboarded ?
      <Onboarding/>  
    : <Home />
}