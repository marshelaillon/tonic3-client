import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { editEvent } from '../../state/admin/eventController/event';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/DatePicker.scss';
import { useNavigate } from 'react-router-dom';

const UpgradeEvents = ({ item, refresh }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [date, setDate] = useState(new Date(item.date));
    const { t } = useTranslation();

    const handleSubmit = async values => {
        await dispatch(
            editEvent({
                id: item.id,
                title: values.title,
                url: values.url,
                description: values.description,
                date: date,
            })
        );
        await refresh();
    };

    const validate = Yup.object({
        url: Yup.string().url().required(t('required_event_link')),
        description: Yup.string().required(t('required_event_description')),
        title: Yup.string().required(t('required_event_title')),
        date: Yup.string().required(t('required_event_date')),
    });

    return (
        <>
            {/* <Button onHide={handleShow}><h1>Upgrade</h1></Button>
            <Modal.Dialog
                className="modalFondo"
                onHide={handleClose}
                centered
                backdrop="static"
                keyboard={true}
                show={show}
            >
                <Modal.Body className="modalBody"> */}
            <div>
                <h1>HELLO WORD</h1>
                <Formik
                    initialValues={{
                        title: item.title,
                        url: item.url,
                        description: item.description,
                        date: item.date,
                    }}
                    validationSchema={validate}
                    onSubmit={values => {
                        console.log('values', values);
                        // console.log('date', date);
                        handleSubmit(values);
                    }}
                >
                    {formik => (
                        <div>
                            <Form>
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
                                        <div className="invalid-feedback">
                                            {formik.errors.title}
                                        </div>
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
                                        <Button
                                            type="submit"
                                            variant="light"
                                            onClick={() => {
                                                navigate(`/admin/app/events`);
                                            }}
                                        >
                                            Editar Evento
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )}
                </Formik>
            </div>
            {/* </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal.Dialog > */}
        </>
    );
};

export default UpgradeEvents;
