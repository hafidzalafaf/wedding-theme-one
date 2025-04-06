import { motion } from 'framer-motion'; 
import {  cambodiaVariants2 } from '../utils/GsapAnimation';

export default function FlowersRight() {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 -right-10 ">
            <motion.div
            variants={cambodiaVariants2}
            animate="sway"
            className="grass" 
            >
            <img src='/assets/pattern/flowers-left.png' className='w-28 transform scale-x-[-1]'></img>
            </motion.div>
        </div>
  )
}
