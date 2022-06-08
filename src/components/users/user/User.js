import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../utils/http-utils/user-requests";
import { getAllCarsForAuthor, deleteCar, saveCar } from "../../../utils/http-utils/car-requests";
import { UserCard } from "../user-card/UserCard";
import { CarCard } from "../../cars/car-card/CarCard";
import './User.scss';

export function User(props) {
    const params = useParams();
    const [user, setUser] = useState(null);
    const [userCars, setUserCars] = useState();


    useEffect(() => {
        getUserById(params.id).then(response => setUser(response.data));
        getAllCarsForAuthor(params.id).then(response => setUserCars(response.data));
    }, [params.id])

    const onDeleteHandler = (id) => {
        deleteCar(id).then(() => {
            setUserCars((prevState) => {
                return prevState.filter(car => car.id !== id);
            });
        });
    }

    const onChangeStatusHandler = (status, id) => {
        const car = userCars.find(car => car.id === id);
        car.status = status;
        saveCar(car).then(() => {
            setUserCars([...userCars]);
        });
    }

    return (
        <div className="user">
            <UserCard user={user} isInDetails={true} />
            <div className="user-cars-holder">
                { userCars?.map(car => <CarCard  key={car.id} car={car} onCarDelete={onDeleteHandler} changeStatus={onChangeStatusHandler} />) }
            </div>
        </div>
    )
}