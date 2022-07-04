import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { EmailPassword } from '../utils/sweetAlerts';
const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validate = Yup.object({
        email: Yup.string()
            .email('El email ingresado no es válido')
            .required('Se requiere un email'),
    });
    const handleSubmit = value => {
        dispatch(
            forgotPassword({
                email: value.email,
            })
        );
        EmailPassword();
        navigate('/login');
    };
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={validate}
                onSubmit={value => handleSubmit(value)}
            >
                {formik => (
                    <div className="container w-75 mt-4">
                        <Form>
                            <Field
                                name="email"
                                placeholder="pon tu email"
                                className={
                                    formik.touched.email && formik.errors.email
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="email"
                            />
                            <div className="mt-4 d-flex flex-row">
                                <div className="form-group me-4">
                                    <Button type="submit" variant="dark">
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;
