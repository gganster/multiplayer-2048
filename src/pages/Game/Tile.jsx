import React from 'react';
import { motion } from 'framer-motion';

function Tile({ value, player }) {
  const getTileStyle = (player, value) => {
    const colors = {
      A: {
        0: 'bg-blue-50 text-slate-800',
        2: 'bg-blue-50 text-slate-800',
        4: 'bg-blue-100 text-slate-800',
        8: 'bg-blue-200 text-slate-800',
        16: 'bg-blue-300 text-slate-800',
        32: 'bg-blue-400 text-slate-800',
        64: 'bg-blue-500 text-white',
        128: 'bg-blue-600 text-white',
        256: 'bg-blue-700 text-white',
        512: 'bg-blue-800 text-white',
        1024: 'bg-blue-900 text-white',
        2048: 'bg-blue-950 text-white',
    },
    B: {
        0: 'bg-red-50 text-slate-800',
        2: 'bg-red-50 text-slate-800',
        4: 'bg-red-100 text-slate-800',
        8: 'bg-red-200 text-slate-800',
        16: 'bg-red-300 text-slate-800',
        32: 'bg-red-400 text-slate-800',
        64: 'bg-red-500 text-white',
        128: 'bg-red-600 text-white',
        256: 'bg-red-700 text-white',
        512: 'bg-red-800 text-white',
        1024: 'bg-red-900 text-white',
        2048: 'bg-red-950 text-white',
    }
  };
    return colors[player][value] || 'bg-gray-900';
  };

  const tileStyle = `flex items-center justify-center h-16 w-16 rounded ${getTileStyle(
    player,
    value
  )} text-xl font-bold`;

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
