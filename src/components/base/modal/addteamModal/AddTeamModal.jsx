import React, { useState } from 'react';
import styles from './AddTeamModal.module.css';
import { useAuth } from '../../../../context/AuthContext';
import Ajax from '../../../../hooks/Ajax';

const AddTeamModal = (props) => {
    const token = useAuth();
    const [teamNum, setTeamNum] = useState('');
    const [sysName, setSysName] = useState('');
    const [sysDetail, setSysDetail] = useState(''); 
    const [teamGrade, setTeamGrade] = useState('');
    const [logoFileName, setLogoFileName] = useState('');

    const closeModal = () => {
        props.setShowModal(false);
    };  

    const inputTitle = (e) => {
        setSysName(e.target.value);
    };

    const inputNum = (e) => {
        setTeamNum(e.target.value);
    };

    const inputDetail = (e) => {
        setSysDetail(e.target.value); 
    };

    const handleGradeChange = (e) => {
        setTeamGrade(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoFileName(file.name);
        }
    };

    const handleAddTeam = (event) => {
        event.preventDefault();
        const req = {
            num: teamNum,
            name: sysName || "未設定",
            detail: sysDetail,
            grade: teamGrade,
            logo: logoFileName
        };  
        Ajax(null, token.token, `team`, 'post', req)
        .then((data) => {
            if(data.status === "success") {
                closeModal();
            } else {
                console.error(data.message);
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
        }
    };

    return (
        <>
        {props.showFlag ? (
            <div id={styles.overlay} style={overlay}>
                <div id={styles.modalContent} style={modalContent}>
                    <div className={styles.addModalTitleArea}>
                        <h2>新しいチームを作成します</h2>
                        <button className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
                    </div>
                    <form onSubmit={handleAddTeam}>
                        <dl className={styles.addInnerForm}>
                            <div className={styles.addTeamTitleForm}>
                                <dt><label htmlFor="sysName">システム名</label></dt>
                                <dd>
                                    <input type="text" id="sysName" maxLength={30} onChange={inputTitle} value={sysName} onKeyDown={handleKeyDown} />
                                </dd>
                                <dt><label htmlFor="teamNum">チーム番号</label></dt>
                                <dd>
                                    <input type="text" id="teamNum" maxLength={30} onChange={inputNum} value={teamNum} required onKeyDown={handleKeyDown} />
                                </dd>
                                <dt><label htmlFor="teamDetail">チーム詳細</label></dt>
                                <dd>
                                    <textarea id="teamDetail" onChange={inputDetail} value={sysDetail} onKeyDown={handleKeyDown} />
                                </dd>
                                <dt><label htmlFor="logo">ロゴ画像</label></dt>
                                <dd>
                                    <input type="file" id="logo" accept='.png' onChange={handleFileChange} />
                                </dd>
                            </div>
                            <div className={styles.selectArea}>
                                <dt><label htmlFor="select">学年</label></dt>
                                <dd>
                                    <select value={teamGrade} onChange={handleGradeChange} className={styles.checkText} required>
                                        <option value="">選択してください</option>
                                        <option value="2">2年</option>
                                        <option value="3">3年</option>
                                    </select>
                                </dd>
                            </div>
                            <button type="submit" className={!teamNum || !teamGrade ? styles.disabled : styles.submitButton} disabled={!teamNum || !teamGrade}>OK</button>
                        </dl>
                    </form>
                </div>
            </div>
        ) : null}
        </>
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

export default AddTeamModal;
