import styles from "../styles/AddModal.module.css";
import { useState } from "react";
import { taskStatusOptions, customerStatusOptions, projectStatusOptions, calendarTypeOptions } from "../services/options";

interface AddModalProps {
  onClose: () => void;
  onAdd: (type: string, data: CustomerForm | TaskForm | ProjectForm | CalendarForm) => void;
}

const types = [
  { value: "customer", label: "Customer" },
  { value: "task", label: "Task" },
  { value: "project", label: "Project" },
  { value: "calendar", label: "Calendar Event" },
];

interface CustomerForm {
  name: string;
  email: string;
  company: string;
  status: string;
}

interface TaskForm {
  title: string;
  completed: boolean;
}

interface ProjectForm {
  title: string;
  description: string;
  customer: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface CalendarForm {
  title: string;
  date: string;
  type: string;
}

const AddModal = ({ onClose, onAdd }: AddModalProps) => {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string>("");
  const [form, setForm] = useState<Partial<CustomerForm & TaskForm & ProjectForm & CalendarForm>>({});

  // Step 0: Select type
  if (step === 0) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>Add New</h2>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="">Select type...</option>
            {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          <div className={styles.actions}>
            <button onClick={onClose}>Cancel</button>
            <button disabled={!type} onClick={() => setStep(1)}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  // Step 1: Show form based on type
  let formFields = null;
  if (type === "customer") {
    formFields = (
      <>
        <input placeholder="Name" value={form.name||""} onChange={e=>setForm({...form, name:e.target.value})} />
        <input placeholder="Email" value={form.email||""} onChange={e=>setForm({...form, email:e.target.value})} />
        <input placeholder="Company" value={form.company||""} onChange={e=>setForm({...form, company:e.target.value})} />
        <select value={form.status||customerStatusOptions[0].value} onChange={e=>setForm({...form, status:e.target.value})}>
          {customerStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </>
    );
  } else if (type === "task") {
    formFields = (
      <>
        <input placeholder="Title" value={form.title||""} onChange={e=>setForm({...form, title:e.target.value})} />
        <select value={form.completed?"true":"false"} onChange={e=>setForm({...form, completed:e.target.value==="true"})}>
          {taskStatusOptions.map(opt => (
            <option key={String(opt.value)} value={String(opt.value)}>{opt.label}</option>
          ))}
        </select>
      </>
    );
  } else if (type === "project") {
    formFields = (
      <>
        <input placeholder="Title" value={form.title||""} onChange={e=>setForm({...form, title:e.target.value})} />
        <input placeholder="Description" value={form.description||""} onChange={e=>setForm({...form, description:e.target.value})} />
        <input placeholder="Customer (company)" value={form.customer||""} onChange={e=>setForm({...form, customer:e.target.value})} />
        <input placeholder="Start Date" type="date" value={form.startDate||""} onChange={e=>setForm({...form, startDate:e.target.value})} />
        <input placeholder="End Date" type="date" value={form.endDate||""} onChange={e=>setForm({...form, endDate:e.target.value})} />
        <select value={form.status||projectStatusOptions[0].value} onChange={e=>setForm({...form, status:e.target.value})}>
          {projectStatusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </>
    );
  } else if (type === "calendar") {
    formFields = (
      <>
        <input placeholder="Title" value={form.title||""} onChange={e=>setForm({...form, title:e.target.value})} />
        <input placeholder="Date" type="date" value={form.date||""} onChange={e=>setForm({...form, date:e.target.value})} />
        <select value={form.type||calendarTypeOptions[0].value} onChange={e=>setForm({...form, type:e.target.value})}>
          {calendarTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Add {types.find(t=>t.value===type)?.label}</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (type === "customer") {
              const customer: CustomerForm = {
                name: form.name || "",
                email: form.email || "",
                company: form.company || "",
                status: form.status || customerStatusOptions[0].value,
              };
              onAdd(type, customer);
            } else if (type === "task") {
              const task: TaskForm = {
                title: form.title || "",
                completed: form.completed ?? false,
              };
              onAdd(type, task);
            } else if (type === "project") {
              const project: ProjectForm = {
                title: form.title || "",
                description: form.description || "",
                customer: form.customer || "",
                startDate: form.startDate || "",
                endDate: form.endDate || "",
                status: form.status || projectStatusOptions[0].value,
              };
              onAdd(type, project);
            } else if (type === "calendar") {
              const calendar: CalendarForm = {
                title: form.title || "",
                date: form.date || "",
                type: form.type || calendarTypeOptions[0].value,
              };
              onAdd(type, calendar);
            }
          }}
          className={styles.form}
        >
          {formFields}
          <div className={styles.actions}>
            <button type="button" onClick={() => setStep(0)}>Back</button>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
