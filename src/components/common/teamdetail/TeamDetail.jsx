import React from 'react';
import styles from './TeamDetail.module.css'


export default function TeamDetail() {
    return (
    <>
        <div className={styles.teamDetaulArea}>
            <div className={styles.titleAndEdit}>
                <h1>チーム情報</h1>
                <h1>編集ボタン</h1>
            </div>
            <div className={styles.expArea}>
                <p>チームの基本情報などの情報を入力します</p>
                <small className={styles.smallp}>※編集する場合は右上のボタンを押してください</small>
            </div>
            <div className={styles.inputArea}>
                <div>
                    <span>チーム名</span>
                    <p>team1</p>
                </div>
                <div>
                    <span>システム名</span>
                    <p>ゆるポタマップ</p>
                </div>
                <div>
                    <span>メンバー</span>
                    <p>team1</p>
                </div>
                <div>
                    <span>詳細</span>
                    <p>team1</p>
                </div>
                <div>
                    <span>ロゴ画像</span>
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    </>
    
    
)
}
