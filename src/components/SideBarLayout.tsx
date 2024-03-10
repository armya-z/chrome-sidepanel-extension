import React from "react";
import styles from "@/styles/Layout.module.css";
const SideBarLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.sideBarLayout}>{children}</div>;
};

export default SideBarLayout;
