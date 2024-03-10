import React from "react";
import styles from "@/styles/Layout.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.ldsCircle}>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
