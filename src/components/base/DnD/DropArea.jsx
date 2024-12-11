import React from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from './DraggableItem';
import { ItemTypes } from './ItemType';
const DropArea = ({ items, moveItem }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.ITEM,
    hover: (draggedItem, monitor) => {
      const dragIndex = draggedItem.index;
      const hoverIndex = monitor.getItem().index;

      if (dragIndex !== hoverIndex) {
        moveItem(dragIndex, hoverIndex);
        draggedItem.index = hoverIndex; // Update index for dragged item
      }
    },
  });

  return (
    <div ref={drop}>
      {items.map((item, index) => (
        <DraggableItem key={index} index={index} item={item} moveItem={moveItem} />
      ))}
    </div>
  );
};

export default DropArea;
