import styles from "../styles/Tasks.module.css";
import { useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Fix landing page bug", completed: false },
  { id: 2, title: "Write onboarding docs", completed: true },
  { id: 3, title: "Call with client", completed: false },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleTask = (id: number) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return filter === "completed" ? task.completed : !task.completed;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tasks</h1>

      <div className={styles.filters}>
        <button onClick={() => setFilter("all")} className={filter === "all" ? styles.active : ""}>All</button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? styles.active : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? styles.active : ""}>Completed</button>
      </div>

      <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
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

export default Tasks;
