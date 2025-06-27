import styles from "../styles/Settings.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Settings = () => {
  const [notifications, setNotifications] = useState({ email: true, inApp: false });
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>

      <Formik
        initialValues={{
          name: "John Doe",
          email: "john@example.com",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string().email("Invalid email").required("Email is required"),
          password: Yup.string().min(6, "Minimum 6 characters"),
        })}
        onSubmit={(values) => {
          console.log("Settings updated:", values, notifications);
          alert("Settings saved!");
        }}
      >
        <Form className={styles.form}>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" className={styles.error} />

          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="div" className={styles.error} />

          <label htmlFor="password">New Password</label>
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" className={styles.error} />


          <div className={styles.section}>
            <label>Notifications</label>
            <div className={styles.notifications}>
              <label>
                <input type="checkbox" checked={notifications.email} onChange={e => setNotifications(n => ({...n, email: e.target.checked}))}/>
                Email
              </label>
              <label>
                <input type="checkbox" checked={notifications.inApp} onChange={e => setNotifications(n => ({...n, inApp: e.target.checked}))}/>
                In-app
              </label>
            </div>
          </div>

          <button type="submit" className={styles.button}>Save Changes</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Settings;
