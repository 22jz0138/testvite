import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Bar } from 'react-chartjs-2';
import { useAuth } from "../../../context/AuthContext";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Button } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import styles from './SortableItem.module.css';
import DeleteSurveyModal from "../modal/deleteSurveyModal copy/DeleteSurveyModal";

const ItemTypes = {
  CARD: "card"
};

export const SortableItem = ({ item, index, onSortEnd }) => {
  const token = useAuth();
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setDeleteModal] = useState(false);


  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(dragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = dragItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onSortEnd(dragIndex, hoverIndex);
      dragItem.index = hoverIndex;
    },
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  

  // グラフ用解凍件数計算
  const answerCount = {};
  item.number_answers?.forEach(answer => {
    const key = answer.answer; 
    answerCount[key] = (answerCount[key] || 0) + 1; 
  });
  // console.log(item.id);
  // 件数の合計を計算
  const totalAnswers = Object.values(answerCount).reduce((acc, count) => acc + count, 0);

  const ShowDeleteModal = () => {
    setDeleteModal(true);
  };
  // console.log(item);
  
  return (
    <>
      <DeleteSurveyModal 
        showFlag={showDeleteModal} 
        setShowModal={setDeleteModal} 
        itemid={item.id}
      />
      <li ref={ref} style={{ opacity }} data-handler-id={handlerId} className={styles.quevalue}>
      <div className={styles.surveyTitleArea}>
        <p>
          {item.question} <small>回答件数</small>({item.isstring === 1 ? (item.text_answers ? item.text_answers.length : 0) : totalAnswers}件)
        </p>
        <Button variant="contained" color="secondary" onClick={ShowDeleteModal}>×削除</Button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <CircularProgress color="primary" />
        </div>
      ) : item.isstring === 1 ? (
        <div className={styles.queArea}>
          <TableContainer component={Paper} style={{ maxHeight: 300, overflowY: 'auto', maxWidth: '70%',minWidth:"1200px" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '0.9rem', padding: '4px 8px' }}>回答</TableCell>
                  <TableCell style={{ width: '200px', fontSize: '0.9rem', padding: '4px 8px' }}>訪問者名</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.text_answers && item.text_answers.length > 0 ? (
                  item.text_answers.map(answer => (
                    <TableRow key={answer.id}>
                      <TableCell>{answer.answer}</TableCell>
                      <TableCell>{answer.answer_info.visitor.name}</TableCell> 
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>回答がありません</TableCell>
                    <TableCell>情報なし</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div style={{ width: '100%', height: '250px', display: 'flex', justifyContent: 'center' }}>
          <Bar data={{
            labels: Object.keys(answerCount), 
            datasets: [
              {
                label: item.question,
                data: Object.values(answerCount), 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          }} options={{
            responsive: true,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {},
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: '件数'
                },
              }
            }
          }} />
        </div>
      )}
    </li>
    </>
    
  );
};
