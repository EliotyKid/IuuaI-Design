"use client"
import styles from "./style.module.scss"
import Item from "./components/Item"
import { useRef, useState } from "react"
import Modal from "./components/Modal"
import { motion } from "framer-motion"
import { showVariants } from "./anim"

export type DataType = {
  title: string
  src: string
  color: string
  category: "Web Development" | "Game Development"
}

interface ShowListProps {
  data: DataType[]
}

type ModalState = {
  active: boolean
  index: number
}

const ShowList = ({ data }: ShowListProps) => {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 })
  const { active, index } = modal

  const modalRef = useRef<HTMLDivElement | null>(null)

  const manageModal = (active: boolean, index: number) => {
    setModal({ active, index })
  }

  return (
    <section className={styles.container}>
      <motion.div 
        className={styles.body}
        variants={showVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px"}}
      >
        {data.map((item, i) => (
          <Item 
            key={i} 
            index={i} 
            title={item.title} 
            category={item.category} 
            manageModal={manageModal} 
          />
        ))}
      </motion.div>

      <Modal 
        active={active} 
        index={index} 
        data={data} 
        modalRef={modalRef} 
      />
    </section>
  )
}

export default ShowList