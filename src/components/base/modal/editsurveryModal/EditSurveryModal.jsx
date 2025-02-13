import React, { useEffect, useState } from 'react';
import styles from "./EditSurveryModal.module.css";
import swal from 'sweetalert2';
import Ajax from '../../../../hooks/Ajax';
import { useAuth } from '../../../../context/AuthContext';

const EditSurveryModal = ({ showFlag, setShowModal, itemid,itemTitle,items }) => {
    const token = useAuth();
    const [putTitle,setPutTitle] = useState("");
    const [nameError, setNameError] = useState("");
console.log(items);
// console.log(itemid);
    useEffect(() =>{
        setPutTitle(itemTitle)
    },[])

const closeModal = () => {
    setShowModal(false);
};

const inputTitle = (e) => {
    const value = e.target.value;
    if (value.length > 20) {
        setNameError("質問内容は20文字以内で入力してください");
    } else {
        setNameError("");
    }
    setPutTitle(value); // ここを修正
};


const handlePut = async (ev) => {
    ev.preventDefault();

    const req = {
        questionnaire_id:Number(items.questionnaire_id),
        question:putTitle,
        order:Number(items.order),
        isstring:items.isstring
    };

    try {
        const data = await Ajax(null, token.token, `survey/${itemid}`, 'put' ,req);
        if (data.status === "success") {
            closeModal();
            swal.fire({
                title: '完了',
                text: '編集が完了しました！',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } else {
            console.log(data);
            console.log(itemid);
            swal.fire({
                title: 'エラー',
                text: `${data.message}`,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
        } catch (error) {
            console.error("エラーが発生しました:", error);
            swal.fire({
                title: '失敗',
                text: 'もう一度お試しください',
                icon: 'warning',
                confirmButtonText: 'OK'
        });
    }
};

    return (
    <>
    {showFlag && (
        <div className={overlay} style={overlay}>
        <div className={modalContent} style={modalContent}>
            <div className={styles.titleArea}>
            <h2>質問の編集</h2>
            <button className={styles.closeButton} onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handlePut} className={styles.addForm}>
                <dl className={styles.addInnerForm}>
                <div className={styles.teamForm}>
                                <dt><label >質問内容</label></dt>
                                <dd>
                                    <input
                                        type="text"
                                        onChange={inputTitle}
                                        maxLength={20}
                                        value={putTitle }
                                        required
                                    />
                                </dd>
                                {nameError && <span className={styles.error}>{nameError}</span>} 
                            </div>
                    <button 
                        type="submit" 
                        className={styles.submitButton}
                    >
                    変更の確定
                </button>
                </dl>
            </form>
            </div>
        </div>
    )}
    </>
);
}

const modalContent = {
    background: "white",
    width: "500px",
    height: "220px",
    padding: "10px",
    borderRadius: "10px",
};

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex:999
};


export default EditSurveryModal