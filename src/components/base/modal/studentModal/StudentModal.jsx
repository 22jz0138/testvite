import React from "react";
import styles from './StudentModal.module.css'

const StudentModal = (props) => {
    const closeModal = () => {
        props.setShowModal(false);
    };
    console.log(props);

    return (
    <>
        {props.showFlag ? (
    <div id={styles.overlay} style={overlay}>
        <div id={styles.modalContent} style={modalContent}>
                <h2>この学生の情報を削除します</h2>
                <p>本当によろしいですか</p>
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


export default StudentModal;
