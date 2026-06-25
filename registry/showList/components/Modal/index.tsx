"use client"
import styles from "./style.module.scss"
import { type Variants, motion } from "framer-motion"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { type DataType } from "../.."
import { scaleAnimation } from "./anim"
type ModalProps = {
  active: boolean
  index: number
  data: DataType[]
  modalRef: React.RefObject<HTMLDivElement | null>
}

const Modal = ({ active, index, data, modalRef }: ModalProps) => {
  const cursor = useRef<HTMLDivElement | null>(null)
  const cursorLabel = useRef<HTMLDivElement | null>(null)

  const xMoveCursor = useRef<((value: number) => void) | null>(null)
  const yMoveCursor = useRef<((value: number) => void) | null>(null)
  const xMoveCursorLabel = useRef<((value: number) => void) | null>(null)
  const yMoveCursorLabel = useRef<((value: number) => void) | null>(null)

  useEffect(() => {
    if (!modalRef.current || !cursor.current || !cursorLabel.current) return

    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    })
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    })
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    })
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    })
  }, [modalRef])

  const moveItems = (x: number, y: number) => {
    xMoveCursor.current?.(x)
    yMoveCursor.current?.(y)
    xMoveCursorLabel.current?.(x)
    yMoveCursorLabel.current?.(y)
  }

  useEffect(() => {
    if (!modalRef.current) return

    const xMoveContainer = gsap.quickTo(modalRef.current, "left", {
      duration: 0.8,
      ease: "power3",
    })
    const yMoveContainer = gsap.quickTo(modalRef.current, "top", {
      duration: 0.8,
      ease: "power3",
    })

    const handleMouseMove = (e: MouseEvent) => {
      xMoveContainer(e.clientX)
      yMoveContainer(e.clientY)
      moveItems(e.clientX, e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [modalRef])

  return (
    <>
      <motion.div
        ref={modalRef}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className={styles.modalContainer}
      >
        <div style={{ top: `${index * -100}%` }} className={styles.modalSlider}>
          {data.map((item, i) => {
            const { src, color } = item
            return (
              <div className={styles.modal} style={{ backgroundColor: color }} key={`modal_${i}`}>
                <img src={`/images/${src}`} width={300} height={0} alt="image" />
              </div>
            )
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
  )
}

export default Modal