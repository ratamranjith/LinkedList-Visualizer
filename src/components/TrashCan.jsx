// src/components/TrashCan.jsx
import React from "react";
import { useDrop } from "react-dnd";
import { FaTrash } from "react-icons/fa";

const TrashCan = ({ onDrop }) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "NODE",
    drop: (item) => onDrop(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={`trash-can p-4 rounded ${
        isOver ? "bg-red-200" : "bg-red-900"
      } text-white flex items-center justify-center`}
    >
      <FaTrash size={24} />
    </div>
  );
};

export default TrashCan;
