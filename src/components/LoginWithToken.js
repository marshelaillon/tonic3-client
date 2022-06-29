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
import { verifyGuest } from '../state/guests/verifyGuest';
import { loginUser } from '../state/user/user';

// Al momento tenemos un sistema de logueo con token y un sistema de logueo con password, por separado.
// Propongo que sea el mismo componente. Siguiendo con la logica que planteamos ayer con las chicas,
// podemos hacer que apenas ingresa el usuario a la app y si este no esta ya logueado, lo primero que se le pida es el mail.
// En vez de dispararse la busqueda en el front como propuse ayer, que se dispare la busqueda al back, ademas de
// verificiar si el email esta en la lista de invitados, verificar si este usuario no se hizo ya una cuenta,
// si no lo hizo, se le pide el token, se hacen las comprobaciones necesarias y se lo invita a registrase, para evitarse este paso
// durante el proximo ingreso, basicamente lo obligamos, lo redirigimos donde corresponda y listo.
// si el mail pertenece a un invitado CHECKED true, se le pide la constraseña y se dispara el dispatch de login.

const LoginWhitToken = () => {
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tries, setTries] = useState(0);
  const [captchaValido, setCaptchaValido] = useState(false);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [validGuest, setValidGuest] = useState(false);
  const [cantSubmit, setCantSubmit] = useState(false);
  const captcha = useRef(null);

  const handleSubmit = values => {
    console.log(tries);
    if (!captchaValido) {
      return setCantSubmit(true);
    }
    if (!checkedEmail) {
      return dispatch(verifyGuest({ email: values.email }))
        .then(({ payload }) => {
          setCheckedEmail(payload.data.verified);
        })
        .catch(err => console.error(err));
    }
    if (!verifiedGuest.checked) {
      dispatch(verifyToken({ email: values.email, token: values.token })).then(
        state => {
          !state.payload.data && tries >= 3
            ? InvalidToken()
            : setTries(tries + 1);
        }
      );
    } else dispatch(loginUser());
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

              {/* si el usuario NO esta registrado, se lo verifica con el token
                y se lo redirige a /register */}
              {usuarioValido && checkedEmail && !verifiedGuest.checked && (
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
              {usuarioValido && checkedEmail && verifiedGuest.checked && (
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
