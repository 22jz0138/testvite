// import React from 'react'
// import { Routes, Route,Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPeopleGroup ,faPersonShelter,faQrcode,faClipboardQuestion,faPersonChalkboard,faGraduationCap,faChartLine} from '@fortawesome/free-solid-svg-icons';  // 必要なアイコンをインポート
// import styles from './RoutingSidebar.module.css';

// export default function RoutingSidebar({ checkbool}) {
// return (
//     <>  
//         <aside className={styles.sideBerArea}>
//             <ul className={`${styles.list} ${checkbool ? '' : styles.close}`}>
//                 <li>
//                     <Link to="/admin/">
//                         {checkbool?<p>アナリティクス</p>: <FontAwesomeIcon icon={faChartLine} /> }
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/team">
//                         {checkbool?<p>チーム一覧</p>: <FontAwesomeIcon icon={faPeopleGroup} /> }
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/visitor">
//                         {checkbool?<p>来場者</p>: <FontAwesomeIcon icon={faPersonShelter}/>}
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/student">
//                         {checkbool?<p>学生</p>: <FontAwesomeIcon icon={faGraduationCap} />}
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/question">
//                         {checkbool?<p>アンケート</p>: <FontAwesomeIcon icon={faClipboardQuestion}/>}
//                     </Link>
//                 </li>
//                 <li>
//                     <Link to="/admin/area">
//                         {checkbool?<p>会場</p>:<FontAwesomeIcon icon={faPersonChalkboard}/>}
//                     </Link>
//                 </li>
//             </ul>
//         </aside>
//     </>
// )
// }
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPersonShelter, faClipboardQuestion, faPersonChalkboard, faGraduationCap, faChartLine } from '@fortawesome/free-solid-svg-icons';
import styles from './RoutingSidebar.module.css';

export default function RoutingSidebar({ checkbool }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className={styles.sideBerArea}>
            <ul className={`${styles.list} ${checkbool ? '' : styles.close}`}>
                <li>
                    <Link to="/admin/">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faChartLine} />
                                <p className={`${currentPath === '/admin/' ? styles.active : ''}`}>アナリティクス</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faChartLine} />
                            </div>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/admin/team">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faPeopleGroup} />
                                <p className={`${currentPath === '/admin/team' ? styles.active : ''}`}>チーム一覧</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faPeopleGroup} />
                            </div>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/admin/visitor">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faPersonShelter} />
                                <p className={`${currentPath === '/admin/visitor' ? styles.active : ''}`}>来場者</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faPersonShelter} />
                            </div>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/admin/student">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faGraduationCap} />
                                <p className={`${currentPath === '/admin/student' ? styles.active : ''}`}>学生</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faGraduationCap} />
                            </div>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/admin/question">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faClipboardQuestion} />
                                <p className={`${currentPath === '/admin/question' ? styles.active : ''}`}>アンケート</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faClipboardQuestion} />
                            </div>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/admin/area">
                        {checkbool ? (
                            <div className={styles.innerList}>
                                <FontAwesomeIcon icon={faPersonChalkboard} />
                                <p className={`${currentPath === '/admin/area' ? styles.active : ''}`}>会場</p>
                            </div>
                        ) : (
                            <div className={styles.iconArea}>
                                <FontAwesomeIcon icon={faPersonChalkboard} />
                            </div>
                        )}
                    </Link>
                </li>
            </ul>
        </aside>
    );
}
