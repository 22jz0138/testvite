import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SortableItem } from "../../base/DnD/SortableItem";
import { useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import Ajax from "../../../hooks/Ajax";

const style = {
    padding: "1rem"
  };
const QuestionnaireDetail = () => {
    const [items, setItems] = useState([]);
    const [itemData,setItemData] = useState();
    const token = useAuth();
    useEffect(()=>{
        Ajax(null, token.token, 'team', 'get')
        .then((data) => {
          if (data.status === "success") {
            setItemData(data.team ); // データが存在しない場合も空配列にする
            console.log("データ取得成功");
          } else {
            console.log(data.status);
          }
        });
      },[])

      useEffect(()=>{
        items.forEach((e,i)=>{
            console.log(i,e);
        })
      },[items])
    
      const handleSort = useCallback((dragIndex, hoverIndex) => {
        setItems((prevRows) =>
          update(prevRows, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prevRows[dragIndex]]
            ]
          })
        );
      }, []);
    
      return (
        <DndProvider backend={HTML5Backend}>
          <ul style={style}>
            {items.map((item, index) => (
              <SortableItem
                key={item.id}
                index={index}
                item={item}
                onSortEnd={handleSort}
              />
            ))}
          </ul>
        </DndProvider>
      );
}

export default QuestionnaireDetail