"use client"
import { itemVariants } from "./anim"
import styles from "./style.module.scss"
import { motion } from "framer-motion"

type ItemProps = {
  index: number
  title: string
  manageModal: (active: boolean, index: number) => void
  category: string
}

const Item = ({ index, title, manageModal, category }: ItemProps) => {
  return (
    <motion.div
      className={styles.item}
      variants={itemVariants}
      onMouseEnter={() => {
        manageModal(true, index)
      }}
      onMouseLeave={() => {
        manageModal(false, index)
      }}
    >
      <h2>{title}</h2>
      <p>{category}</p>
    </motion.div>
  )
}

export default Item