import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card"
};

const style = {
  border: "1px solid #ddd",
  padding: "0.5rem 1rem",
  marginBottom: "0.5rem",
  backgroundColor: "#fafafa",
  cursor: "move",
  listStyle: "none"
};

export const SortableItem = ({ item, index, onSortEnd }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
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
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id: item.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li ref={ref} style={{ ...style, opacity }} data-handler-id={handlerId}>
      {item.name}
    </li>
  );
};
