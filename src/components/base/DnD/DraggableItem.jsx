import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemType';

const DraggableItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', margin: '4px', padding: '8px' }}>
      {item}
    </div>
  );
};

export default DraggableItem;
