"use client"
import Item from "./components/Item";
import styles from "./style.module.scss"
import { motion } from "framer-motion";
import { gridContainerVariants } from "./anim"

export type DataType = {
  title: string
  src: string
  color: string
  category: "Web Development" | "Game Development"
}

interface ShowGridProps {
  data: DataType[]
}

const ShowGrid = ({ data }:ShowGridProps) => {
  return ( 
    <div className={styles.gridSection}>
      <div className={styles.container}>
        <motion.div 
          className={styles.grid}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px"}}
        >
          {data.map((item, i) => (
            <Item
              category={item.category}
              color={item.color}
              index={i}
              src={item.src}
              title={item.title}
            />
          ))}
        </motion.div>
      </div>
    </div>
   );
}
 
export default ShowGrid;