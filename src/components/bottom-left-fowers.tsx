 
import { motion } from 'framer-motion'; 
import { grassVariants, grassVariants2 } from '../utils/GsapAnimation';
export default function BottomLeftFlowers() {
  return (
    <>
        <div className="">
            <div className="absolute -bottom-4 left-9">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-4.webp' className='w-48 transform scale-x-[-1] rotate-45'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-2">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-1.webp' className='w-16 transform scale-x-[-1]'></img>
              </motion.div>            
            </div>
            <div className="absolute bottom-0 -left-1">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
                <img src='/assets/pattern/leaf-2.webp' className='w-28 rotate-45 transform scale-x-[-1]'></img>
              </motion.div>
            </div>
            <div className="absolute -bottom-4 left-0">
              <motion.div
                variants={grassVariants2}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/leaf-3.webp' className='w-36 rotate-45 transform scale-x-[-1]'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0">
              <motion.div
                variants={grassVariants2}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/white-rose.webp' className='w-28 transform scale-x-[-1]'></img>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0">
              <motion.div
                variants={grassVariants}
                animate="sway"
                className="grass" 
              >
              <img src='/assets/pattern/cambodia.webp' className='w-16 transform scale-x-[-1]'></img>
              </motion.div>
            </div>
          </div>
    </>
  )
}
