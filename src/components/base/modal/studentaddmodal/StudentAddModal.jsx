import React from "react";
import styles from './StudentAddModal.module.css'
import { useAuth } from "../../../../context/AuthContext";
import { useState,useEffect } from "react";
import Ajax from "../../../../hooks/Ajax";

const StudentAddModal = (props) => {
    const [putNum, setPutNum] = useState();
    const [putName, setPutName] = useState();
    const [putGrade, setPutGrade] = useState();
    const [putIDNumber,setPutIDNumber] = useState();
    const [putStudentEmployment,setStudentEmployment] = useState();
    // const [teamData,setTeamData] = useState();
    const token = useAuth();
    console.log(props);
    const teamData = Object.values(props.selectData)

    const closeModal = () => {
        props.setShowModal(false);
    };
    const inputTeamNum = (e) => {
        setPutNum(e.target.value);
        console.log(e.target.value);
    };
    const inputStudentName = (e) => {
        setPutName(e.target.value);
    }
    const inputStudentgrade = (e) => {
        setPutGrade(e.target.value);
    }
    const inputStudentIDNumber = (e) => {
        setPutIDNumber(e.target.value);
    }
    const inputStudentEmployment = (e) => {
        setStudentEmployment(e.target.value);
    }
    console.log(teamData);


    const handleSubmit = (ev) => {
        ev.preventDefault();
        const req = {
            team_id : Number(putNum),
            number : putIDNumber,
            employment_target_id: putStudentEmployment,
            grade : Number(putGrade),
            name : putName
        }
        Ajax(null, token.token, 'student', 'post',  req)
        .then((data) => {
            if(data.status === "success") {
            console.log("dekita");
            closeModal();
            alert("登録が完了しました")
            } else {
            console.log(data.status);
            console.log(data.message);
            console.log(token.token );
            console.log(req);
            }   
        })
        }

    return (
    <>
        {props.showFlag ? (
    <div id={styles.overlay} style={overlay}>
        <div id={styles.addModalContent} style={modalContent}>
            <div className={styles.addModalTitleArea}>
                <p>登録する学生の情報を入力してください</p>
                <button  className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
            </div>
                <div className={styles.formArea}>
                    <form onSubmit={handleSubmit} className={styles.addForm}>
                            <dl className={styles.addInnerForm}>
                                <div className={styles.addStudentForm}>
                                    <dt><label htmlFor="text">チーム番号</label></dt>
                                    {/* <dd><input type="text" id="team" onChange={inputTeamNum} required ></input></dd> */}
                                    <dd>
                                        <select name="teams" id="teams" className={styles.teams} onChange={inputTeamNum} required>
                                            <option value="">チームを選択してください</option>
                                            {teamData.map((team)=>(
                                                <option value={team.id} label={team.name} ></option>
                                            ))}
                                        </select>
                                    </dd>
                                </div>
                                <div className={styles.addStudentForm}>
                                    <dt><label htmlFor="text">法人番号</label></dt>
                                    <dd><input type="text" id="employment_target_id	" onChange={inputStudentEmployment}></input></dd>
                                </div>
                                <div className={styles.addStudentForm}>
                                    <dt><label htmlFor="text">学籍番号</label></dt>
                                    <dd><input type="text" id="StudentID" maxLength={8} onChange={inputStudentIDNumber} required></input></dd>
                                </div><div className={styles.addStudentForm}>
                                    <dt><label htmlFor="text">学年</label></dt>
                                    <dd><input type="number" id="grade" max={3} onChange={inputStudentgrade} required></input></dd>
                                </div><div className={styles.addStudentForm}>
                                    <dt><label htmlFor="text">氏名</label></dt>
                                    <dd><input type="text" id="studentName" maxLength={15} onChange={inputStudentName} required></input></dd>
                                </div>
                                <button type="submit" className={styles.submitButton} onClick={handleSubmit}>OK</button>
                            </dl>
                        </form>
                </div>
                <div className={styles.buttonWrapper}>
            </div>
        </div>
    </div>
    ) : null}

    </>
    );
};
const modalContent = {
    background: "white",
    width:"500px",
    height:"650px",
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


export default StudentAddModal;
