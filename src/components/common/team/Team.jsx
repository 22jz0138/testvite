import React, { useState, useEffect } from 'react';
import styles from './Team.module.css';
import catjpg from '../../../assets/images.jpg';
import TeamButton from '../../base/teambutton/TeamButton';
import { Link } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Ajax from '../../../hooks/Ajax';

export const Team = () => {
  const [isStyle, setIsStyle] = useState(true);
  const [team, setTeam] = useState([]); // 初期値を空配列に設定
  const token = useAuth();
  

  const setCardView = () => setIsStyle(true);  // カード表示に変更
  const setListView = () => setIsStyle(false); // リスト表示に変更

  const fetchTeamData = () => {
    Ajax(null, token.token, 'team', 'get')
      .then((data) => {
        if (data.status === "success") {
          setTeam(data.team || []); // データが存在しない場合も空配列にする
          console.log("データ取得成功");
        } else {
          console.log(data.status);
        }
      });
  };

  useEffect(() => {
    fetchTeamData(); // 初回データ取得
    const intervalId = setInterval(fetchTeamData, 5000); // 5秒ごとにデータを取得
    return () => clearInterval(intervalId); // コンポーネントがアンマウントされるときにintervalをクリア
  }, [token]);


  

  return (
    <>
      <div className={styles.teamArea}>
        <div className={styles.visualSet}>
          {/* カード表示に切り替えるボタン */}
          <TeamButton
            visualType="card"
            onClick={setCardView}
            isInactive={isStyle}
          />
          {/* リスト表示に切り替えるボタン */}
          <TeamButton
            visualType="list"
            onClick={setListView}
            isInactive={isStyle}
          />
        </div>
        <div>
          <div className={isStyle ? styles.teamCardArea : styles.teamAreaList}>
            {/* データ取得中またはデータが空の場合の処理 */}
            {team.length === 0 ? (
              <p>チーム情報を読み込み中...</p>
            ) : (
              team.map((team) => (
                <div
                  key={team.id }
                  className={isStyle ? styles.cardItem : styles.listItem}
                >
                  <Link
                    to={`/team/${team.id}`}
                    className={isStyle ? "" : styles.listLink}
                  >
                    {console.log(team)}
                    <div
                      className={
                        isStyle
                          ? styles.teamImgCardArea
                          : styles.teamImgListArea
                      }
                    >
                      <img src={catjpg} alt="口を開けた猫" />
                    </div>
                    <h2>{(team.num)}</h2>
                    <h2>{team.name}</h2>
                    <p>{team.detail}</p>
                    <ul>
                      {team.students &&
                        team.students.map((student) => (
                          <li key={student.id}>
                            {student.name} ({student.grade}年生)
                          </li>
                        ))}
                    </ul>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
