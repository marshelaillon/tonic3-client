import React from 'react';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../state/guests/verifyToken';
import { InvalidToken } from '../utils/sweetAlerts';
import ReCAPTCHA from 'react-google-recaptcha';

import { checkCaptcha } from '../state/user/user';

import { verifyGuest } from '../state/guests/verifyGuest';
import { loginUser } from '../state/user/user';

const LoginWhitToken = () => {
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const dispatch = useDispatch();
  const [tries, setTries] = useState(0);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [cantSubmit, setCantSubmit] = useState(false);
  const captcha = useRef();

  const handleSubmit = values => {
    console.log(tries);
    if (!captchaValido) {
      return setCantSubmit(true);
    }

    if (!checkedEmail) {
      return dispatch(verifyGuest({ email: values.email }))
        .then(({ payload }) => {
          setCheckedEmail(payload?.data.verified);
        })
        .catch(err => console.error(err));
    }
    if (!verifiedGuest.checked) {
      return dispatch(
        verifyToken({ email: values.email, token: values.token })
      ).then(state => {
        !state.payload?.data && tries >= 3
          ? InvalidToken()
          : setTries(tries + 1);
      });
    }
    if (values.password)
      dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      );
  };
  const validate = Yup.object({
    email: Yup.string()
      .email('El email ingresado no es válido')
      .required('Se requiere un email'),
    token:
      usuarioValido &&
      !verifiedGuest?.checked &&
      Yup.string().required('se requiere un token'),
    password:
      usuarioValido &&
      verifiedGuest?.checked &&
      Yup.string().required('Se requiere contraseña'),
  });

  const onChange = () => {
    const captchaToken = captcha.current.getValue();
    /* dispatch(checkCaptcha({
      tokenCaptcha: captchaToken
    })) */
    if (('hubo un cambio', captchaToken)) {
      console.log('esto es el captcha', captcha);
      console.log('el usuario no es un robot');
      setCaptchaValido(true);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '',
          token: '',
          password: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
          if (captcha.current?.getValue()) {
            console.log('el usuario no es un robot');
            setUsuarioValido(true);
            setCaptchaValido(true);
          } else {
            console.log('Aceptar el captcha');
            setUsuarioValido(false);
            setCaptchaValido(false);
          }
        }}
      >
        {formik => (
          <div className="container w-75 mt-4 form">
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
              {!usuarioValido && (
                <div className="recaptcha">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r"
                    onChange={onChange}
                  />
                </div>
              )}

              {/* si el usuario NO esta registrado, se lo verifica con el token
                y se lo redirige a /register */}
              {checkedEmail && !verifiedGuest.checked && (
                <div className="form-group">
                  <label htmlFor="loginToken">
                    Token
                    <Field
                      name="token"
                      className={
                        formik.touched.token && formik.errors.token
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="password"
                    />
                    {formik.touched.token && formik.errors.token ? (
                      <div className="invalid-feedback">
                        {formik.errors.token}
                      </div>
                    ) : null}
                  </label>
                </div>
              )}
              {/* si el usuario esta ya registrado, se lo loguea */}
              {checkedEmail && verifiedGuest.checked && (
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
              )}

              {cantSubmit && (
                <div style={{ color: 'red' }}>Por favor acepta el captcha</div>
              )}

              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {!checkedEmail ? 'Welcome' : 'Enter'}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {/* {!verifiedToken && tries >= 3 && <>{InvalidToken()}</>} */}
    </>
  );
};

export default LoginWhitToken;
