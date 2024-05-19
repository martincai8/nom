"use client"

import styles from './Onboard.module.css'
import { useAuth } from '@/utility/Auth';
import { APPLICATION_KEYS } from '@/utility/config';
import { handleOnboardSubmit, handleSaveUser } from '@/utility/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import ArrowLeft from '@/drawings/ArrowLeft';
import Nommer from '@/drawings/Nommer';
import Slider from '../Slider/Slider';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import Gommer from '@/drawings/Gommer';
import { DIETARY_PREFERENCES, FOOD_OPTIONS } from '@/utility/constants';
import Yommer from '@/drawings/Yommer';
import SearchSelector, { capitalize } from '../SearchSelector/SearchSelector';
import Pommer from '@/drawings/Pommer';

const TinyCheckmark = () => (<svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.4446 0.272891C14.8807 0.639217 14.9372 1.28971 14.5709 1.72582L5.90839 12.0383C5.71641 12.2669 5.43481 12.401 5.13637 12.4061C4.83793 12.4112 4.55191 12.2868 4.35224 12.0649L0.639737 7.93989C0.258732 7.51655 0.293051 6.86451 0.716389 6.4835C1.13973 6.1025 1.79178 6.13682 2.17278 6.56015L5.09192 9.80364L12.9916 0.399232C13.358 -0.0368705 14.0084 -0.0934354 14.4446 0.272891Z" fill="#F23F3A"/>
</svg>)

const TinyClose = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.06046 8.00002L12.0292 5.03127C12.1701 4.89062 12.2494 4.69976 12.2495 4.50068C12.2497 4.3016 12.1708 4.1106 12.0301 3.96971C11.8895 3.82881 11.6986 3.74956 11.4996 3.74938C11.3005 3.74921 11.1095 3.82812 10.9686 3.96877L7.99984 6.93752L5.03109 3.96877C4.89019 3.82787 4.69909 3.74872 4.49984 3.74872C4.30058 3.74872 4.10948 3.82787 3.96859 3.96877C3.82769 4.10967 3.74854 4.30076 3.74854 4.50002C3.74854 4.69928 3.82769 4.89037 3.96859 5.03127L6.93734 8.00002L3.96859 10.9688C3.82769 11.1097 3.74854 11.3008 3.74854 11.5C3.74854 11.6993 3.82769 11.8904 3.96859 12.0313C4.10948 12.1722 4.30058 12.2513 4.49984 12.2513C4.69909 12.2513 4.89019 12.1722 5.03109 12.0313L7.99984 9.06252L10.9686 12.0313C11.1095 12.1722 11.3006 12.2513 11.4998 12.2513C11.6991 12.2513 11.8902 12.1722 12.0311 12.0313C12.172 11.8904 12.2511 11.6993 12.2511 11.5C12.2511 11.3008 12.172 11.1097 12.0311 10.9688L9.06046 8.00002Z" fill="#F23F3A"/>
</svg>)

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
    // subscribeDevice();
    // unsubscribeDevice();
  }, [user])



  // form stuff

  // 5 total steps
  
  const totalSteps = 6;
  const [ step, setStep ] = useState<number>(0);

  const [favFoods, setFavFoods] = useState<string[]>([]);
  const [dietPrefs, setDietPrefs] = useState<string[]>([]);
  const [allergies, setAllergies] = useState<string[]>([]);

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

  // triggered on every step
  async function onSave() {
    console.log(user.email);
    await handleSaveUser(user.uid as string, {
        _id: user.uid,
        email: user.email,
        username: form.username,
        favourites: favFoods,
        dietary: dietPrefs,
        allergies: allergies
    });
}

  async function onSubmit() {
    await handleOnboardSubmit(user.uid as string, {
        _id: user.uid,
        email: user.email,
        username: form.username, // TODO: resolve tech debt (using object for 1 field)
        favourites: favFoods,
        dietary: dietPrefs,
        allergies: allergies
    });
    setO(true);
  }

  async function goBack() {
    if (step == 0) return
    setStep(step - 1);
  }

  async function goNext() {
    if (step == 5) {
        // at end -- go to "Create your first group"
        console.log('do something else')
        await onSubmit();
        return
    } else if (step == 4) {
        // allow notifications
        await subscribeDevice();
    }
    onSave();
    setStep(step + 1);
  }

  async function goNextAlt() {
    switch (step) {
        case 5:
            // at end -- skip to home
            await onSubmit();
        case 4:
            // at notification -- just go next
            goNext();
            await onSave();
        default:
            console.error('what is going on')
    }
  }

  const stepToHeight: any = {
    0: '50',
    1: '73',
    2: '73',
    3: '73',
    4: '50',
    5: '45',
  }

  function handleListToggle(name: string, cb: (arg0: any) =>void, listType: 'food' | 'diet' | 'allergies') {
    console.log(name);
    // using listType so that the state used is the most updated (not memoized in the render)
    const updatedList = JSON.parse(JSON.stringify(listType == 'food' ? favFoods : listType == 'diet' ? dietPrefs : allergies));
    if (updatedList.find((f: string) => f == name)) {
        // if it already exists in the list; deselect
        updatedList.splice(updatedList.indexOf(name), 1);
    } else {
        // select
        updatedList.push(name)
    }
    cb(updatedList);
  }

  return (
    <div className={styles.wrapper}> 
        <div className={styles.top}>
            <div className={styles.back} onClick={goBack}>
                <ArrowLeft />
            </div>
            <Slider value={step} max={5} />
        </div>

        <div style={{
                width: `${totalSteps * 100}vw`,
                height: `${stepToHeight[step]}vh`,
                overflow: 'hidden',
                transition: `all 0.13s ease`,
            }}>
            <div style={{
                display: `grid`,
                gridTemplateColumns:`repeat(${totalSteps}, 1fr)`,
                width: `${totalSteps * 100}vw`,
                transition: `all 0.13s ease`,
                transform: `translateX(-${step * 100}vw)`
            }}>
                <div className={`${styles.stepInner} ${styles.step0}`}>
                    <div className={styles.container}>
                        <div className={styles.nommer}>
                            <Nommer />
                        </div>
                        <div className={styles.label}>Choose your username</div>
                        <div>
                            <TextField placeholder={"Your username"} value={form?.username} onChange={handleUsername} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.stepInner} ${styles.step2}`}>
                    <div className={styles.label}>What are your favourite foods?</div>
                    <p>
                        Select at least one item
                    </p>
                    <div className={styles.foodsGrid}>
                        {FOOD_OPTIONS?.map(({ name, emoji}) => (
                            <div onClick={()=>handleListToggle(name, setFavFoods, 'food')} className={`${styles.food} ${favFoods?.includes(name) ? styles.active : ''}`} key={name}>
                                <div className={styles.foodE}>{emoji}</div>
                                <div className={styles.foodT}>{name}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.stepInner}>
                    <div className={styles.label}>Dietary preferences</div>
                    <p>
                        nom will offer restaurants that have options aligning with your diet
                    </p>
                    <div className={styles.dietaryList}>
                        {DIETARY_PREFERENCES.map((diet) => (
                            <div key={diet} className={styles.dietary} onClick={()=>handleListToggle(diet, setDietPrefs, 'diet')}>
                                <div>
                                    {diet}
                                </div>
                                <div className={`${styles.checkMark} ${dietPrefs?.includes(diet) ? styles.active : ''}`}>
                                    <div className={styles.checkMarkInner}>
                                        <TinyCheckmark />
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>
                </div>
                <div className={`${styles.stepInner} ${styles.step0}`}>
                    <div className={styles.container}>
                        <div className={styles.nommer}>
                            <Gommer />
                        </div>
                        <p>
                            Almost done!
                        </p>
                        <div className={styles.label}>Do you have any allergies?</div>
                        <h4>
                            Enter your food allergies
                        </h4>
                        <div className={styles.selection}>
                            <SearchSelector selected={allergies} onSelect={(a)=>handleListToggle(a, setAllergies, 'allergies')} />
                            <div className={styles.selectedAllergies}>
                                {allergies?.map((a) => (
                                    <div className={styles.allergyItem} key={a} onClick={()=>handleListToggle(a, setAllergies, 'allergies')}>
                                        {capitalize(a)} <TinyClose />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.stepInner} ${styles.step0}`}>
                    <div className={styles.container}>
                        <div className={styles.nommer}>
                            <Pommer />
                        </div>
                        <p>
                            Almost done!
                        </p>
                        <div className={styles.label}>Turn on push notifications</div>
                        <p>
                            We{`'`}ll notify you when it{`'`}s time to vote for restaurants.
                        </p>
                    </div>
                </div>
                <div className={`${styles.stepInner} ${styles.stepFinal}`}>
                    <div className={styles.centre}>
                        <h1>
                            You{`'`}re ready<br/>to <span className={styles.hl}>nom!</span>
                        </h1>
                        <Yommer />
                    </div>
                </div>
            </div>
        </div>

        <div className={styles.control}>
            <Button onClick={goNext} disabled={(step == 0 && form?.username == "")}>
                {step == (totalSteps - 1) ? 'Create your first group' : step == 4 ? 'Allow Notifications' : 'Next'}
            </Button>
            {(step == (totalSteps - 1) || step == 4) && (
                <div className={styles.fadedAction} onClick={goNextAlt}>
                    {step == 4 ? `No thanks, I'll miss out on voting` : 'No thanks, take me home'}
                </div>
            )}
        </div>
    </div>
  );
}
