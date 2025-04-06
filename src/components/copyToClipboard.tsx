import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FadeIn2 } from '../utils/GsapAnimation';

interface CopyToClipboardProps {
  textToCopy: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset status setelah 2 detik
    });
  };

  return (
    <div>
        <motion.button onClick={handleCopy}  variants={FadeIn2} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5, delay:1 }} className='px-4 py-1 w-32 rounded-3xl bg-[#084c6e] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl'><i className="fa-solid fa-copy"></i> {copied ? 'Sukses' :'Copy'}</motion.button>
    </div>
  );
};

export default CopyToClipboard;
