import {useEffect, useRef, type ReactNode} from "react";
import styles from "./style.module.scss"
import { motion } from "framer-motion";
import gsap from "gsap";
import { scaleAnimation } from "./anim"

interface HoverMoveButtonProps {
  children: ReactNode,
  active: boolean
}

const HoverMoveCursor = ({children, active}: HoverMoveButtonProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null)
  
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
      if (!modalRef.current) return
      const rect = modalRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width/2 
      const y = e.clientY - rect.top - rect.height / 2
      xMoveContainer(x)
      yMoveContainer(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [modalRef])

  return ( 
    <motion.div 
      className={styles.cursor}
      ref={modalRef}
      variants={scaleAnimation}
      initial="initial"
      animate={active ? "enter" : "closed"}
    >
      {children}
    </motion.div>
   );
}
 
export default HoverMoveCursor;