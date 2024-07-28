// src/components/LinkedListVisualizer.jsx
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Node from "./Node";
import TrashCan from "./TrashCan";
import { useSpring, animated } from "@react-spring/web";

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [sortedNodes, setSortedNodes] = useState([]);
  const [sorting, setSorting] = useState(false);

  const addNode = () => {
    const newNode = {
      id: nodes.length,
      value: Math.floor(Math.random() * 100),
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (id) => {
    setNodes(nodes.filter((node) => node.id !== id));
  };

  const searchNode = (value) => {
    const foundNode = nodes.find((node) => node.value === value);
    if (foundNode) {
      alert(`Node found: ID = ${foundNode.id}, Value = ${foundNode.value}`);
    } else {
      alert("Node not found");
    }
  };

  const sortNodes = () => {
    setSorting(true);
    setTimeout(() => {
      const sortedNodes = [...nodes].sort((a, b) => a.value - b.value);
      setSortedNodes(sortedNodes);
      setSorting(false);
    }, 300); // Delay to show the sorting animation
  };

  const getNextNode = (currentId) => {
    const currentIndex = nodes.findIndex((node) => node.id === currentId);
    return currentIndex + 1 < nodes.length ? nodes[currentIndex + 1] : null;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <div className="header">
          <div className="buttons-container">
            <button onClick={addNode} className="bg-blue-500">
              <FaPlus /> Add Node
            </button>
            <button onClick={sortNodes} className="bg-green-500">
              Sort Nodes
            </button>
          </div>
        </div>
        <div className="search-container">
          <input
            type="number"
            id="searchValue"
            placeholder="Enter value to search"
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={() =>
              searchNode(parseInt(document.getElementById("searchValue").value))
            }
            className="bg-yellow-500"
          >
            Search Node
          </button>
        </div>
        <div className="nodes-container">
          {(sorting ? sortedNodes : nodes).map((node, index) => (
            <AnimatedNode
              key={node.id}
              node={node}
              nextNode={getNextNode(node.id)}
              position={index}
              totalNodes={nodes.length}
              removing={false}
              onRemove={removeNode}
            />
          ))}
        </div>
        <TrashCan onDrop={removeNode} />
      </div>
    </DndProvider>
  );
};

const AnimatedNode = ({
  node,
  nextNode,
  position,
  totalNodes,
  removing,
  onRemove,
}) => {
  const props = useSpring({
    to: { transform: `translateY(${position * 80}px)` },
    config: { duration: 300 },
    reset: true,
  });

  return (
    <animated.div style={props} className="node">
      <div>
        <strong>{node.value}</strong>
        <br />
        <span className="memory-address">
          {nextNode ? `→ ${nextNode.value}` : "→ None"}
        </span>
      </div>
      <button onClick={() => onRemove(node.id)} className="bg-red-500">
        <FaTrash /> Remove
      </button>
    </animated.div>
  );
};

export default LinkedListVisualizer;
