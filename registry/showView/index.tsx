"use client"
import { useState, type ReactNode } from "react";
import styles from "./style.module.scss"
import { AnimatePresence } from "framer-motion";
import ShowList from "../showList"
import ShowGrid from "../showGrid"

export type DataType = {
  title: string
  src: string
  color: string
  category: "Web Development" | "Game Development"
}

const categories = ["All", "Web Development", "Game Development"] as const;

type ViewMode = "list" | "grid";

interface ShowViewProps {
  data: DataType[]
}

const ShowView = ({ data }: ShowViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [activeCategory, setActiveCategory] = useState<string>("All");


  const filteredData= data.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  return ( 
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.controls}>
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${
                viewMode === "grid" ? styles.active : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="11"
                  y="1"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="11"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="11"
                  y="11"
                  width="6"
                  height="6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <button
              type="button"
              className={`${styles.toggleBtn} ${
                viewMode === "list" ? styles.active : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                aria-hidden="true"
              >
                <line
                  x1="2"
                  y1="4"
                  x2="16"
                  y2="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="9"
                  x2="16"
                  y2="9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <line
                  x1="2"
                  y1="14"
                  x2="16"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
          </div>
          <div className={styles.categoryFilter}>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                className={`${styles.filterBtn} ${
                  activeCategory === cat ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <AnimatePresence mode="wait">
          {viewMode === "list" ? (<ShowList data={filteredData}/>) : (<ShowGrid data={filteredData} />)}
        </AnimatePresence>
      </div>
    </div>
   );
}
 
export default ShowView;