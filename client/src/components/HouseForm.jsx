import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { fetchHouseByName, createHouse, updateHouse, clearHouse, fetchHouses } from '../redux/housesSlice';
import houseValidationSchema from '../validation/houseValidationSchema'; // Assuming validation schema exists

const HouseForm = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { house, status, error } = useSelector((state) => state.houses);
    const isEditMode = !!name;

    const [initialFormData, setInitialFormData] = useState({
        name: '',
        region: '',
        coatOfArms: '',
        words: '',
        titles: '',
        seats: '',
        currentLord: '',
        heir: '',
        overlord: '',
        founded: '',
        founder: '',
        diedOut: '',
        ancestralWeapons: '',
        cadetBranches: '',
        swornMembers: '',
    });

    useEffect(() => {
        if (isEditMode) {
            if (location.state) {
                const houseFromState = location.state;
                setInitialFormData({
                    name: houseFromState.name,
                    region: houseFromState.region,
                    coatOfArms: houseFromState.coatOfArms,
                    words: houseFromState.words,
                    titles: houseFromState.titles.join(', '),
                    seats: houseFromState.seats.join(', '),
                    currentLord: houseFromState.currentLord,
                    heir: houseFromState.heir,
                    overlord: houseFromState.overlord,
                    founded: houseFromState.founded,
                    founder: houseFromState.founder,
                    diedOut: houseFromState.diedOut,
                    ancestralWeapons: houseFromState.ancestralWeapons.join(', '),
                    cadetBranches: houseFromState.cadetBranches.join(', '),
                    swornMembers: houseFromState.swornMembers.join(', '),
                });
            } else {
                dispatch(fetchHouseByName(name));
            }
        }

        return () => {
            dispatch(clearHouse());
        };
    }, [name, isEditMode, location.state, dispatch]);

    useEffect(() => {
        if (house) {
            setInitialFormData({
                name: house.name,
                region: house.region,
                coatOfArms: house.coatOfArms,
                words: house.words,
                titles: house.titles.join(', '),
                seats: house.seats.join(', '),
                currentLord: house.currentLord,
                heir: house.heir,
                overlord: house.overlord,
                founded: house.founded,
                founder: house.founder,
                diedOut: house.diedOut,
                ancestralWeapons: house.ancestralWeapons.join(', '),
                cadetBranches: house.cadetBranches.join(', '),
                swornMembers: house.swornMembers.join(', '),
            });
        }
    }, [house]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload = {
            ...values,
            titles: values.titles.split(',').map((title) => title.trim()).filter(Boolean),
            seats: values.seats.split(',').map((seat) => seat.trim()).filter(Boolean),
            ancestralWeapons: values.ancestralWeapons.split(',').map((weapon) => weapon.trim()).filter(Boolean),
            cadetBranches: values.cadetBranches.split(',').map((branch) => branch.trim()).filter(Boolean),
            swornMembers: values.swornMembers.split(',').map((member) => member.trim()).filter(Boolean),
        };

        if (isEditMode) {
            await dispatch(updateHouse({ name: house.name, houseData: payload }));
        } else {
            await dispatch(createHouse(payload));
        }

        if (!error) {
            dispatch(fetchHouses());
            resetForm();
            dispatch(clearHouse());
            navigate('/houses');
        }
        setSubmitting(false);
    };

    if (status === 'loading') {
        return <Spinner animation="border" />;
    }

    return (
        <div className="mt-5 container" style={{ maxWidth: '800px' }}>
            <h2>{isEditMode ? 'Update House' : 'Create House'}</h2>
            <Formik
                initialValues={initialFormData}
                validationSchema={houseValidationSchema} // Assume there's a validation schema
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>House Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formRegion">
                            <Form.Label>Region</Form.Label>
                            <Form.Control
                                type="text"
                                name="region"
                                value={values.region}
                                onChange={handleChange}
                                isInvalid={touched.region && errors.region}
                            />
                            <Form.Control.Feedback type="invalid">{errors.region}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCoatOfArms">
                            <Form.Label>Coat of Arms</Form.Label>
                            <Form.Control
                                type="text"
                                name="coatOfArms"
                                value={values.coatOfArms}
                                onChange={handleChange}
                                isInvalid={touched.coatOfArms && errors.coatOfArms}
                            />
                            <Form.Control.Feedback type="invalid">{errors.coatOfArms}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formWords">
                            <Form.Label>Words</Form.Label>
                            <Form.Control
                                type="text"
                                name="words"
                                value={values.words}
                                onChange={handleChange}
                                isInvalid={touched.words && errors.words}
                            />
                            <Form.Control.Feedback type="invalid">{errors.words}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formTitles">
                            <Form.Label>Titles (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="titles"
                                value={values.titles}
                                onChange={handleChange}
                                isInvalid={touched.titles && errors.titles}
                            />
                            <Form.Control.Feedback type="invalid">{errors.titles}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSeats">
                            <Form.Label>Seats (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="seats"
                                value={values.seats}
                                onChange={handleChange}
                                isInvalid={touched.seats && errors.seats}
                            />
                            <Form.Control.Feedback type="invalid">{errors.seats}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCurrentLord">
                            <Form.Label>Current Lord</Form.Label>
                            <Form.Control
                                type="text"
                                name="currentLord"
                                value={values.currentLord}
                                onChange={handleChange}
                                isInvalid={touched.currentLord && errors.currentLord}
                            />
                            <Form.Control.Feedback type="invalid">{errors.currentLord}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formHeir">
                            <Form.Label>Heir</Form.Label>
                            <Form.Control
                                type="text"
                                name="heir"
                                value={values.heir}
                                onChange={handleChange}
                                isInvalid={touched.heir && errors.heir}
                            />
                            <Form.Control.Feedback type="invalid">{errors.heir}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formFounded">
                            <Form.Label>Founded</Form.Label>
                            <Form.Control
                                type="text"
                                name="founded"
                                value={values.founded}
                                onChange={handleChange}
                                isInvalid={touched.founded && errors.founded}
                            />
                            <Form.Control.Feedback type="invalid">{errors.founded}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formFounder">
                            <Form.Label>Founder</Form.Label>
                            <Form.Control
                                type="text"
                                name="founder"
                                value={values.founder}
                                onChange={handleChange}
                                isInvalid={touched.founder && errors.founder}
                            />
                            <Form.Control.Feedback type="invalid">{errors.founder}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formAncestralWeapons">
                            <Form.Label>Ancestral Weapons (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="ancestralWeapons"
                                value={values.ancestralWeapons}
                                onChange={handleChange}
                                isInvalid={touched.ancestralWeapons && errors.ancestralWeapons}
                            />
                            <Form.Control.Feedback type="invalid">{errors.ancestralWeapons}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formCadetBranches">
                            <Form.Label>Cadet Branches (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="cadetBranches"
                                value={values.cadetBranches}
                                onChange={handleChange}
                                isInvalid={touched.cadetBranches && errors.cadetBranches}
                            />
                            <Form.Control.Feedback type="invalid">{errors.cadetBranches}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formSwornMembers">
                            <Form.Label>Sworn Members (comma separated)</Form.Label>
                            <Form.Control
                                type="text"
                                name="swornMembers"
                                value={values.swornMembers}
                                onChange={handleChange}
                                isInvalid={touched.swornMembers && errors.swornMembers}
                            />
                            <Form.Control.Feedback type="invalid">{errors.swornMembers}</Form.Control.Feedback>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4" disabled={isSubmitting}>
                            {isEditMode ? 'Update House' : 'Create House'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default HouseForm;
