import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SortableItem } from "../../base/DnD/SortableItem";
import { useEffect } from "react";
import { useAuth } from '../../../context/AuthContext';
import styles from './QeDetail.module.css'
import AddQueModal from "../../base/modal/addqueModal/AddQueModal";
// import Ajax from "../../../hooks/Ajax";


const style = {
  padding: "1rem"
};
const QeDetail = () => {
  const token = useAuth();
  // const [itemData,setItemData] = useState();
  const [newque,setNewQue] = useState()
  const [addFlag,setAddFlag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);

    const ShowModal = () => {
        console.log("おされた");
        setShowModal(true);
        console.log(showModal);
      };

    useEffect(()=>{
      setItems([...items,
        { id: 1, name: "react-dnd example 1" },
        { id: 2, name: "react-dnd example 2" },
        { id: 3, name: "react-dnd example 3" }
      ])
    },[])

    useEffect(() => {
      if (addFlag) {
        setItems(prevItems => {
          const maxId = prevItems.reduce((max, item) => Math.max(max, item.id), 0); // 最大のIDを取得
          return [
            ...prevItems,
            { id: maxId + 1, name: newque } // 最大IDに1を足して新しいIDを生成
          ];
        });
        setAddFlag(false); // addFlagをリセット
      }
    }, [addFlag]);
    
    // useEffect(()=>{
    //     Ajax(null, token.token, 'team', 'get')
    //     .then((data) => {
    //       if (data.status === "success") {
    //         setItemData(data.team ); // データが存在しない場合も空配列にする
    //         console.log("データ取得成功");
    //       } else {
    //         console.log(data.status);
    //       }
    //     });
    //   },[])
    useEffect(()=>{
      console.log(items)
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
        <>
          <AddQueModal setAddFlag={setAddFlag} setNewQue={setNewQue}  showFlag={showModal} setShowModal={setShowModal}/>
          <DndProvider backend={HTML5Backend}>
            <ul className={styles.dndArea}>
              {items.map((item, index) => (
                  <SortableItem
                    key={item.id}
                    index={index}
                    item={item}
                    onSortEnd={handleSort}>
                  </SortableItem>
              ))}
              <button className={styles.addQue} onClick={ShowModal}>+</button>
            </ul>
          </DndProvider>
        </>
      );
}

export default QeDetail