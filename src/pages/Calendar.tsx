import styles from "../styles/Calendar.module.css";
import { useEffect, useState } from "react";
import api from "../services/api";

type CalendarEvent = {
  id?: number;
  date: string;
  title: string;
  type: "Meeting" | "Deadline" | "Task";
};

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [newEvent, setNewEvent] = useState<CalendarEvent>({
    date: "",
    title: "",
    type: "Meeting"
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/calendarEvents");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching calendar events", err);
      }
    };

    fetchEvents();
  }, []);

  const addEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.date || !newEvent.title) return;

    try {
      const res = await api.post("/calendarEvents", newEvent);
      setEvents((prev) => [...prev, res.data]);
      setNewEvent({ date: "", title: "", type: "Meeting" });
    } catch (err) {
      console.error("Error adding calendar event", err);
    }
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
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
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
