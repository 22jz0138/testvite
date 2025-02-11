import React, { useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import styles from './DeleteSurveyModal.module.css';
import Ajax from '../../../../hooks/Ajax';
import swal from 'sweetalert2';

const DeleteSurveyModal = ({ showFlag, setShowModal, itemid }) => {
  const token = useAuth();
  // console.log(itemid);

  const closeModal = () => {
    setShowModal(false);
  };


  const handleDelete = async (ev) => {
    ev.preventDefault();

    try {
      const data = await Ajax(null, token.token, `survey/${itemid}`, 'delete');
      if (data.status === "success") {
        closeModal();
        swal.fire({
          title: '完了',
          text: '削除が完了しました！',
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
              <h2>この質問を削除します</h2>
              <button className={styles.closeButton} onClick={closeModal}>×</button>
            </div>
              <form onSubmit={handleDelete} className={styles.addForm}>
                <dl className={styles.addInnerForm}>
                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    >
                    削除の確定
                  </button>
                    <span>※削除後の修正はできません。</span>
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
  backgroundColor: "rgba(0, 0, 0, 0.5)", 
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex:999
};

export default DeleteSurveyModal;
