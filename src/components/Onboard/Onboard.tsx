"use client"

import styles from './Onboard.module.css'
import { useAuth } from '@/utility/Auth';
import { APPLICATION_KEYS } from '@/utility/config';
import { handleOnboardSubmit } from '@/utility/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

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

  async function onSubmit() {
    await handleOnboardSubmit(user.uid as string, form);
    setO(true);
  }

  return (
    <main> 
        youre on the onboarding page
        <br />
        You should have a request to sub
        <br/>
        {/* phone number, username, foods[], dietaries[], allergies */}
        phone number: <input type="text" value={form?.phoneNumber} onChange={e=>handleInput('phoneNumber', e.target.value)} />
        <br/>
        username: <input type="text" value={form?.username} onChange={e=>handleInput('username', e.target.value)} />
        <br />
        <button onClick={onSubmit}>
            complete onboarding
        </button>
    </main>
  );
}
