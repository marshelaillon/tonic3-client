import React from 'react';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState, useEffect } from 'react';
import { registerUser } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkCaptcha } from '../state/captcha/captcha';
import {RegisterSuccessfully} from '../utils/sweetAlerts'
const Register = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cantSubmit, setCantSubmit] = useState(false)
  const [captchaValido, setCaptchaValido] = useState(false);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const captcha = useRef(null);


  const handleSubmit = values => {
    if (!captchaValido) {
     return setCantSubmit(true)
    }

    if (captcha.current.getValue()) {
      console.log('el usuario no es un robot');
      setUsuarioValido(true);
      setCaptchaValido(true);
    } else {
      console.log('Aceptar el captcha');
      setUsuarioValido(false);
      setCaptchaValido(false);
    }

    // captcha.current.reset()

    dispatch(
      registerUser({
        userName:values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmpassword: values.confirmpassword,
      })
    )
    navigate('/login');

  };


  const validate = Yup.object({
    userName: Yup.string().required('Se requiere un nombre de usuario'),
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
    
    dispatch(checkCaptcha({
      tokenCaptcha: captchaToken
    })) 
    if (('hubo un cambio', captchaToken)) {
      console.log("esto es el captcha", captcha);
      console.log('el usuario no es un robot');
      setCaptchaValido(true);
    }
    
  };


  return (
    <Formik
      initialValues={{
        userName:"",
        firstName: '',
        lastName: "",
        email: '',
        password: '',
        confirmpassword: '',

      }}
      validationSchema={validate}
      onSubmit={values => {
      
        handleSubmit(values);
        // window.location.reload();
/* 
        if (captcha.current.getValue()) {
          console.log('el usuario no es un robot');
          setfirstNameValido(true);
          setCaptchaValido(true);
        } else {
          console.log('Aceptar el captcha');
          setfirstNameValido(false);
          setCaptchaValido(false);
        } */
      }}
    >

      {formik => (
        <div className="container w-75 mt-4">
          <h3>Register</h3>
          <Form >
          <div className="form-group">

          <label htmlFor="firstName">userName</label>
              <Field
                name="userName"
                className={
                  formik.touched.userName && formik.errors.userName
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="text"
              /> 
              {formik.touched.userName && formik.errors.userName ? (
                <div className="invalid-feedback">{formik.errors.userName}</div>
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
            {!usuarioValido && (
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
