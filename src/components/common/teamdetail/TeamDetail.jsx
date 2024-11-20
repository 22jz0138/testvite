import React, { useState , useEffect} from 'react';
import styles from './TeamDetail.module.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';

export default function TeamDetail() {
    const token = useAuth();
    const [teamDetail,setTeamDetail] = useState();
    const { team_id } = useParams();

    useEffect(() => {
        Ajax(null, token.token, 'team', 'get')
        .then((data) => {
          if (data.status === "success") {
            setTeamDetail(data.team);
            console.log("データ取得成功");
            // console.log(data.team);
          } else {
            console.log(data.status);
          }
        });
      }, []);
    

      console.log(team_id);
      const teamInfo = teamDetail ? teamDetail.find(item => item.id === team_id) : null;
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
                    {teamInfo ? (
                        <div className={styles.teamText}>
                            <div>
                                <span>チーム名</span>
                                <p>{teamInfo.name}</p>
                            </div>
                            <div>
                                <span>システム名</span>
                                <p>{teamInfo.detail || '詳細情報がありません'}</p>
                            </div>
                            <div>
                                <span>メンバー</span>
                                <p>{teamInfo.num || 'メンバー情報がありません'}</p>
                            </div>
                            <div>
                                <span>詳細</span>
                                <p>{teamInfo.detail || '詳細情報がありません'}</p>
                            </div>
                        </div>
                    ) : (
                        <p>チーム情報を読み込んでいます...</p>
                    )}
                    <div className={styles.teamImage}>
                        <div>
                            <span>ロゴ画像</span>
                            <img src="" alt="チームロゴ" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}