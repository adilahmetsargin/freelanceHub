import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/Register.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Please confirm your password"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("Register values:", values);
    // API isteği burada yapılır
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <label htmlFor="fullName">Full Name</label>
            <Field id="fullName" name="fullName" className={styles.input} />
            <ErrorMessage name="fullName" component="div" className={styles.error} />

            <label htmlFor="email">Email</label>
            <Field id="email" name="email" type="email" className={styles.input} />
            <ErrorMessage name="email" component="div" className={styles.error} />

            <label htmlFor="password">Password</label>
            <Field id="password" name="password" type="password" className={styles.input} />
            <ErrorMessage name="password" component="div" className={styles.error} />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <Field id="confirmPassword" name="confirmPassword" type="password" className={styles.input} />
            <ErrorMessage name="confirmPassword" component="div" className={styles.error} />

            <button type="submit" className={styles.button}>Register</button>
          </Form>
        </Formik>
        <p className={styles.footer}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
