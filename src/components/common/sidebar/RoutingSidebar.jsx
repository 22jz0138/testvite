import React from 'react'
import { Routes, Route,Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup ,faPersonShelter,faQrcode,faClipboardQuestion,faPersonChalkboard,faGraduationCap,faChartLine} from '@fortawesome/free-solid-svg-icons';  // 必要なアイコンをインポート
import styles from './RoutingSidebar.module.css';

export default function RoutingSidebar({ checkbool}) {
return (
    <>  
        <aside>
            <ul className={`${styles.list} ${checkbool ? '' : styles.close}`}>
                <li>
                    <Link to="/">
                        {checkbool?'アナリティクス': <FontAwesomeIcon icon={faChartLine} /> }
                    </Link>
                </li>
                <li>
                    <Link to="/team">
                        {checkbool?'チーム一覧': <FontAwesomeIcon icon={faPeopleGroup} /> }
                    </Link>
                </li>
                <li>
                    <Link to="/visitor">
                        {checkbool?'来場者': <FontAwesomeIcon icon={faPersonShelter}/>}
                    </Link>
                </li>
                <li>
                    <Link to="/student">
                        {checkbool?'学生': <FontAwesomeIcon icon={faGraduationCap} />}
                    </Link>
                </li>
                <li>
                    <Link to="/reception">
                        {checkbool?'受付': <FontAwesomeIcon icon={faQrcode}/>}
                    </Link>
                </li>                
                <li>
                    <Link to="/question">
                        {checkbool?'アンケート': <FontAwesomeIcon icon={faClipboardQuestion}/>}
                    </Link>
                </li>
                <li>
                    <Link to="/area">
                        {checkbool?'会場':<FontAwesomeIcon icon={faPersonChalkboard}/>}
                    </Link>
                </li>
            </ul>
        </aside>
    </>
)
}
