import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup ,faPersonShelter,faQrcode,faClipboardQuestion,faPersonChalkboard} from '@fortawesome/free-solid-svg-icons';  // 必要なアイコンをインポート
import styles from './RoutingSidebar.module.css';

export default function RoutingSidebar({ checkbool}) {
return (
    <>  
        <aside>
            <ul className={`${styles.list} ${checkbool ? '' : styles.close}`}>
                <li>
                    {checkbool?'チーム一覧': <FontAwesomeIcon icon={faPeopleGroup} size='l'/> }
                </li>
                <li>
                    {checkbool?'来場者': <FontAwesomeIcon icon={faPersonShelter}/>}
                </li>
                <li>
                    {checkbool?'受付': <FontAwesomeIcon icon={faQrcode}/>}
                </li>                
                <li>
                    {checkbool?'アンケート': <FontAwesomeIcon icon={faClipboardQuestion}/>}
                </li>
                <li>
                    {checkbool?'会場':<FontAwesomeIcon icon={faPersonChalkboard}/>}
                </li>

            </ul>
        </aside>
    </>
)
}
