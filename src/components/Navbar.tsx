import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <span className={styles.logo}>FreelanceHub</span>
      <div className={styles.profile}>
        <span>👤 John</span>
        <button className={styles.logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
