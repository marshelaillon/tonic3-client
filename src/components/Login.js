import React from 'react';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../state/user/user';
import {Welcome} from '../utils/sweetAlerts'
// import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [captchaValido, setCaptchaValido] = useState(false);
  // const [usuarioValido, setUsuarioValido] = useState(false);
  // const [cantSubmit, setCantSubmit] = useState(false);
  // const captcha = useRef();

  const handleSubmit = values => {
    // if (!captchaValido) {
    //   return setCantSubmit(true);
    // }

    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
    Welcome()
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

  // const onChange = () => {
  //   if (('hubo un cambio', captcha.current.getValue())) {
  //     console.log('el usuario no es un robot');
  //     setCaptchaValido(true);
  //   }
  // };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
          // if (captcha.current.getValue()) {
          //   console.log('el usuario no es un robot');
          //   setUsuarioValido(true);
          //   setCaptchaValido(true);
          // } else {
          //   console.log('Aceptar el captcha');
          //   setUsuarioValido(false);
          //   setCaptchaValido(false);
          // }
        }}
      >
        {formik => (
          <div className="container w-75 mt-4">
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
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              {/* {!usuarioValido && (
                <div className="recaptcha">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r"
                    onChange={onChange}
                    style={{ width: '15px' }}
                  />
                </div>
              )} */}

              {/* {cantSubmit && (
                <div style={{ color: 'red' }}>Por favor acepta el captcha</div>
              )} */}

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
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
