import React from "react";
import styles from './StudentModal.module.css'

const StudentAddModal = (props) => {
    const closeModal = () => {
        props.setShowModal(false);
    };
    console.log(props);

    return (
    <>
        {props.showFlag ? (
    <div id={styles.overlay} style={overlay}>
        <div id={styles.modalContent} style={modalContent}>
                <h2>登録する学生の情報を入力してください</h2>
                <form onSubmit={handleSubmit} className={styles.editForm}>
                        <dl className={styles.innerForm}>
                            <div className={styles.addStudentForm}>
                                <dt><label htmlFor="text">チーム番号</label></dt>
                                <dd><input type="text" id="team" onChange={inputTeamNum} ></input></dd>
                            </div>
                            <div className={styles.addStudentForm}>
                                <dt><label htmlFor="text">法人番号</label></dt>
                                <dd><input type="text" id="employment_target_id	" onChange={inputTeamName}></input></dd>
                            </div>
                            <div className={styles.addStudentForm}>
                                <dt><label htmlFor="text">学籍番号</label></dt>
                                <dd><input type="number" id="number" onChange={inputTeamDetail}></input></dd>
                            </div><div className={styles.addStudentForm}>
                                <dt><label htmlFor="text">学年</label></dt>
                                <dd><input type="number" id="number" onChange={inputTeamDetail}></input></dd>
                            </div><div className={styles.addStudentForm}>
                                <dt><label htmlFor="text">氏名</label></dt>
                                <dd><input type="number" id="number" onChange={inputTeamDetail}></input></dd>
                            </div>
                            <button type="submit" className={styles.submitButton}>OK</button>
                        </dl>
                    </form>
        <div className={styles.buttonWrapper}>
            <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
            <button className={styles.corectButton} >削除</button>
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
    height:"150px",
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
