import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import styles from './AddQueModal.module.css';
import { useNavigate } from 'react-router-dom';
import Ajax from '../../../../hooks/Ajax';

const AddQueModal = (props) => {
  const token = useAuth();
  const queId = useParams();//質問登録用アンケートID
  const navigate = useNavigate();
  const maxOrder = props.items.reduce((max, item) => Math.max(max, item.order) + 1, 0);//質問登録用orderの最大値
  const queArray = props.question;
  const [question, setQuestion] = useState();
  // const [title, setTitle] = useState();
  const [inputValue, setInputValue] = useState('');
  const [selectedValue, setSelectedValue] = useState(true);
  const handleChange = (e) => {
    const tfCheck = (e.target.value);
    if(tfCheck === "1"){
      setSelectedValue(true);
    }else{
      setSelectedValue(false);
    }
  };

  const inputTitle = (e) => {
    setQuestion(e.target.value);
    setInputValue(e.target.value);//disabledd判定用
    console.log(e.target.value); 
  };
  // console.log(maxOrder);
  console.log(props.items);

  const closeModal = () => {
  props.setShowModal(false);
  };  
  const handleAddQue = (event) => {
    event.preventDefault();
    const req = {
      questionnaire_id:Number(queId.id),
      order:Number(maxOrder),
      question : inputValue ,
      isstring:selectedValue
    }
    Ajax(null, token.token, `survey`, 'post', req)
    .then((data) => {
        if(data.status === "success") {
            console.log("dekite");
            closeModal();
        } else {
            console.log(data.status);
            console.log(data.message);
        }
    });
    console.log("押した後",req);
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
              <form onSubmit={handleAddQue}>
                <dl className={styles.addInnerForm}>
                    <div className={styles.addQueTitleForm}>
                      <dt><label htmlFor="text">質問内容</label></dt>
                      <dd>
                        <input type="text" id="QueTitle" maxLength={30} onChange={inputTitle} value={inputValue}  required >
                        </input>
                      </dd>
                    </div>
                    <div className={styles.selectArea}>
                      <dt><label htmlFor="select">回答形式</label></dt>
                      <dd>
                        <select value={selectedValue} onChange={handleChange} className={styles.checkText}>
                            <option value="1">text形式</option>
                            <option value="2">その他の形式</option>
                        </select>
                      </dd>
                    </div>
                    <button type="submit" className={!inputValue ? styles.disabled : styles.submitButton} disabled={!inputValue}>OK</button>
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
  height:"280px",
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