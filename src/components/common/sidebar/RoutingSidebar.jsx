import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup ,faPersonShelter,faQrcode,faClipboardQuestion,faPersonChalkboard} from '@fortawesome/free-solid-svg-icons';  // 必要なアイコンをインポート
import styles from './RoutingSidebar.module.css';
import MainTeamPage from '../../pages/mainteam/MainTeamPage';
import QuestionnairePage from '../../pages/questionnaire/QuestionnairePage';
import ReceptionPage from '../../pages/reception/ReceptionPage';
import VisitorsLogPage from '../../pages/visitorslog/VisitorsLogPage';


export default function RoutingSidebar({ checkbool}) {
return (
    <>  
        <aside>
            <ul className={`${styles.list} ${checkbool ? '' : styles.close}`}>
                <li>
                            {checkbool?<h2>チーム一覧</h2>: <FontAwesomeIcon icon={faPeopleGroup} /> }
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
