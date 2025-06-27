import styles from "../styles/Dashboard.module.css";
import { useEffect, useState } from "react";
import api from "../services/api";
import AddModal from "../components/AddModal";


type Stat = {
  id: number;
  title: string;
  value: number;
};
export type CustomerForm = {
  name: string;
  email: string;
  // Add other customer fields as needed
};

export type TaskForm = {
  title: string;
  description?: string;
  // Add other task fields as needed
};

export type ProjectForm = {
  name: string;
  deadline?: string;
  // Add other project fields as needed
};

export type CalendarForm = {
  eventTitle: string;
  date: string;
  // Add other calendar event fields as needed
};

const Dashboard = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboardStats");
        setStats(res.data);
      } catch (err) {
        console.error("Error loading dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleAdd = (type: string, data: CustomerForm | TaskForm | ProjectForm | CalendarForm) => {
    let endpoint = "";
    if (type === "customer") endpoint = "/customers";
    if (type === "task") endpoint = "/tasks";
    if (type === "project") endpoint = "/projects";
    if (type === "calendar") endpoint = "/calendarEvents";
    if (!endpoint) return;
    (async () => {
      await api.post(endpoint, data);
      setShowModal(false);
      // Optionally: reload stats or show a toast
      window.location.reload();
    })();
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <button className={styles.addBtn} onClick={() => setShowModal(true)}>Add</button>
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.id} className={styles.card}>
            <p className={styles.cardTitle}>{item.title}</p>
            <p className={styles.cardValue}>{item.value}</p>
          </div>
        ))}
      </div>
      {showModal && <AddModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  );
};

export default Dashboard;
