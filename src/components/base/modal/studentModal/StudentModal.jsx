import React from "react";
import styles from './StudentModal.module.css'
import Ajax from "../../../../hooks/Ajax";
import { useAuth } from "../../../../context/AuthContext";
import { useParams,useNavigate, Navigate } from 'react-router-dom';

const StudentModal = (props) => {
    const token = useAuth();
    // const studentId = props.stID
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(props);
    const closeModal = () => {
        props.setShowModal(false);
    };
    const deleteStudent = () => {
        Ajax(null, token.token, `student/${id}`, 'DELETE')
        .then((data) => {
            if(data.status === "success") {
                console.log("dekite");
                closeModal();
                navigate('/student');
            } else {
                console.log(data.status);
            }
            setShowModal(true);
        });
    }

    return (
    <>
            {props.showFlag ? (
        <div id={styles.overlay} style={overlay}>
            <div id={styles.modalContent} style={modalContent}>
                    <h2>この学生の情報を削除します</h2>
                    <p>本当によろしいですか</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
                <button className={styles.corectButton} onClick={deleteStudent} >削除</button>
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
