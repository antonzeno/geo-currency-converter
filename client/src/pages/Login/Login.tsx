import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Login = () => {
    const [message, setMessage] = useState({
        error: null,
        success: null,
    });
    const [submitting, setSubmitting] = useState(false);
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password can't be empty."),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            setSubmitting(true);

            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, values, {
                withCredentials: true,
            });

            if (response.status === 200) {
                resetForm();
                setMessage({ error: null, success: "Login successful." });
                login();
            }
        } catch (error) {
            if (error.response) {
                setMessage({ error: error.response.data, success: null });
            } else {
                setMessage({ error: "An unexpected error occurred. Please try again later.", success: null });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-5">
            <div className="form shadow-sm p-5">
                {isAuthenticated ? (
                    <>
                        <div className="h2">You are logged in.</div>
                        <button onClick={logout} className="btn btn-danger">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <div className="text-center h2 fw-bold">Login</div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <Field type="text" id="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <Field type="password" id="password" name="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>
                                {message.error && <div className={`alert ${"alert-danger"}`}>{message.error}</div>}
                                <button type="submit" className="btn btn-primary" disabled={submitting}>
                                    Login
                                </button>
                                <div className="mt-2">
                                    Don't have an account? <Link to="/register">Register</Link>
                                </div>
                            </Form>
                        </Formik>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
