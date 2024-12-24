import React from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { use } from 'react';
import { useParams } from 'react-router-dom';

const DeleteModal = (props) => {
  const token = useAuth();   
  const queId = useParams();
  
  return (
    <div>DeleteModal</div>
  )
}

export default DeleteModal