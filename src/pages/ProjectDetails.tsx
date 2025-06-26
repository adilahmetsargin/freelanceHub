import styles from "../styles/ProjectDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type Project = {
  id: number;
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  customer: string;
  taskIds: number[];
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch(`http://localhost:5001/projects/${id}`);
      const data = await res.json();
      setProject(data);
      return data.taskIds;
    };

    const fetchTasks = async (taskIds: number[]) => {
      const res = await fetch(`http://localhost:5001/tasks`);
      const allTasks: Task[] = await res.json();
      const filtered = allTasks.filter((t) => taskIds.includes(t.id));
      setTasks(filtered);
      setLoading(false);
    };

    fetchProject().then(fetchTasks);
  }, [id]);

  const toggleTask = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };

    await fetch(`http://localhost:5001/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? updated : t))
    );
  };

  if (loading || !project) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{project.title}</h1>
      <p className={styles.description}>{project.description}</p>

      <div className={styles.meta}>
        <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
          {project.status}
        </span>
        <span>{project.startDate} → {project.endDate}</span>
        <span>Client: {project.customer}</span>
      </div>

      <h2 className={styles.subheading}>Tasks</h2>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}>
            <span>{task.title}</span>
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? "Undo" : "Done"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
