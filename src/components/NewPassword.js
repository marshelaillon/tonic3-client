import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotMatchPassword, PasswordSuccessfully } from '../utils/sweetAlerts';
import { newPassword } from '../state/user/user';
import { useTranslation } from 'react-i18next';

const NewPassword = () => {

  const id = useLocation().pathname;
  const { t } = useTranslation();
  const idUser = id.split('/');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = Yup.object({
    password: Yup.string()
    .required(t('required_password')).matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial"
    ),
    password2: Yup.string().required(t('required_password')).oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
  });

  const handleSubmit = value => {
    if (value.password !== value.password2) {
      NotMatchPassword();
    } else {
      dispatch(
        newPassword({
          password: value.password,
          id: idUser[2],
        })
      );
      PasswordSuccessfully();
      navigate('/login');
    }
  };
  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          password2: '',
        }}
        validationSchema={validate}
        //preguntar de donde mierda sale ese value ¿? {maxi}
        onSubmit={value => handleSubmit(value)}
      >
        {formik => (
          <div className="container w-75 mt-4">
            <Form>
              <Field
                name="password"
                placeholder={t('write_password')}
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
              <Field
                name="password2"
                placeholder={t('write_password_again')}
                className={
                  formik.touched.password2 && formik.errors.password2
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type="password"
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="invalid-feedback">
                  {formik.errors.password2}
                </div>
              ) : null}
              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="dark">
                    {t('btn_submit')}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default NewPassword;
