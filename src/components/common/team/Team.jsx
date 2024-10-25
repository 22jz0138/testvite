import React, { useState } from 'react'
import styles from './Team.module.css'
import sampleteam from '../../../../smpleteam.json'
import catjpg from '../../../assets/images.jpg'
import TeamButton from '../../base/teambutton/TeamButton'
import { Link } from "react-router-dom";


export const Team = () => {
  const [isStyle,setIsStyle] = useState(true);
  const data = sampleteam;
  const setCardView = () => {
    setIsStyle(true); // カード表示に変更
    console.log("card");
  };

  // リスト表示に切り替える関数
  const setListView = () => {
    setIsStyle(false); // リスト表示に変更
    console.log("list");
  };

  
  return (
    <>
    <div className={styles.teamArea}>
      <div className={styles.visualSet}>
        {/* リスト表示に切り替えるボタン */}
        <TeamButton 
        visualType={isStyle ? 'secondary' : 'primary'}
        label="リスト表示" 
        onClick={setListView} 
        isInactive={isStyle}
        />
        {/* カード表示に切り替えるボタン */}
        <TeamButton 
         visualType={isStyle ? 'primary' : 'secondary'} 
        label="カード表示"
        onClick={setCardView}
        isInactive={isStyle} 
        />
        
      </div>
      <div>
        
      </div>
        <div className={isStyle ? styles.teamCardArea : styles.teamAreaList}>
          {data.map((team) => (
              <div key={team.id + "s"} className={isStyle ? styles.cardItem : styles.listItem}>
                <Link to={`/team/${team.id}`} className={isStyle ? "" : styles.listLink}>
                <div className={isStyle ? styles.teamImgCardArea : styles.teamImgListArea}>
                  <img src={catjpg} alt="口を開けた猫" />
                </div>
                <h2>{team.name}</h2>
                <p>{team.detail}</p>
                <ul>
                  {team.students.map((student) => (
                    <li key={student.id}>
                      {student.name} ({student.grade}年生)
                    </li>
                  ))}
                </ul>
                </Link>
              </div>
          ))}
        </div>
    </div>
    </>
  )
}
