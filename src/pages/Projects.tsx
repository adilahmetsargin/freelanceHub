import styles from "../styles/Projects.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Project = {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Completed";
  date: string;
};

const Projects = () => {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("http://localhost:5001/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className={styles.loading}>Loading...</p>;

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
          <Link
            to={`/projects/${project.id}`}
            key={project.id}
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>{project.title}</h3>
            <p className={styles.cardDesc}>{project.description}</p>
            <p className={styles.cardMeta}>
              <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                {project.status}
              </span>{" "}
              | {project.date}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
