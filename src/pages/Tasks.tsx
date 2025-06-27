import styles from "../styles/Tasks.module.css";
import { useEffect, useState } from "react";
import api from "../services/api";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error loading tasks", err);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    try {
      await api.put(`/tasks/${id}`, updatedTask);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>

      <div className={styles.filters}>
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? styles.active : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? styles.active : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? styles.active : ""}
        >
          Completed
        </button>
      </div>

      <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`${styles.taskItem} ${task.completed ? styles.completed : ""}`}
          >
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

export default Tasks;
