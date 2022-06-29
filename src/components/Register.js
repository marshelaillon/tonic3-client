import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import { registerUser } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkCaptcha } from '../state/user/user';

const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cantSubmit, setCantSubmit] = useState(false)
  const [captchaValido, setCaptchaValido] = useState(false);
  const [firstNameValido, setfirstNameValido] = useState(false);
  const captcha = useRef();


  const handleSubmit = values => {
    if (!captchaValido) {
     return setCantSubmit(true)
    }

    dispatch(
      registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmpassword: values.confirmpassword,
      })
    );
    navigate('/');
  };


  const validate = Yup.object({
    firstName: Yup.string().required('Se requiere un nombre'),
    lastName: Yup.string().required('Se requiere un apellido'),
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

  const onChange = () => {
    const captchaToken = captcha.current.getValue()
   /*  dispatch(checkCaptcha({
      tokenCaptcha: captchaToken
    })) */
    if (('hubo un cambio', captchaToken)) {
      console.log("esto es el captcha", captcha);
      console.log('el usuario no es un robot');
      setCaptchaValido(true);
    }
  };

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: "",
        email: '',
        password: '',
        confirmpassword: '',

      }}
      validationSchema={validate}
      onSubmit={values => {
        handleSubmit(values);

        if (captcha.current.getValue()) {
          console.log('el usuario no es un robot');
          setfirstNameValido(true);
          setCaptchaValido(true);
        } else {
          console.log('Aceptar el captcha');
          setfirstNameValido(false);
          setCaptchaValido(false);
        }
      }}
    >

      {formik => (
        <div className="container w-75 mt-4">
          <h3>Register</h3>
          <Form >

          <div className="form-group">
              <label htmlFor="firstName">firstName</label>
              <Field
                name="firstName"
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="invalid-feedback">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="lastName">lastName</label>
              <Field
                name="lastName"
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="invalid-feedback">{formik.errors.lastName}</div>
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
            {!firstNameValido && (
              <div className="recaptcha">
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r"
                  onChange={onChange}
                />
              </div>
            )}
            {cantSubmit && (
              <div style={{ color: 'red' }}>Por favor acepta el captcha</div>
            )}
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
};

export default Register;
