import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../../state/admin/eventController/event';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePicker.scss';
import { useNavigate } from 'react-router-dom';

const AddEvents = ({ refresh }) => {
  const listener = useSelector(state => state.listener);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date().getTime() + 86400000);
  const [image, setImage] = useState(null);
  const { t } = useTranslation();
  const handleSubmit = async values => {
    await dispatch(
      addEvent({
        title: values.title,
        url: values.url,
        description: values.description,
        image: image,
        date: date,
      })
    );
    await refresh();
    navigate(`/admin/app/${listener}`);
  };
  const validate = Yup.object({
    url: Yup.string().url().required(t('required_event_link')),
    description: Yup.string().required(t('required_event_description')),
    title: Yup.string().required(t('required_event_title')),
    date: Yup.string().required(t('required_event_date')),
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          url: '',
          description: '',
          image,
          date,
        }}
        validationSchema={validate}
        onSubmit={values => {
          handleSubmit(values);
        }}
      >
        {formik => (
          <div>
            <Form method="post" encType="multipart/form-data" id="addEvent">
              <div className="form-group">
                <label htmlFor="title">{t('event_title')}</label>
                <Field
                  name="title"
                  className={
                    formik.touched.title && formik.errors.title
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="text"
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="invalid-feedback">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="url">{t('event_link')}</label>
                <Field
                  name="url"
                  className={
                    formik.touched.url && formik.errors.url
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="text"
                />
                {formik.touched.url && formik.errors.url ? (
                  <div className="invalid-feedback">{formik.errors.url}</div>
                ) : null}
              </div>
              <div className="form-group">
                <label htmlFor="description">{t('event_description')}</label>
                <Field
                  name="description"
                  as="textarea"
                  className={
                    formik.touched.description && formik.errors.description
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="text"
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="invalid-feedback">
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="image">{t('event_image')}</label>
                <Field
                  name="image"
                  className={
                    formik.touched.title && formik.errors.title
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  type="file"
                  onChange={e => {
                    console.log(e.target.files);
                    setImage(e.target.files[0]);
                  }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">{t('event_date')}</label>

                <DatePicker
                  name="date"
                  wrapperClassName="date-picker"
                  selected={date}
                  onChange={date => setDate(date)}
                  showTimeSelect
                  timeIntervals={1}
                  dateFormat="dd-MMMM-yyyy, hh:mm aa"
                />
              </div>

              <div className="mt-4 d-flex flex-row">
                <div className="form-group me-4">
                  <Button type="submit" variant="light">
                    {t('create_event')}
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

export default AddEvents;
