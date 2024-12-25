import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { use } from 'react';
import { useParams } from 'react-router-dom';

const DeleteModal = (props) => {
  const token = useAuth();   
  const queId = useParams();
  
  return (
    <div id={styles.overlay} style={overlay}>
                <div id={styles.modalContent} style={modalContent}>

                </div>
    </div>
  )
}

const modalContent = {
  background: "white",
  width: "500px",
  height: "500px",
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

export default DeleteModal