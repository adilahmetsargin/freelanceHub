import styles from "../styles/Projects.module.css";
import { useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Completed";
  date: string;
};

const mockProjects: Project[] = [
  {
    id: 1,
    title: "Website Redesign",
    description: "Redesigning the corporate website.",
    status: "Active",
    date: "2025-06-01",
  },
  {
    id: 2,
    title: "Mobile App",
    description: "Developing a cross-platform app.",
    status: "Completed",
    date: "2025-04-10",
  },
  {
    id: 3,
    title: "Dashboard UI",
    description: "Designing a new admin panel.",
    status: "Active",
    date: "2025-05-15",
  },
];

const Projects = () => {
  const [query, setQuery] = useState("");

  const filtered = mockProjects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects</h1>

      <input
        type="text"
        placeholder="Search projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.search}
      />

      <div className={styles.grid}>
        {filtered.map((project) => (
          <div key={project.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <p className={styles.cardMeta}>
              <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                {project.status}
              </span>{" "}
              | {project.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
