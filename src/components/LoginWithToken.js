import React from 'react';
import { useRef, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '../state/guests/verifyToken';
import { InvalidToken } from '../utils/sweetAlerts';
import { verifyGuest } from '../state/guests/verifyGuest';
import { checkUser, loginUser, setToken } from '../state/user/user';
import updateToken from '../services/updateToken';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTranslation } from 'react-i18next';

const LoginWhitToken = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const guestdata = verifiedGuest?.data;
  const dispatch = useDispatch();
  const [tries, setTries] = useState(0);
  const [usuarioValido, setUsuarioValido] = useState(false);
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [tokenCap, settokenCap] = useState(null);
  const captcha = useRef(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit = async values => {
    if (!checkedEmail) {
      return dispatch(verifyGuest({ email: values.email }))
        .then(({ payload }) => {
          setCheckedEmail(payload?.data.verified);
        })
        .catch(err => console.error(err));
    }
    if (!guestdata.checked) {
      return dispatch(
        verifyToken({ email: values.email, token: values.token })
      ).then(state => {
        !state.payload?.data && tries >= 3
          ? InvalidToken() && updateToken({ email: values.email })
          : setTries(tries + 1);
      });
    }
    if (values.password) {
      const user = await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      );
      const token = user?.payload?.token;
      token && dispatch(setToken(token));
      localStorage.setItem('token', token);
    }
    setIsLogged(true);
  };

  const onLoad = () => {
    captcha.current.execute();
  };

  useEffect(() => {
    if (tokenCap) console.log(`Este es el bendito hCaptcha Token: ${tokenCap}`);
  }, [tokenCap]);

  useEffect(() => {
    dispatch(checkUser());
  }, [isLogged]);

  const validate = Yup.object({
    email: Yup.string()
      .email(t('not_valid_email'))
      .required(t('required_email')),
    token: usuarioValido && Yup.string().required(t('required_access_code')),
    password:
      usuarioValido &&
      Yup.string()
        .required(t('required_password'))
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          t('pass_must_contain')
        ),
  });

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
        }}
      >
        {formik => (
          <div className="container w-75 mt-4 form">
            <Form>
              <div className="form-group">
                <label htmlFor="email">{t('email')}</label>
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

              {/* si el usuario NO esta registrado, se lo verifica con el token
                y se lo redirige a /register */}
              {checkedEmail && !guestdata.checked && (
                <div className="form-group">
                  <label htmlFor="loginToken">
                    {t('access_code')}
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
              {checkedEmail && guestdata.checked && (
                <div className="form-group">
                  <label htmlFor="password">{t('password')}</label>
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
              <div className="form-group">
                <HCaptcha
                  ref={captcha}
                  sitekey="0fb6ea85-da0d-4f63-83e7-d773f23a0453"
                  onVerify={tokenCap => settokenCap(tokenCap)}
                  onLoad={onLoad}
                />
              </div>

              <div className=" mt-4 d-flex flex-row">
                {!captcha && (
                  <div style={{ color: 'red' }}>{t('hcaptcha_msg')}</div>
                )}
              </div>

              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {!checkedEmail ? t('welcome_btn') : t('enter_btn')}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default LoginWhitToken;
