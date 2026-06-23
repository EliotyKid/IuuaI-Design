"use client"
import styles from "./style.module.scss"
import Item from "./components/Item"
import { useEffect, useRef, useState } from "react";
import { type Variants, motion } from "framer-motion";
import gsap from "gsap";

export type DataType = {
  title: string;
  src: string;
  color: string;
  category: "Web Development" | "Game Development";
};

interface ShowListProps{
  data: DataType[]
}

const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

type ModalState = {
  active: boolean;
  index: number;
};

const ShowList = ({data}: ShowListProps) => {
  const [modal, setModal] = useState<ModalState>({ active: false, index: 0 });
  const { active, index } = modal;

  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorLabel = useRef<HTMLDivElement | null>(null);

  // funções do gsap.quickTo
  const xMoveContainer = useRef<((value: number) => void) | null>(null);
  const yMoveContainer = useRef<((value: number) => void) | null>(null);
  const xMoveCursor = useRef<((value: number) => void) | null>(null);
  const yMoveCursor = useRef<((value: number) => void) | null>(null);
  const xMoveCursorLabel = useRef<((value: number) => void) | null>(null);
  const yMoveCursorLabel = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current)
      return;

    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    // Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current?.(x);
    yMoveContainer.current?.(y);
    xMoveCursor.current?.(x);
    yMoveCursor.current?.(y);
    xMoveCursorLabel.current?.(x);
    yMoveCursorLabel.current?.(y);
  };

  const manageModal = (
    active: boolean,
    index: number,
    x: number,
    y: number,
  ) => {
    moveItems(x, y);
    setModal({ active, index });
  };


  return ( 
    <section
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) =>
        moveItems(e.clientX, e.clientY)
      }
      className={styles.container}
    >
      <div className={styles.body}>
        {data.map((item, i) => (
          <Item
            key={i}
            index={i}
            title={item.title}
            category={item.category}
            manageModal={manageModal}
          />
        ))}
      </div>



      <>
          <motion.div
            ref={modalContainer}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
            className={styles.modalContainer}
          >
            <div
              style={{ top: `${index * -100}%` }}
              className={styles.modalSlider}
            >
              {data.map((item, i) => {
                const { src, color } = item;
                return (
                  <div
                    className={styles.modal}
                    style={{ backgroundColor: color }}
                    key={`modal_${i}`}
                  >
                    <img
                      src={`/images/${src}`}
                      width={300}
                      height={0}
                      alt="image"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            ref={cursor}
            className={styles.cursor}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          />

          <motion.div
            ref={cursorLabel}
            className={styles.cursorLabel}
            variants={scaleAnimation}
            initial="initial"
            animate={active ? "enter" : "closed"}
          >
            View
          </motion.div>
        </>
    </section>
   );
}
 
export default ShowList;