import React from 'react'
import styles from './Team.module.css'
import sampleteam from '../../../../smpleteam.json'
import catjpg from '../../../assets/images.jpg'
import TeamButton from '../../base/teambutton/TeamButton'

export const Team = () => {
  const data = sampleteam;
  return (
    <>
      <div>
        <TeamButton initialVisualType="primary" label="Toggle Button"/>
      </div>
        <div className={styles.teamArea}>
          {data.map((team) => (
              <div key={team.id} className={styles.cardItem}>
                <div className={styles.teamimgArea}>
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
              </div>
          ))}
        </div>
    </>
  )
}
