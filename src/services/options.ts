// This file provides options for select fields, simulating API-driven enums or lookup tables.
export const taskStatusOptions = [
  { value: false, label: "Active" },
  { value: true, label: "Completed" },
];

export const customerStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

export const projectStatusOptions = [
  { value: "Active", label: "Active" },
  { value: "Completed", label: "Completed" },
];

export const calendarTypeOptions = [
  { value: "Meeting", label: "Meeting" },
  { value: "Deadline", label: "Deadline" },
  { value: "Task", label: "Task" },
];
