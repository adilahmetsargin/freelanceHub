import styles from "../styles/Customers.module.css";
import { useState } from "react";

type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive";
};

const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "Doe Co.",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@smith.io",
    company: "Smith Ltd.",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Ali Veli",
    email: "ali@startuphub.com",
    company: "StartupHub",
    status: "Active",
  },
];

const Customers = () => {
  const [query, setQuery] = useState("");

  const filtered = mockCustomers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customers</h1>

      <input
        type="text"
        placeholder="Search customers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.search}
      />

      <div className={styles.grid}>
        {filtered.map((c) => (
          <div key={c.id} className={styles.card}>
            <h3 className={styles.name}>{c.name}</h3>
            <p className={styles.email}>{c.email}</p>
            <p className={styles.company}>{c.company}</p>
            <span className={`${styles.status} ${styles[c.status.toLowerCase()]}`}>
              {c.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
