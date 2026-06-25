import styles from "./style.module.scss"
import Magnetic from "../magnetic"
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import gsap from "gsap"

type RoundedProps = {
  children: ReactNode;
  backgroundColor?: string;
} & HTMLAttributes<HTMLDivElement>


const Rounded = ({ children, backgroundColor = "#455CE9", ...attributes }: RoundedProps) => {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!circle.current) return;

    timeline.current = gsap.timeline({ paused: true });

    timeline.current
      .to(
        circle.current,
        {
          top: "-25%",
          width: "150%",
          duration: 0.4,
          ease: "power3.in",
        },
        "enter",
      )
      .to(
        circle.current,
        {
          top: "-150%",
          width: "125%",
          duration: 0.25,
        },
        "exit",
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return ( 
    <Magnetic>
      <div
        className={styles.rounded}
        style={{ overflow: "hidden" }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div 
          ref={circle}
          style={{ backgroundColor }}
          className={styles.circle}
        />
      </div>
    </Magnetic>
   );
}
 
export default Rounded;