import React from 'react'

import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import axios from 'axios';


const Login = () => {

    const handleSubmit = (values) => {
        axios
            .post('/api/users/login', {
                email: values.email,
                password: values.password,
            })
            .then((user) => {
                localStorage.setItem('user', JSON.stringify(user.data));
            })
            .catch((err) => console.log('ERROR: ', err));
    }

    const validate = Yup.object({
        email: Yup.string()
            .email('El email ingresado no es válido')
            .required('Se requiere un email'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener al menos 6 caracteres')
            .required('Se requiere contraseña'),
    });


    return (
        <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <div className="container w-75 mt-4">
          <h3>Login</h3>
          <Form>
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
            <div className="mt-4 d-flex flex-row">
              <div className="form-group me-4">
                <Button type="submit" variant="dark">
                  Login
                </Button>
              </div>
            </div>
          </Form>
          <p className="mt-4">
            No tenés una cuenta?&nbsp;
            <Link to="/register">Te invitamos a registrarte.</Link>
          </p>
        </div>
      )}
    </Formik>
    )
}

export default Login