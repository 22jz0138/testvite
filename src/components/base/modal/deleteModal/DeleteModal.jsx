import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import styles from './DeleteModal.module.css';
import Ajax from '../../../../hooks/Ajax';

const DeleteModal = (props) => {
  const token = useAuth();
  const queId = useParams();

  const handleDelete = () => {
    Ajax(null, token.token, `survey/${queId.id}`, 'delete')
      .then((data) => {
        if (data.status === "success") {
          props.setShowModal(false); // モーダルを閉じる
          // ここで必要に応じてリストを更新する処理を追加
        } else {
          console.error(data.message); // エラーメッセージを表示
        }
      })
      .catch((error) => {
        console.error("エラーが発生しました:", error);
      });
  };

  const closeModal = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {props.showFlag ? (
        <div id={styles.overlay} style={overlay}>
          <div id={styles.modalContent} style={modalContent}>
            <div className={styles.deleteModalTitleArea}>
              <h2>質問を削除しますか？</h2>
              <p>この操作は元に戻せません。</p>
              <div className={styles.buttonArea}>
                <button className={styles.confirmButton} onClick={handleDelete}>削除</button>
                <button className={styles.cancelButton} onClick={closeModal}>キャンセル</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
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
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default DeleteModal;
