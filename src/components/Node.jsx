// src/components/Node.jsx
import React from "react";
import { useDrag } from "react-dnd";
import { FaTrash } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";

const Node = ({ node, nextNode, onRemove }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "NODE",
    item: { id: node.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const animationProps = useSpring({
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? "scale(1.1)" : "scale(1)",
    config: { duration: 200 },
  });

  return (
    <animated.div ref={dragRef} style={animationProps} className="node">
      <div>
        <strong>{node.value}</strong>
        <br />
        <span className="memory-address">
          {nextNode ? `→ ${nextNode.value} address` : "→ None"}
        </span>
      </div>
      <button onClick={() => onRemove(node.id)} className="bg-red-500">
        <FaTrash /> Remove
      </button>
    </animated.div>
  );
};

export default Node;
