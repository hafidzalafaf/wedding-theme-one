import { motion } from 'framer-motion'
import { grassVariants, grassVariants2 } from '../utils/GsapAnimation'

export default function TopFlowers() {
    return (
        <div className="">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 ">
                <motion.div variants={grassVariants} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/leaf-2.webp"
                        className="w-28  transform scale-x-[-1] -rotate-90 mr-[400px]"
                    ></img>
                </motion.div>
            </div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 ">
                <motion.div variants={grassVariants} animate="sway" className="grass">
                    <img src="/assets/pattern/leaf-2.webp" className="w-28 rotate-90 ml-52 "></img>
                </motion.div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <motion.div variants={grassVariants2} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/white-rose.webp"
                        className="w-20 rotate-180 transform scale-x-[-1] mr-60"
                    ></img>
                </motion.div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <motion.div variants={grassVariants2} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/white-rose.webp"
                        className="w-28 rotate-180 transform scale-x-[-1] mr-16"
                    ></img>
                </motion.div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <motion.div variants={grassVariants2} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/white-rose.webp"
                        className="w-20  rotate-180  ml-32"
                    ></img>
                </motion.div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <motion.div variants={grassVariants2} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/white-rose.webp"
                        className="w-28  rotate-180  ml-10"
                    ></img>
                </motion.div>
            </div>

            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <motion.div variants={grassVariants} animate="sway" className="grass">
                    <img
                        src="/assets/pattern/rose.png"
                        className="w-20 transform scale-x-[-1]"
                    ></img>
                </motion.div>
            </div>
        </div>
    )
}
