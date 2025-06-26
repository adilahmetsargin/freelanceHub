import styles from "../styles/Customers.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  status: "Active" | "Inactive";
};

const Customers = () => {
  const [query, setQuery] = useState("");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      });
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

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
          <Link key={c.id} to={`/customers/${c.id}`} className={styles.card}>
            <h3 className={styles.name}>{c.name}</h3>
            <p className={styles.email}>{c.email}</p>
            <p className={styles.company}>{c.company}</p>
            <span className={`${styles.status} ${styles[c.status.toLowerCase()]}`}>
              {c.status}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Customers;
