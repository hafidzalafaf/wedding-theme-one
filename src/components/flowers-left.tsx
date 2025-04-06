import { motion } from 'framer-motion'; 
import {  cambodiaVariants2 } from '../utils/GsapAnimation';

export default function FlowersLeft() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 -left-10 ">
            <motion.div
            variants={cambodiaVariants2}
            animate="sway"
            className="grass" 
            >
            <img src='/assets/pattern/flowers-left.png' className='w-28'></img>
            </motion.div>
        </div>
  )
}
