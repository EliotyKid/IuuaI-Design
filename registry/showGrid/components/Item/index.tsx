"use client"
import styles from "./style.module.scss"
import {  motion } from "framer-motion";
import { cardVariants } from "./anim"


interface ItemProps {
  title: string
  src: string
  color: string
  category: string
  index: number
}

const Item = ({index, color, src, title, category}: ItemProps) => {

  return ( 
      <motion.div
        key={`grid_${index}`}
        className={styles.card}
        variants={cardVariants}
        whileHover={{ y: -10, transition: { duration: 0.3}}}
      >
        <div
          className={styles.imageWrapper}
          style={{backgroundColor: color}}
        >
          <img 
            src={`/images/${src}`} 
            alt={title}
            width={500}
            height={350}
            style={{ objectFit: "contain"}} 
          />
          
            
        </div>
        <div className={styles.itemInfo}>
          <h3>{title}</h3>
          <p>{category}</p>
        </div>
        
      </motion.div>
   );
}
 
export default Item;