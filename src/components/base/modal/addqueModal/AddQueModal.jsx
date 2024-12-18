import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import styles from './AddQueModal.module.css';

const AddQueModal = (props) => {
  const token = useAuth();
  const queId = useParams();
  const [question, setQuestion] = useState();
  // const [title, setTitle] = useState();
  const [inputValue, setInputValue] = useState('');
  const inputTitle = (e) => {
    setQuestion(e.target.value);
    setInputValue(e.target.value);//disabledd判定用
    console.log(e.target.value); 
  };

  const closeModal = () => {
  props.setShowModal(false);
  };  
  const handleAddQue = () => {
    // const req = {
    //   question : question
    // }
    // Ajax(null, token.token, `questionnaire`, 'post', req)
    // .then((data) => {
    //     if(data.status === "success") {
    //         console.log("dekite");
    //         closeModal();
    //         navigate('/admin/student');
    //     } else {
    //         console.log(data.status);
    //     }
    //     setShowModal(true);
    // });
    props.setNewQue(question);
    props.setAddFlag(true);
    closeModal();
}
  return (
    <>
    {props.showFlag ? (
        <div id={styles.overlay} style={overlay}>
            <div id={styles.modalContent} style={modalContent}>
              <div className={styles.addModalTitleArea}>
                <h2>新しい質問を作成します</h2>
                <button  className={styles.cancelButton} onClick={closeModal}><span>×</span></button>
              </div>
              <form action="">
                <dl className={styles.addInnerForm}>
                    <div className={styles.addQueTitleForm}>
                      <dt><label htmlFor="text">質問内容</label></dt>
                      <dd>
                        <input type="text" id="QueTitle" maxLength={30} onChange={inputTitle} value={inputValue}  required >
                        </input>
                      </dd>
                    </div>
                    <button type="submit" className={!inputValue ? styles.disabled : styles.submitButton}   onClick={handleAddQue}  disabled={!inputValue}>OK</button>
                </dl>
              </form>
            </div>
        </div>
    ) : null}

    </>
    );
}
const modalContent = {
  background: "white",
  width:"500px",
  height:"200px",
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


export default AddQueModal