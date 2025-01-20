import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import styles from './EditTeamModal.module.css';
import Ajax from '../../../../hooks/Ajax';

const EditTeamModal = (props) => {
    const token = useAuth();   
    const queId = useParams();
    const [putNum, setPutNum] = useState("");
    const [putName, setPutName] = useState("");
    const [putDetail, setPutDetail] = useState("");
    const [numError, setNumError] = useState(""); // チーム番号用エラーメッセージ
    const [nameError, setNameError] = useState(""); // システム名用エラーメッセージ
    const [detailError, setDetailError] = useState(""); // 詳細用エラーメッセージ
    console.log(props);
    
    const closeModal = () => {
        props.setShowModal(false);
    };  

    const inputTeamNum = (e) => {
        const value = e.target.value;
        if (value.length > 5) {
            setNumError("チーム番号は5文字以内で入力してください");
        } else {
            setNumError("");
        }
        setPutNum(value);
    };

    const inputTeamName = (e) => {
        const value = e.target.value;
        if (value.length > 20) {
            setNameError("システム名は20文字以内で入力してください");
        } else {
            setNameError("");
        }
        setPutName(value);
    };

    const inputTeamDetail = (e) => {
        const value = e.target.value;
        if (value.length > 100) {
            setDetailError("詳細は100文字以内で入力してください");
        } else {
            setDetailError("");
        }
        setPutDetail(value);
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (numError || nameError || detailError) {
            return; // エラーがある場合は送信しない
        }
        const req = {
            num: putNum,
            name: putName,
            detail: putDetail
        };
        Ajax(null, token.token, `team/${props.propsId}`, 'PUT', req)
        .then((data) => {
            if(data.status === "success") {
                console.log("dekita");
                closeModal();
                alert("登録が完了しました");
            } else {
                console.log(data.status);
                console.log(data.message);
                console.log(token.token);
            }   
        });
        closeModal();
    };

    return (
        <div id={styles.overlay} style={overlay}>
            <div id={styles.modalContent} style={modalContent}>
                <div className={styles.addModalTitleArea}>
                    <h2>登録情報の編集</h2>
                    <button className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
                </div>
                <div className={styles.formArea}>
                    <form onSubmit={handleSubmit} className={styles.editForm}>
                        <dl className={styles.innerForm}>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">チーム番号</label></dt>
                                <dd>
                                    <input
                                        type="text"
                                        id="team"
                                        onChange={inputTeamNum}
                                        maxLength={5}
                                        value={putNum || props.teamData.team.num || ""}
                                        required
                                    />
                                </dd>
                                {numError && <span className={styles.error}>{numError}</span>} 
                            </div>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">システム名</label></dt>
                                <dd>
                                    <input
                                        type="text"
                                        id="system"
                                        onChange={inputTeamName}
                                        maxLength={20}
                                        value={putName || props.teamData.team.name || ""}
                                        required
                                    />
                                </dd>
                                {nameError && <span className={styles.error}>{nameError}</span>} 
                            </div>
                            <div className={styles.teamForm}>
                                <dt><label htmlFor="text">詳細</label></dt>
                                <dd>
                                    <textarea
                                        id="detail"
                                        onChange={inputTeamDetail}
                                        maxLength={100}
                                        value={putDetail || props.teamData.team.detail || ""}
                                    />
                                </dd>
                                {detailError && <span className={styles.error}>{detailError}</span>} 
                            </div>
                            <button type="submit" className={styles.submitButton}>OK</button>
                        </dl>
                    </form>
                </div>
            </div>
        </div>
    );
};

const modalContent = {
    background: "white",
    width: "500px",
    height: "600px",
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

export default EditTeamModal;
