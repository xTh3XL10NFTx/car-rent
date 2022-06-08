import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteCar, getAllCars, getAllCarsForAuthor, saveCar, CarStatus } from "../../../utils/http-utils/car-requests";
import { CarCard } from "../car-card/CarCard";

import './CarsList.scss';

export function CarsList() {
    const [cars, setCars] = useState([]);
    const params = useParams();

    useEffect(() => {
        if (params.id) {
            getAllCarsForAuthor(params.id).then(response => {
                setCars(response.data);
            });
        }
        else {
            getAllCars().then(response => {
                setCars(response.data);
            });
        }
        
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteCar(id).then(() => {
            setCars((prevState) => {
                return prevState.filter(car => car.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const car = cars.find(car => car.id === id);
        car.status = status;
        saveCar(car).then(() => {
            setCars([...cars]);
        });
    }

    const getCarsWithStatus = (status) => {
        return cars.filter(car => car.status === status).map(car => <CarCard key={car.id} car={car} onCarDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />)
    }

    const onDropHandler = (event, status) => {
        event.preventDefault();

        const carId = event.dataTransfer.getData('carId');
        onChangeStatusHandler(status, carId);
    }

    return (
        <div className="cars-list-wrapper">
            {/* { cars.map(car => <CarCard key={car.id} car={car} onCarDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) } */}

            <div className="status available" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, CarStatus.AVAILABLE)}>
                <div className="column-header">Available vehicles</div>
                { getCarsWithStatus(CarStatus.AVAILABLE) }
            </div>
            <div className="status rented" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, CarStatus.RENTED)}>
                <div className="column-header">Rented vehicles</div>
                { getCarsWithStatus(CarStatus.RENTED) }
            </div>
            <div className="status unavailable" onDragOver={(event) => event.preventDefault()} onDrop={(event) => onDropHandler(event, CarStatus.UNAVAILABLE)}>
                <div className="column-header">Unavailable vehicles</div>
                { getCarsWithStatus(CarStatus.UNAVAILABLE) }
            </div>
        </div>
    );
}