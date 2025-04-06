import { motion } from 'framer-motion'; 
import { grassVariants, grassVariants2 } from '../utils/GsapAnimation';

export default function BottomRightFlowers() {
  return (
    <>
        <div className="">
            <div className="absolute -bottom-4 right-9">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-4.webp' className='w-48 -rotate-45'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 right-2">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-1.webp' className='w-16'></img>
              </motion.div>            
            </div>
            <div className="absolute bottom-0 -right-1">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-2.webp' className='w-28 -rotate-45'></img>
              </motion.div>
            </div>
            <div className="absolute -bottom-4 right-0">
              <motion.div
                variants={grassVariants2}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/leaf-3.webp' className='w-36 -rotate-45'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 right-0">
              <motion.div
                variants={grassVariants2}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/white-rose.webp' className='w-28'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 right-0">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/cambodia.webp' className='w-16'></img>
              </motion.div>
            </div>
          </div>
    </>
  )
}
