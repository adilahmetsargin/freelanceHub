import styles from "../styles/ProjectDetails.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

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
    const fetchData = async () => {
      try {
        const projectRes = await api.get(`/projects/${id}`);
        const projectData: Project = projectRes.data;
        setProject(projectData);

        const tasksRes = await api.get("/tasks");
        const allTasks: Task[] = tasksRes.data;
        const projectTasks = allTasks.filter((task) =>
          projectData.taskIds.includes(task.id)
        );
        setTasks(projectTasks);
      } catch (err) {
        console.error("Error loading project details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleTask = async (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };

    try {
      await api.put(`/tasks/${taskId}`, updated);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? updated : t))
      );
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  if (loading || !project) return <p className={styles.loading}>Loading...</p>;

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
