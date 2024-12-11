import React, { useState } from 'react'
import DropArea from '../../base/DnD/DropArea';

const Questionnaire = () => {
    const [items, setItems] = useState(['Item1','Item2','Item3']);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
      };
    return (
        <div>
            <h1>ドラッグアンドドロップリスト</h1>
            <DropArea items={items} moveItem={moveItem} />
        </div>
    )
}

export default Questionnaire