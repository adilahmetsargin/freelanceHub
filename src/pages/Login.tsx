import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../styles/Login.module.css";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    
    const fakeUser = {
      id: 1,
      name: "Adil Ahmet",
      email: values.email,
    };

    dispatch(login(fakeUser)); 
    navigate("/dashboard");    
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Welcome Back</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <label>Email</label>
            <Field name="email" type="email" className={styles.input} />
            <ErrorMessage name="email" component="div" className={styles.error} />

            <label>Password</label>
            <Field name="password" type="password" className={styles.input} />
            <ErrorMessage name="password" component="div" className={styles.error} />

            <button type="submit" className={styles.button}>Login</button>
          </Form>
        </Formik>

        <p className={styles.footer}>
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
