import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { NotMatchPassword, PasswordSuccessfully } from '../utils/sweetAlerts';
import { newPassword } from '../state/user/user';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-icons-kit';
import { eye } from 'react-icons-kit/icomoon/eye';
import { eyeBlocked } from 'react-icons-kit/icomoon/eyeBlocked';
import "../styles/forms.css"


const NewPassword = () => {

  const id = useLocation().pathname;
  const { t } = useTranslation();
  const idUser = id.split('/');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type1, setType1] = useState('password');
  const [type2, setType2] = useState('password');
  const [icon1, setIcon1] = useState(eyeBlocked);
  const [icon2, setIcon2] = useState(eyeBlocked);

  const validate = Yup.object({
    password: Yup.string()
      .required(t('required_password')).matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        t('pass_must_contain')
      ),
    password2: Yup.string().required(t('required_password')).oneOf([Yup.ref('password'), null], (t("password_not_match")))
  });

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
              <div className="form-group">

                <label htmlFor="password">{t('password')}</label>
                <div className='input-button'>
                  <Field
                    name="password"
                    placeholder={t('write_password')}
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
                  <div className="invalid-feedback">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="form-group">
                
              <label htmlFor="confirmpassword">{t('confirm_password')}</label>
              <div className='input-button'>
                 <Field
                 name="password2"
                placeholder={t('write_password_again')}
                className={
                  formik.touched.password2 && formik.errors.password2
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
                type={type2}
                />
                <Button className='button-icon' variant="secondary" ><span onClick={handleToggle2}><Icon icon={icon2} size={25} /></span></Button>
                </div>
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="invalid-feedback">
                  {formik.errors.password2}
                </div>
              ) : null}
              </div>
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
