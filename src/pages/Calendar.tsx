import styles from "../styles/Calendar.module.css";
import { useState } from "react";

type CalendarEvent = {
  date: string;
  title: string;
  type: "Meeting" | "Deadline" | "Task";
};

const initialEvents: CalendarEvent[] = [
  { date: "2025-06-26", title: "Client Meeting", type: "Meeting" },
  { date: "2025-06-27", title: "Redesign Deadline", type: "Deadline" },
  { date: "2025-06-28", title: "Write Documentation", type: "Task" },
  { date: "2025-07-01", title: "Launch App", type: "Deadline" },
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ date: "", title: "", type: "Meeting" as CalendarEvent["type"] });

  const addEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.title) return;
    setEvents([...events, newEvent]);
    setNewEvent({ date: "", title: "", type: "Meeting" });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Calendar</h1>
      <form className={styles.form} onSubmit={addEvent}>
        <input
          type="date"
          value={newEvent.date}
          onChange={e => setNewEvent(ev => ({ ...ev, date: e.target.value }))}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={e => setNewEvent(ev => ({ ...ev, title: e.target.value }))}
          className={styles.input}
        />
        <select
          value={newEvent.type}
          onChange={e => setNewEvent(ev => ({ ...ev, type: e.target.value as CalendarEvent["type"] }))}
          className={styles.input}
        >
          <option value="Meeting">Meeting</option>
          <option value="Deadline">Deadline</option>
          <option value="Task">Task</option>
        </select>
        <button type="submit" className={styles.button}>Add Event</button>
      </form>
      <div className={styles.grid}>
        {events.map((event, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.date}>{event.date}</p>
            <p className={styles.titleText}>{event.title}</p>
            <span className={`${styles.tag} ${styles[event.type.toLowerCase()]}`}>
              {event.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
