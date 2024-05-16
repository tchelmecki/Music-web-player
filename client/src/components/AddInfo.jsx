import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../style/style.css';

const AddInfo = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);

      const timerId = setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 3200);

      return () => clearTimeout(timerId);
    }
  }, [open, onClose]);

  const handleAnimationComplete = () => {
    if (!open) {
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
          <p>A song has been added!✨</p>
          <span className='notification-progress'></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddInfo;
