import styles from "../styles/Tasks.module.css";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};



const Tasks = () => {
   const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    fetch("http://localhost:5001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);


  const toggleTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updatedTask = { ...task, completed: !task.completed };

    await fetch(`http://localhost:5001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    setTasks((prev) =>
      prev.map((t) => (t.id === id ? updatedTask : t))
    );
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
