import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/style.css';

const AddInfo = ({ playlistAdded, onClose }) => {
  const [isVisible, setIsVisible] = useState(playlistAdded);

  useEffect(() => {
    if (playlistAdded) {
      setIsVisible(true);

      const timerId = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3200);

      return () => clearTimeout(timerId);
    }
  }, [playlistAdded, onClose]);

  const handleAnimationComplete = () => {
    if (!playlistAdded) {
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='add-info'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1, type: 'spring', duration: 1 }}
          onAnimationComplete={handleAnimationComplete}
        >
          <p>A playlist has been added!✨</p>
          <span className='notification-progress'></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddInfo;
