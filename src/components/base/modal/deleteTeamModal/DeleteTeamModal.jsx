import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import styles from './DeleteTeamModal.module.css'
import Ajax from '../../../../hooks/Ajax';


const DeleteTeamModal = (props) => {
    const token = useAuth(); 
    const queId = useParams();
    console.log(props);
    const closeModal = () =>{
        props.setShowDeleteModal(false);
    }
    const handleDelete = () =>{
        Ajax(null, token.token, `team/${props.propsId}`, 'delete')
        .then((data) => {
            if(data.status === "success") {
                console.log("dekita");
                closeModal();
                // alert("削除しました");

            } else {
                console.log(data.status);
                console.log(data.message);
                console.log(token.token);
                alert("正常に処理が完了しませんでした。時間をおいて再度お試しください")
            }   
        });
        closeModal();
    }
    
    return (
        <div id={styles.overlay} style={overlay}>
            <div id={styles.modalContent} style={modalContent}>
                <div className={styles.addModalTitleArea}>
                    <h2>このチームを削除します</h2>
                    <button className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
                </div>
                <div className={styles.deleteButtonWrapper}>
                    <button className={styles.deleteButton} onClick={handleDelete}>削除</button>
                </div>
            </div>
        </div>
    )
}


const modalContent = {
    background: "white",
    width: "500px",
    height: "200px",
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

export default DeleteTeamModal