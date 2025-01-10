import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { useParams } from 'react-router-dom';
import styles from './EditTeamModal.module.css'
import { useState } from 'react';
import Ajax from '../../../../hooks/Ajax';


const EditTeamModal = (props) => {
    const token = useAuth();   
    const queId = useParams();
    const [putNum, setPutNum] = useState();
    const [putName, setPutName] = useState();
    const [putDetail, setPutDetail] = useState();
    
    const closeModal = () => {
        props.setShowModal(false);
    };  
    const inputTeamNum = (e) => {
        setPutNum(e.target.value);
    };
    const inputTeamName = (e) => {
        setPutName(e.target.value);
    }
    const inputTeamDetail = (e) => {
        setPutDetail(e.target.value);
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();
        const req = {
            num : putNum,
            name : putName,
            detail : putDetail
        }
        Ajax(null, token.token, `team/${props.propsId}`, 'PUT',  req)
        .then((data) => {
            if(data.status === "success") {
            console.log("dekita");
            closeModal();
            alert("登録が完了しました");
            } else {
            console.log(data.status);
            console.log(data.message);
            console.log(token.token );
            }   
        })
        closeModal();
        }
    return (
        <div id={styles.overlay} style={overlay}>
            <div id={styles.modalContent} style={modalContent}>
                <div className={styles.formArea}>
                        <form onSubmit={handleSubmit} className={styles.editForm}>
                            <dl className={styles.innerForm}>
                                <div className={styles.teamForm}>
                                    <dt><label htmlFor="text">チーム番号</label></dt>
                                    <dd><input type="text" id="team" onChange={inputTeamNum} required></input></dd>
                                </div>
                                <div className={styles.teamForm}>
                                    <dt><label htmlFor="text">システム名</label></dt>
                                    <dd><input type="text" id="system" onChange={inputTeamName} required></input></dd>
                                </div>
                                <div className={styles.teamForm}>
                                    <dt><label htmlFor="text">詳細</label></dt>
                                    <dd><textarea type="text" id="detail" onChange={inputTeamDetail} required></textarea></dd>
                                </div>
                                <button type="submit" className={styles.submitButton}>OK</button>
                            </dl>
                        </form>
                </div>
            </div>
        </div>
    )
}


const modalContent = {
    background: "white",
    width: "500px",
    height: "500px",
    padding: "10px",
    borderRadius: "10px",
};

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

export default EditTeamModal