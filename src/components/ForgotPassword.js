import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { EmailPassword } from '../utils/sweetAlerts';
import { useTranslation } from 'react-i18next';
import "../styles/forms.css"

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const validate = Yup.object({
    email: Yup.string()
      .email(t('not_valid_email'))
      .required(t('required_email')),
  });
  const handleSubmit = value => {
    dispatch(
      forgotPassword({
        email: value.email,
      })
    );
    EmailPassword();
    navigate('/');
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validate}
        onSubmit={value => handleSubmit(value)}
      >
        {formik => (
          <div className="container w-75 mt-4">
            <Form>
              <div className="form-group">
                <label>{t("forgot_your_password")}</label>
                <Field
                  name="email"
                  placeholder={t('enter_your_email')}
                  className={
                    formik.touched.email && formik.errors.email
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="email"
                />
                <div className="mt-4 d-flex flex-row">
                  <div className="form-group me-4">
                    <Button type="submit" variant="dark">
                      {t('btn_submit')}
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
