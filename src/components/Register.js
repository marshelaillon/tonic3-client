import React from 'react'
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Register = () => {

    const handleRegister = (values) => {
        axios
            .post('/api/users/register', {
                firstname: values.name,
                lastname: values.surname,
                email: values.email,
                password: values.password,
            })
            .then((user) => {
                console.log(user.data[0].id);
            })
            .catch((err) => console.log('ERROR: ', err));
    }
    const validate = Yup.object({
        firstname: Yup.string().required('Se requiere un nombre'),
        lastname: Yup.string().required('Se requiere un apellido'),
        email: Yup.string()
            .email('El email ingresado no es válido')
            .required('Se requiere un email'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Se requiere contraseña'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
            .required('Se requiere confirmación de contraseña'),
    });

    return (
        <Formik
            initialValues={{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmpassword: '',
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                handleRegister(values);
            }}
        >
            {(formik) => (
                <div className="container w-75 mt-4">
                    <h3>Register</h3>
                    <Form>
                        <div className="form-group">
                            <label htmlFor="firstname">Nombre</label>
                            <Field
                                name="firstname"
                                className={
                                    formik.touched.name && formik.errors.fisrtname
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="text"
                            />
                            {formik.touched.firstname && formik.errors.firstname ? (
                                <div className="invalid-feedback">{formik.errors.firstname}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Apellido</label>
                            <Field
                                name="lastname"
                                className={
                                    formik.touched.lastname && formik.errors.lastname
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="text"
                            />
                            {formik.touched.surname && formik.errors.lastname ? (
                                <div className="invalid-feedback">{formik.errors.lastname}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <Field
                                name="email"
                                className={
                                    formik.touched.email && formik.errors.email
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field
                                name="password"
                                className={
                                    formik.touched.password && formik.errors.password
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="password"
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmpassword">Confirmá tu password</label>
                            <Field
                                name="confirmpassword"
                                className={
                                    formik.touched.confirmpassword &&
                                        formik.errors.confirmpassword
                                        ? 'form-control is-invalid'
                                        : 'form-control'
                                }
                                type="password"
                            />
                            {formik.touched.confirmpassword &&
                                formik.errors.confirmpassword ? (
                                <div className="invalid-feedback">
                                    {formik.errors.confirmpassword}
                                </div>
                            ) : null}
                        </div>
                        <div className="mt-4 d-flex flex-row">
                            <div className="form-group me-4">
                                <Button type="submit" variant="dark">
                                    Registrarme
                                </Button>
                            </div>
                            <div className="form-group">
                                <Button type="reset" variant="dark">
                                    Borrar Formulario
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            )}
        </Formik>
    );
}

export default Register