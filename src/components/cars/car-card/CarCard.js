import './CarCard.scss';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import { useNavigate } from 'react-router-dom';
import { CarStatus } from '../../../utils/http-utils/car-requests';

export function CarCard({ car, onCarDelete, changeStatus }) {
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();

    const navigateToEdit = () => {
        navigate(`/car/edit/${car.id}`);
    }

    const renderNextStateButton = () => {

        if (car.authorId === loggedUser.id || loggedUser.role !== "admin") {
            switch(car.status) {
                case CarStatus.RENTED: 
                    return <Button variant='warning' onClick={() => changeStatus(CarStatus.AVAILABLE, car.id)}>Change to AVAILABLE</Button>;
                case CarStatus.AVAILABLE: 
                    return <Button variant='success' onClick={() => changeStatus(CarStatus.RENTED, car.id)}>Change to RENTED</Button>;
            }
        }

        if (loggedUser.role === "admin") {
            switch(car.status) {
                case CarStatus.UNAVAILABLE: 
                    return <Button variant='danger' onClick={() => changeStatus(CarStatus.AVAILABLE, car.id)}>Change to AVAILABLE</Button>;
                case CarStatus.AVAILABLE: 
                    return <Button variant='success' onClick={() => changeStatus(CarStatus.RENTED, car.id)}>Change to RENTED</Button>;
                case CarStatus.RENTED: 
                    return <Button variant='warning' onClick={() => changeStatus(CarStatus.UNAVAILABLE, car.id)}>Change to UNAVAILABLE</Button>;
            }
        }

    }

    const renderEditButton = () => {
        if(loggedUser.role === "admin" || loggedUser.id === car.authorId) {
            return <Button variant="primary" onClick={navigateToEdit}>Edit</Button>;
        }
    }

    const renderDeleteButton = () => {
        if(loggedUser.role === "admin" || loggedUser.id === car.authorId) {
            return <Button variant="danger" onClick={() => onCarDelete(car.id)}>Delete</Button>;
        }
    }

    const onDragHandler = (event) => {
        event.dataTransfer.setData("carId", car.id);
    }
    

    return (
        <div className="car-card-wrapper" draggable={true} onDrag={(event) => onDragHandler(event)}>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Title>{ car.title }</Card.Title>
                    <Card.Text>
                        <span className='key'>Brand: </span>
                        <span className='value'>{car.brand}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Model: </span>
                        <span className='value'>{car.model}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Construction Year: </span>
                        <span className='value'>{car.constYear}</span>
                    </Card.Text>                    
                    <Card.Img variant="top" src={car.picture} />
                    <Card.Text>
                        <span className='key'>Type: </span>
                        <span className='value'>{car.type}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Fuel Type: </span>
                        <span className='value'>{car.fType}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Number of seats: </span>
                        <span className='value'>{car.numSeats}</span>
                    </Card.Text>
                    <Card.Text>
                        <span className='key'>Price per day: </span>
                        <span className='value'>{car.cost}</span>
                    </Card.Text>
                    <div className='btn-holder'>
                        { renderEditButton()  }
                        { renderDeleteButton()  }                             
                        { renderNextStateButton() }
                    </div>                
                </Card.Body>
            </Card>
        </div>
    );
}