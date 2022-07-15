import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { registerUser } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterSuccessfully } from '../utils/sweetAlerts';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyGuest } from '../state/guests/verifyGuest';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import "../styles/forms.css"

const Register = () => {
  const { t } = useTranslation();
  const verifiedToken = useSelector(state => state.verifiedToken);
  const verifiedGuest = useSelector(state => state.verifiedGuest);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tokenCap, settokenCap] = useState(null);
  const captcha = useRef(null);

  const [type1, setType1] = useState('password');
  const [type2, setType2] = useState('password');
  const [icon1, setIcon1] = useState(eyeBlocked);
  const [icon2, setIcon2] = useState(eyeBlocked);

  const handleSubmit = values => {
    dispatch(
      registerUser({
        userName: values.userName,
        email: verifiedGuest.email,
        password: values.password,
        confirmpassword: values.confirmpassword,
      })
    );
    dispatch(
      verifyGuest({
        email: values.email,
      })
    );
    RegisterSuccessfully();
    navigate('/login');
  };

  const onLoad = () => {
    captcha.current.execute();
  };
  useEffect(() => {
    if (tokenCap) console.log(`Este es el bendito hCaptcha Token: ${tokenCap}`);
  }, [tokenCap]);

  const handleToggle1 = () => {
    if (type1 === 'password') {
      setIcon1(eye);
      setType1('text');
    }
    else {
      setIcon1(eyeBlocked);
      setType1('password');
    }
  };

  const handleToggle2 = () => {
    if (type2 === 'password') {
      setIcon2(eye);
      setType2('text');
    }
    else {
      setIcon2(eyeBlocked);
      setType2('password');
    }
  };

  const validate = Yup.object({
    userName: Yup.string().required(t('required_username')),
    email: Yup.string()
      .email(t('not_valid_email'))
      .required(t('required_email')),
    password: Yup.string()

      .required('Se requiere contraseña').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t('password_min_length')

      ),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
      .required(t('confirm_pass_required')),
  });

  return (
    <>
      {!verifiedToken && <Navigate to="/" />}
      <Formik
        initialValues={{
          userName: '',
          email: verifiedGuest.email,
          password: '',
          confirmpassword: '',
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {formik => (
          <div className="container w-75 mt-4">
            <h3>{t('register')}</h3>
            <Form>
              <div className="form-group">

                <label htmlFor="userName">{t('username')}</label>
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
                  <div className="invalid-feedback">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="email">{t('email')}</label>
                <Field
                  name="email"
                  className={
                    formik.touched.email && formik.errors.email
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  style={{ color: 'black' }}
                  type="email"
                  disabled
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">

                <label htmlFor="password">{t('password')}</label>
                <div className='input-button'>

                  <Field
                    name="password"
                    className={
                      formik.touched.password && formik.errors.password
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    type={type1}
                  />
                  <Button className='button-icon' variant='secondary'><span onClick={handleToggle1}><Icon icon={icon1} size={25} /></span></Button>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="invalid-feedback">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="form-group">

                <label htmlFor="confirmpassword">{t('confirm_password')}</label>
                <div className='input-button'>
                  <Field

                    name="confirmpassword"
                    className={
                      formik.touched.confirmpassword &&
                        formik.errors.confirmpassword
                        ? 'form-control is-invalid'
                        : 'form-control'
                    }
                    type={type2}
                  />
                  <Button className='button-icon' variant="secondary" ><span onClick={handleToggle2}><Icon icon={icon2} size={25} /></span></Button>
                </div>

                {formik.touched.confirmpassword &&
                  formik.errors.confirmpassword ? (
                  <div className="invalid-feedback">
                    {formik.errors.confirmpassword}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <HCaptcha
                  ref={captcha}
                  sitekey="0fb6ea85-da0d-4f63-83e7-d773f23a0453"
                  onVerify={tokenCap => settokenCap(tokenCap)}
                  onLoad={onLoad}
                />
              </div>

              {!captcha && (
                <div style={{ color: 'red' }}>{t('hcaptcha_msg')}</div>
              )}

              <div className=" btn mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {t('register')}
                  </Button>
                </div>
                <div className="form-group">
                  <Button type="reset" variant="dark">
                    {t('delete_form')}
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

export default Register;
