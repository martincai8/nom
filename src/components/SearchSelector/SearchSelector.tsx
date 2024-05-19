"use client"

import { useState } from 'react'
import styles from './SearchSelector.module.css'
import TextField from '../TextField/TextField';
import { ALLERGIES } from '@/utility/constants';

export const capitalize = (w: string) => {
    return `${w[0].toUpperCase()}${w.substring(1, w.length)}`
}

export default function SearchSelector({
    selected,
    onSelect
}: {
    selected: string[];
    onSelect: (arg0: string) => void;
}) {
    const [search, setSearch] = useState<string>('');

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <TextField placeholder={"e.g. peanuts, soy"} value={search} onChange={e=>setSearch(e.target.value)} />
            </div>
            <div className={`${styles.dropdown} ${search.replace(' ', '')?.length > 0 ? styles.show : ''}`}>
                {ALLERGIES.map(a=>a.toLowerCase()).filter(a => a.includes(search.toLowerCase()) && !selected.includes(a))?.length == 0 
                    ? <div>No results</div> 
                    : ALLERGIES.map(a=>a.toLowerCase()).filter(a => a.includes(search.toLowerCase()) && !selected.includes(a)).map((a) => (
                        <div className={styles.item} key={a} onClick={()=>{onSelect(a);setSearch('')}}>
                            {capitalize(a)}
                        </div>
                ))}
            </div>
        </div>
    )
}