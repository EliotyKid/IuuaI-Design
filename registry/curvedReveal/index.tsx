import styles from "./style.module.scss"
import {motion, useScroll, useTransform} from "framer-motion"
import { useRef } from "react"

interface CurvedRevealProps {
  mask: React.ReactNode,
  reveal: React.ReactNode,
}

const CurvedReveal = ({ mask, reveal }:CurvedRevealProps) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const height = useTransform(scrollYProgress, [0, 0.95], [100, 1])
  const y = useTransform(scrollYProgress, [0,1], [-500, 0])

  return ( 
    <div ref={container} className={styles.curvedContainer}>
      <motion.div >
        {mask}
      </motion.div>

      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}/>
      </motion.div>

      <motion.div style={{ y }} className={styles.revealContainer}>
        {reveal}
      </motion.div>
    </div>
  );
}
  
export default CurvedReveal;