import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const stats = [
    { title: "Total Projects", value: 24 },
    { title: "Active Tasks", value: 5 },
    { title: "Customers", value: 8 },
    { title: "Upcoming Deadlines", value: 3 },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.grid}>
        {stats.map((item) => (
          <div key={item.title} className={styles.card}>
            <p className={styles.cardTitle}>{item.title}</p>
            <p className={styles.cardValue}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
