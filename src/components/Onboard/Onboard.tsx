"use client"

import styles from './Onboard.module.css'
import { useAuth } from '@/utility/Auth';
import { APPLICATION_KEYS } from '@/utility/config';
import { handleOnboardSubmit } from '@/utility/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import ArrowLeft from '@/drawings/ArrowLeft';
import Nommer from '@/drawings/Nommer';
import Slider from '../Slider/Slider';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import Gommer from '@/drawings/Gommer';

const FoodOptions = {
    
}

export default function Onboarding() {

    // device permissions stuff
    const router = useRouter();

    const { pushSub, setPushSub, user, setO } = useAuth();

    async function checkPermissions() {
        switch (Notification.permission) {
            case 'denied':
                throw new Error('Push messages are blocked.');
            case 'granted':
                break;
            default:
                await new Promise((resolve, reject) => {
                    Notification.requestPermission((result) => {
                        if (result !== 'granted') {
                            reject(new Error('Bad permission result'));
                        }

                        resolve(true);
                    });
                });
        }
    }

  async function subscribeDevice() {
    if (pushSub) return
    if (!user?.uid) return

    console.log('subscribeDevice() hit')
    try {
        await checkPermissions();

        // check if there's already a subscription
        try {
            const sw = await navigator.serviceWorker.ready;
            const subscription = await sw.pushManager.getSubscription();
            if (subscription && subscription == pushSub) {
                setPushSub(subscription);
                return; // don't subscribe
            }
        } catch (err) {
            alert(err);
            console.error(err);
        }

        try {
            const sw = await navigator.serviceWorker.ready;
            const subscription = await sw.pushManager.subscribe(
                {
                    userVisibleOnly: true,
                    applicationServerKey: APPLICATION_KEYS.publicKey,
                },
            );
            setPushSub(subscription);
        } catch (err) {
            alert(err);
            console.log(err)
        }
    } catch (err) {
        console.error('subscribeDevice() ', err);
        console.log(Notification.permission)
    }
  }

  async function unsubscribeDevice() {
      try {
          const sw = await navigator.serviceWorker.ready;
          const subscription = await sw.pushManager.getSubscription();
          if (!subscription) {
            setPushSub(undefined);
            return;
          }
          const successful = await subscription.unsubscribe();
          if (!successful) {
              console.warn('Unable to unsub');
          }
          setPushSub(undefined);
      } catch (err) {
          console.error(err);
      }
  }

  useEffect(() => {
    // setPerms();
    subscribeDevice();
    // unsubscribeDevice();
  }, [user])



  // form stuff

  // 5 total steps
  const totalSteps = 6;
  const [ step, setStep ] = useState<number>(0);

    const [form, setForm] = useState<any>({
        phoneNumber: '',
        username: '',
        foods: [],
        dietary: [],
        allergies: []
    });

  function handleInput(key: string, value: any) {
    const updatedForm = JSON.parse(JSON.stringify(form));
    updatedForm[key] = value;
    setForm(updatedForm);
  }
  const handleUsername = (e: any) => handleInput("username", e.target.value);

  async function onSubmit() {
    await handleOnboardSubmit(user.uid as string, form);
    setO(true);
  }

  async function goBack() {
    if (step == 0) return
    setStep(step - 1);
  }

  async function goNext() {
    if (step == 6) {
        // at end
        console.log('do something else')
        return
    }
 
    setStep(step + 1);
  }

  const stepToHeight: any = {
    0: '50',
    1: '45',
    2: '85',
    3: '85',
    4: '85',
    5: '45',
  }

  return (
    <div className={styles.wrapper}> 
        <div className={styles.top}>
            <div className={styles.back} onClick={goBack}>
                <ArrowLeft />
            </div>
            <Slider value={step} max={totalSteps} />
        </div>

        <div style={{
                width: `${totalSteps * 100}vw`,
                height: `${stepToHeight[step]}vh`,
                transition: `all 0.13s ease`,
            }}>
            <div style={{
                display: `grid`,
                gridTemplateColumns:`repeat(${totalSteps}, 1fr)`,
                width: `${totalSteps * 100}vw`,
                transition: `all 0.13s ease`,
                transform: `translateX(-${step * 100}vw)`
            }}>
            <div className={styles.stepInner}>
                <h2>What are your favourite foods?</h2>
                <p>
                    Choose as many as you{`'`}d like
                </p>
            </div>
                <div className={`${styles.stepInner} ${styles.step0}`}>
                    <div className={styles.container}>
                        <div className={styles.nommer}>
                            <Nommer />
                        </div>
                        <h2>Choose your username</h2>
                        <div>
                            <TextField placeholder={"Your username"} value={form?.username} onChange={handleUsername} />
                        </div>
                    </div>
                </div>
                <div className={styles.stepInner}>
                    <h2>What are your favourite foods?</h2>
                    <p>
                        Choose as many as you{`'`}d like
                    </p>
                </div>
                <div className={styles.stepInner}>
                    <h2>Dietary preferences</h2>
                    <p>
                        nom will offer restaurants that have options aligning with your diet
                    </p>
                </div>
                <div className={styles.stepInner}>
                    <div className={styles.container}>
                        <div className={styles.nommer}>
                            <Gommer />
                        </div>
                        <h2>Do you have any allergies?</h2>
                        <div>
                            <TextField placeholder={"Your username"} value={form?.username} onChange={handleUsername} />
                        </div>
                    </div>
                </div>
                <div className={styles.stepInner}>
                    youre ready to nom
                </div>
            </div>
        </div>

        <div className={styles.control}>
            <Button onClick={goNext} disabled={form?.username == ""}>
                Next
            </Button>
        </div>
    </div>
  );
}
