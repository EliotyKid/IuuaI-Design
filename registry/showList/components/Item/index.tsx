"use client"
import styles from "./style.module.scss"

type ItemProps = {
  index: number
  title: string
  manageModal: (active: boolean, index: number) => void
  category: string
}

const Item = ({ index, title, manageModal, category }: ItemProps) => {
  return (
    <div
      className={styles.item}
      onMouseEnter={() => {
        manageModal(true, index)
      }}
      onMouseLeave={() => {
        manageModal(false, index)
      }}
    >
      <h2>{title}</h2>
      <p>{category}</p>
    </div>
  )
}

export default Item