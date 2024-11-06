import React from 'react';
import { motion } from 'framer-motion';

function Tile({ value }) {
  const getTileStyle = (value) => {
    const colors = {
      0: 'bg-gray-300',
      2: 'bg-yellow-100',
      4: 'bg-yellow-200',
      8: 'bg-yellow-300',
      16: 'bg-yellow-400',
      32: 'bg-yellow-500',
      64: 'bg-yellow-600',
      128: 'bg-yellow-700',
      256: 'bg-yellow-800',
      512: 'bg-yellow-900',
      1024: 'bg-red-600',
      2048: 'bg-red-800',
    };
    return colors[value] || 'bg-gray-900';
  };

  const tileStyle = `flex items-center justify-center h-16 w-16 rounded ${getTileStyle(
    value
  )} text-white text-xl font-bold`;

  return (
    <motion.div
      className={tileStyle}
      animate={{ scale: value ? 1.1 : 1 }}
      transition={{ duration: 0.2 }}
    >
      {value !== 0 ? value : ''}
    </motion.div>
  );
}

export default Tile;
