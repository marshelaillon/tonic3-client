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

const LoginWhitToken = () => {
  const guestEmails = useSelector(state => state.guestEmails);
  const verifiedToken = useSelector(state => state.verifiedToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tries, setTries] = useState(0);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [validGuest, setValidGuest] = useState(false);
  const [cantSubmit, setCantSubmit] = useState(false);
  const captcha = useRef(null);

  const handleSubmit = values => {
    console.log('tries', tries);
    if (!captchaValido) {
      return setCantSubmit(true);
    }
    if (values.email) {
      guestEmails.forEach(item => {
        item.email === values.email && setValidGuest(true);
      });
    }
    if (validGuest) {
      dispatch(verifyToken({ email: values.email, token: values.token })).then(
        state => {
          !state.payload.data && tries >= 3
            ? InvalidToken()
            : setTries(tries + 1);
        }
      );
    }
  };
  const validate = Yup.object({
    email: Yup.string()
      .email('El email ingresado no es válido')
      .required('Se requiere un email'),
    token: usuarioValido && Yup.string().required('se requiere un token'),
  });

  const onChange = () => {
    if (('hubo un cambio', captcha.current.getValue())) {
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
          //   password: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
          if (captcha.current.getValue()) {
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
              {!usuarioValido && (
                <div className="recaptcha">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r"
                    onChange={onChange}
                  />
                </div>
              )}
              {usuarioValido && validGuest && (
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

              {/* {validGuest && usuarioValido && (
                <div className="recaptcha">
                  <ReCAPTCHA
                    ref={captcha}
                    sitekey="6LdOKZogAAAAAEhkSW2hDBgJlWOncF-Ivg8DSB_r"
                    onChange={onChange}
                  />
                </div>
              )} */}

              {cantSubmit && (
                <div style={{ color: 'red' }}>Por favor acepta el captcha</div>
              )}
              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {!validGuest ? 'Search' : 'Enter'}
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
