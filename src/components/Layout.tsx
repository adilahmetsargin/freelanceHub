import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "../styles/Layout.module.css";
import type { ReactNode } from "react";


const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.main}>
        <Navbar />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
