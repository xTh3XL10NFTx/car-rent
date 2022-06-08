import axios from "axios";
import { getLoggedUser } from "./user-requests";

export const CarStatus = {
    AVAILABLE: 'Available',
    RENTED: 'Rented',
    UNAVAILABLE: 'Unavailable',
};

const apiUrl = 'http://localhost:3005/Cars';

export function getAllCars() {
    return axios.get(apiUrl);
}

export function getAllCarsForAuthor(authorId) {
    return axios.get(`${apiUrl}?authorId=${authorId}`);
}

export function getCarById(CarId) {
    return axios.get(`${apiUrl}/${CarId}`);
}

export function saveCar(Car) {
    // create
    if (!Car.id) {
        const loggedUser = getLoggedUser();

        Car.authorId = loggedUser.id;
        Car.authorName = loggedUser.name;
        Car.status = CarStatus.AVAILABLE;
        Car.createdDate = new Date().toDateString();
        Car.dueDate = new Date(Car.dueDate).toDateString();
        return axios.post(apiUrl, Car);
    }

    Car.createdDate = new Date(Car.createdDate).toDateString();
    Car.dueDate = new Date(Car.dueDate).toDateString();
    return axios.put(`${apiUrl}/${Car.id}`, Car);
}

export function deleteCar(id) {
    return axios.delete(`${apiUrl}/${id}`);
}