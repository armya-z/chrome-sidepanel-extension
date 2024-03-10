import React, { useEffect, useState } from "react";
import styles from "@/styles/Layout.module.css";
import SideBarForm from "./SideBarForm";
import SideBarWrite from "./SideBarWrite";

const SideBarContainer = () => {
  const [isTranslate, setIsTranslate] = useState(true);

  useEffect(() => {
    const translateButton = document.querySelector("button#translate");
    translateButton?.addEventListener("click", () => setIsTranslate(true));

    const writeButton = document.querySelector("button#write");
    writeButton?.addEventListener("click", () => setIsTranslate(false));
  }, []);

  return (
    <div className={styles.sideBarContainer}>
      {isTranslate ? <SideBarForm /> : <SideBarWrite />}
      <div className={styles.sidBarNavBar}>
        <button
          id="translate"
          className={`${isTranslate ? styles.buttonisActive : styles.button}`}
        >
          translate
        </button>
        <button
          id="write"
          className={`${!isTranslate ? styles.buttonisActive : styles.button}`}
        >
          write
        </button>
      </div>
    </div>
  );
};

export default SideBarContainer;
