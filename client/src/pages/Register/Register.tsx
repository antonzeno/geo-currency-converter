import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    const [message, setMessage] = useState({
        error: null,
        success: null,
    });
    const [submitting, setSubmitting] = useState(false);

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(6, "Password must be at least 8 characters").required("Password can't be empty."),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match")
            .required("Confirm Password can't be empty."),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setSubmitting(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, values);

            if (response.status === 200) {
                resetForm();
                setMessage({ success: "Registration successful!", error: null });
            }
        } catch (error) {
            if (error.response) {
                setMessage({ error: error.response.data, success: null });
            } else {
                setMessage({ error: "An unexpected error occurred. Please try again later.", success: null });
            }
        }
        setSubmitting(false);
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-5">
            <div className="form shadow-sm p-5">
                <div className="text-center h2 fw-bold">Register</div>

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">
                                Confirm Password
                            </label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="form-control"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                        </div>
                        {(message.error || message.success) && (
                            <div className={`alert ${message.error ? "alert-danger" : "alert-success"}`}>
                                {message.error ?? message.success}
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary mx-auto">
                            Register
                        </button>
                        <div className="mt-2">
                            Already have an account? <Link to="/login">Login</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default RegisterForm;
