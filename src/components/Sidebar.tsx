import styles from "../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";

const links = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/projects", label: "Projects" },
  { path: "/customers", label: "Customers" },
  { path: "/tasks", label: "Tasks" },
  { path: "/calendar", label: "Calendar" },
  { path: "/settings", label: "Settings" },
];

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
