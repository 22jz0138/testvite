import React from 'react'

import styles from './RoutingSidebar.module.css';

export default function RoutingSidebar() {
return (
    <>  
        <aside>
            <ul className={styles.list}>
                <li>チーム一覧</li>
                <li>来場者</li>
                <li>受付</li>
                <li>会場</li>
                <li>アンケート</li>
            </ul>
        </aside>
    </>
)
}
