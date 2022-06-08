import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from "react-router-dom";
import { getCarById, saveCar, CarStatus } from "../../../utils/http-utils/car-requests";
import './CarForm.scss';

export function CarForm() {
    const navigate = useNavigate();
    const params = useParams();
    const [car, setCar] = useState({
        type: '',
        brand: '',
        model: '',
        constYear: '',
        fType: '',
        numSeats: '',
        picture: '',
        cost: '',
        description: '',
        status: '',
    });

    useEffect(() => {
        if (params.id) {
            getCarById(params.id).then((response) => {
                setCar(response.data);
            });
        }
    }, [params.id]);

    const onInputChange = (event) => {
        setCar((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
    }

    const onCarSubmit = (event) => {
        event.preventDefault();

        saveCar(car).then(() => {
            navigate('/cars-list');
        });
    }

    return (
        <div className="car-form-wrapper">
            <Form onSubmit={onCarSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Type: </Form.Label>
                    <Form.Select name="type" value={car.type} onChange={onInputChange}>
                        <option value="Select vehicle type">Select vehicle type</option>
                        <option value="Economy">Economy</option>
                        <option value="Estate">Estate</option>
                        <option value="Luxury">Luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="Cargo">Cargo</option>
                    </Form.Select>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" placeholder="Brand name" name="brand" value={car.brand} onChange={onInputChange} />
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" placeholder="Model name" name="model" value={car.model} onChange={onInputChange} />
                    <Form.Label>Construction year</Form.Label>
                    <Form.Control type="text" placeholder="Year" name="constYear" value={car.constYear} onChange={onInputChange} />
                     <Form.Label>Fuel type: </Form.Label>
                    <Form.Select name="fType" value={car.fType} onChange={onInputChange}>
                        <option value="Select fuel type">Select fuel type</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                    </Form.Select>
                     <Form.Label>Number of seats: </Form.Label>
                     <Form.Control type="text" placeholder="Seats available" name="numSeats" value={car.numSeats} onChange={onInputChange} />
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={car.picture} onChange={onInputChange} />
                     <Form.Label>Price per day: </Form.Label>
                     <Form.Control type="text" placeholder="Enter cost per day" name="cost" value={car.cost} onChange={onInputChange} />
                    <Form.Label>Additional info</Form.Label>
                    <Form.Control type="text" placeholder="Enter additional info" name="description" value={car.description} onChange={onInputChange} />
                    <br></br>
                    <Form.Text>
                    <span className='key'>Status: </span>
                    <span className='value'>{car.status}</span>
                </Form.Text>
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">{car.id ? 'Return' : 'Create car'}</Button>
            </Form>
        </div>
    );
}