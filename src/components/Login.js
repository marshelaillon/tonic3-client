import React from 'react';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../state/user/user';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [captchaValido, setCaptchaValido] = useState(null)
  const [usuarioValido, setUsuarioValido] = useState(false)
  const captcha = useRef(null);

  const handleSubmit = values => {
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
    navigate('/');
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('El email ingresado no es válido')
      .required('Se requiere un email'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Se requiere contraseña'),
  });


  const onChange = () => {
    if ("hubo un cambio", captcha.current.getValue()) {
      console.log("el usuario no es un robot")
      setCaptchaValido(true)
    } 
  }

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values)
          if ("hubo un cambio", captcha.current.getValue()) {
            console.log("el usuario no es un robot")
            setUsuarioValido(true)
            setCaptchaValido(true)
          } else {
            console.log("Aceptar el captcha")
            setUsuarioValido(false)
            setCaptchaValido(false)
        }}}
      >
        {formik => (
          <div className="container w-75 mt-4">
            {!usuarioValido &&
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
                <div className='recaptcha'>
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r
                "
                    onChange={onChange}
                  />,
                </div>
                {captchaValido === false && <div style={{color: "red"}} >Por favor acepta el captcha</div>}
                <div className="mt-4 d-flex flex-row">
                  <div className="form-group me-4">
                    <Button type="submit" variant="dark">
                      Login
                    </Button>
                  </div>
                </div>
                <p className="mt-4">
                  No tenés una cuenta?&nbsp;
                  <Link to="/register">Te invitamos a registrarte.</Link>
                </p>
              </Form>}
          </div>
        )}
      </Formik>

      {usuarioValido &&
        <div>
          <h1>Bienvenido</h1>
        </div>
      }
    </>
  );
};

export default Login;
