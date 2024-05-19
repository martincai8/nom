"use client"

import Button from "@/components/Button/Button";
import Profile from "@/components/Profile";
import LandingDrawing from "@/drawings/Landing";
import { useAuth } from "@/utility/Auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from './Landing.module.css'

export default function Landing() {
  const router = useRouter();

  const { user, siwg, logOut } = useAuth();

  // if (user) return router.push('/')
    return (
      <div className={styles.wrapper}>
        <div className={styles.drawingContainer}>
          <LandingDrawing />
        </div>
        <div className={styles.headers}>
          <h2>Get started with</h2>
          <h1>nom</h1>
          <h4>
            conveniently decide where to eat with friends + co-workers
          </h4>
        </div>
        <div className={styles.buttons}>
          <Button onClick={siwg} variant="outlined">
            Sign Up
          </Button>
          <Button onClick={siwg}>
            Log in
          </Button>
          <div className={styles.tray}> 
            <h5>or connect using</h5>
            <div className={styles.socialLogins}>
              <div className={styles.gbtn} onClick={siwg}>
                <Image src="/images/googleIcon.png" alt="google" height="25" width="25" />
              </div>
              <div onClick={siwg}>
                <Image src="/images/facebookIcon.png" alt="facebook" height="35" width="35" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  