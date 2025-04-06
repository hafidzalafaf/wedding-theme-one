import { motion } from 'framer-motion'; 
import { cambodiaVariants } from '../utils/GsapAnimation';

export default function FlowersFallLeft() {
    const cambodia = Array.from({ length: 20 }, (_, i) => i);  
  return (
   <>
    {cambodia.map((_, i) => (
            <motion.div
              key={i}
              custom={i}  
              variants={cambodiaVariants}
              initial="initial"
              animate="animate"
              className="absolute top-0 left-0"
            >
              <img src='/assets/pattern/cambodia.webp' className='w-4 h-4'></img>
               
            </motion.div>
          ))}
   </>
  )
}
