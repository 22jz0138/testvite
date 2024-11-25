import React, { useState , useEffect} from 'react';
import styles from './TeamDetail.module.css'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { EditButton } from '../../base/editButton/EditButton';
import Ajax from '../../../hooks/Ajax';

export default function TeamDetail(props) {
    const [putNum, setPutNum] = useState();
    const [putName, setPutName] = useState();
    const [putDetail, setPutDetail] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible((f) => !f);
    };
    const inputTeamNum = (e) => {
        setPutNum(e.target.value);
    };
    const inputTeamName = (e) => {
        setPutName(e.target.value);
    }
    const token = useAuth();
    const [teamDetail,setTeamDetail] = useState();
    // const { team_id } = useParams();
    // console.log(props.id);
    useEffect(() => {
        Ajax(null, token.token, `team/${props.id}`, 'get')
        .then((data) => {
            if (data.status === "success") {
            setTeamDetail(data);
            console.log("データ取得成功");
            console.log(data);
        } else {
            console.log(data.status);
        }                                     
        });
    }, []);
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const req = {
            num : putNum,
            name : putName,
            detail : putDetail
        }
        Ajax(null, token.token, `team/${props.id}`, 'PUT',  req)
        .then((data) => {
            if(data.status === "success") {
            console.log("dekita");
            const token = data.token;
            login(token);
            navigate('/team');
            } else {
            console.log(data.status);
            
            }
        })
        }


    //   console.log(teamInfo);
    return (
        <>
            <div className={styles.teamDetaulArea}>
                <div className={styles.titleAndEdit}>
                    <h1 > チーム情報</h1>
                    <EditButton
                    onClick={toggleVisibility}
                    />
                </div>
                <div className={styles.expArea}>
                    <p>チームの基本情報などの情報を入力します</p>
                    <small className={styles.smallp}>※編集する場合は右上のボタンを押してください</small>
                </div>
                <div className={ isVisible ? styles.None :styles.inputArea }>
                    {teamDetail ? (
                        <div className={styles.teamText}>
                            <div>
                                <span>チーム番号</span>
                                <p>{teamDetail.team.num}</p>
                            </div>
                            <div>
                                <span>システム名</span>
                                <p>{teamDetail.team.name || '詳細情報がありません'}</p>
                            </div>
                            <div>
                                <span>メンバー</span>
                                {teamDetail.team.students.map((student)=>(
                                <p>{student.grade + "年  " + student.name}</p>
                                ))}
                            </div>
                            <div>
                                <span>詳細</span>
                                <p>{teamDetail.team.detail || '詳細情報がありません'}</p>
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
                <div className={ isVisible ? styles.inputArea : styles.None }>
                    <form onSubmit={handleSubmit} className={styles.editForm}>
                        <dl>
                            <div className={styles.formField}>
                                <dt><label htmlFor="text">チーム番号</label></dt>
                                <dd><input type="text" id="team" onChange={inputTeamNum}></input></dd>
                            </div>
                            <div className={styles.formField}>
                                <dt><label htmlFor="text">システム名</label></dt>
                                <dd><input type="text" id="system" onChange={inputTeamName}></input></dd>
                            </div>
                            <div className={styles.formField}>
                                <dt><label htmlFor="text">詳細</label></dt>
                                <dd><input type="text" id="detail" onChange={setPutDetail}></input></dd>
                            </div>
                        </dl>
                        <button type="submit" className={styles.submitButton}>OK</button>
                    </form>
                </div>
            </div>
        </>
    );
}