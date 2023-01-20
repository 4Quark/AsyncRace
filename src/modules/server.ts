import { carData, queryP, winnerData } from "./types";


class Server {
    static baseURL = 'http://127.0.0.1:3000';

    static path = {
        garage: '/garage',
        engine: '/engine',
        winners: '/winners',
    };

    static generateQueryString = (queryParams: queryP = []) => queryParams.length 
    ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}`
    : '';

    static getCars = async (queryParams: queryP) => {
        const response = await fetch(`${Server.baseURL}${Server.path.garage}${Server.generateQueryString(queryParams)}`);
        const cars = await response.json();
        return cars;
    };
    
    static getTotalCountCars = async () => {
        const response = await fetch(`${Server.baseURL}${Server.path.garage}${Server.generateQueryString([{key: '_page', value: '0'}])}`);
        const carCount = Number(response.headers.get('X-Total-Count'));
        return carCount;
    };
    
    static getCar = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.garage}/${id}`);
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('getCar - 404 NOT FOUND');
        }
    };
    
    static createCar = async (body: carData) => {
        const response = await fetch(`${Server.baseURL}${Server.path.garage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const car = await response.json();
        return car;
    };
    
    static deleteCar = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.garage}/${id}`, {
                method: 'DELETE',
            });
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('deleteCar - 404 NOT FOUND');
        }
    }; 
    
    static updateCar = async (id: number, body: carData) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.garage}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('updateCar - 404 NOT FOUND');
        }
    };
    
    static updateCarParamater = async (id: number, body: string) => {
        const response = await fetch(`${Server.baseURL}${Server.path.garage}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const car = await response.json();
        return car;
    };
    
    static engineStart = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.engine}${Server.generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'started'}])}`, {
                method: 'PATCH',
            });
            const car = await response.json()
            return car;
        } catch (error) {
            console.log('engineStart - 400 BAD REQUEST | 404 NOT FOUND');
        }
    };
    
    static engineStop = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.engine}${Server.generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'stopped'}])}`, {
                method: 'PATCH',
            });
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('engineStop - 400 BAD REQUEST | 404 NOT FOUND');
        }
    };
    
    static switchEnginetoDrive = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.engine}${Server.generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'drive'}])}`, {
                method: 'PATCH',
            });
            const car = await response.json();
            const success = car.success;
            return success;
        } catch (error: any) {
            console.log('error.text()' + error.text());
            console.log(id + '- switchEnginetoDrive - 400 BAD REQUEST | 404 NOT FOUND | 429 TOO MANY REQUESTS  | 500 INTERNAL SERVER ERROR ');
            // 500 - Car has been stopped suddenly. It's engine was broken down.
        }
    };
    
    static getWinners = async (queryParams: queryP) => {
        const response = await fetch(`${Server.baseURL}${Server.path.winners}${Server.generateQueryString(queryParams)}`);
        const cars: winnerData[] = await response.json();
        return cars;
    };

    static getWinner = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.winners}/${id}`);
            const car: winnerData = await response.json();
            return car;
        } catch (error) {
            console.log('getWinner - 404 NOT FOUND');
        }
    };
    
    static getTotalCountWinners = async () => {
        const response = await fetch(`${Server.baseURL}${Server.path.winners}${Server.generateQueryString([{key: '_page', value: '0'}])}`);
        const carCount = Number(response.headers.get('X-Total-Count'));
        return carCount;
    };

    static deleteWinner = async (id: number) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.winners}/${id}`, {
                method: 'DELETE',
            });
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('deleteWinner - 404 NOT FOUND');
        }
    }; 

    static updateWinner = async (id: number, body: winnerData) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.winners}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const car = await response.json();
            return car;
        } catch (error) {
            console.log('updateWinner - 404 NOT FOUND');
        }
    };
    
    static createWinner = async (body: winnerData) => {
        try {
            const response = await fetch(`${Server.baseURL}${Server.path.winners}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            const winner = await response.json();
            return winner;
        } catch (error) {
            console.log('createWinner - 500 INTERNAL SERVER ERROR ');
        }
    };
}

export default Server;
