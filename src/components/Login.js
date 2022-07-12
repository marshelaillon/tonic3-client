import React from 'react';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../state/user/user';
import { Welcome } from '../utils/sweetAlerts';
import { useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useTranslation } from 'react-i18next';
import '../styles/App.css';

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tokenCap, settokenCap] = useState('');
  const captcha = useRef(null);

  const handleSubmit = values => {
    captcha.current.execute();
    dispatch(
      loginUser({
        email: values.email,
        password: values.password,
      })
    );
    Welcome();
    navigate('/');
  };

  useEffect(() => {
    if (tokenCap) console.log(`hCaptcha Token: ${tokenCap}`);
  }, [tokenCap]);

  const validate = Yup.object({
    email: Yup.string()
      .email(t('not_valid_email'))
      .required(t('required_email')),
    password: Yup.string()
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
          password: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {formik => (
          <div className="container w-75 mt-4">
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
              <div>
                <HCaptcha
                  ref={captcha}
                  sitekey="0fb6ea85-da0d-4f63-83e7-d773f23a0453"
                  onVerify={tokenCap => settokenCap(tokenCap)}
                  onExpire={e => settokenCap('')}
                />
              </div>
              {!captcha && (
                <div style={{ color: 'red' }}>{t('hcaptcha_msg')}</div>
              )}

              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {t('login')}
                  </Button>
                </div>
              </div>
              <p className="mt-4">
                {t('dont_have_account')}&nbsp;
                <Link to="/register">{t('invite_to_register')}</Link>
              </p>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
