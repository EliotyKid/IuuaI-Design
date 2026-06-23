"use client"
import styles from "./style.module.scss"

type ItemProps = {
  index: number;
  title: string;
  manageModal: (active: boolean, index: number, x: number, y: number) => void;
  category: string;
};

const Item = ({ index, title, manageModal, category }: ItemProps) => {
  return ( 
    <div
      className={styles.item}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        manageModal(true, index, e.clientX, e.clientY);
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        manageModal(false, index, e.clientX, e.clientY);
      }}
    >
      <h2>{title}</h2>
      <p>{category}</p>
    </div>
   );
}
 
export default Item;