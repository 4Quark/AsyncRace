const baseURL = 'http://127.0.0.1:3000';

const path = {
    garage: '/garage',
    engine: '/engine',
    winners: '/winners',
};

type queryP = {
    key: string, 
    value: string,
}[];

const generateQueryString = (queryParams: queryP = []) => queryParams.length 
    ? `?${queryParams.map(x => `${x.key}=${x.value}`).join('&')}`
    : '';

const getCars = async (queryParams: queryP) => {
    const response = await fetch(`${baseURL}${path.garage}${generateQueryString(queryParams)}`);
    const cars = await response.json();
    return cars;
};

const getTotalCountCars = async () => {
    const response = await fetch(`${baseURL}${path.garage}${generateQueryString([{key: '_page', value: '0'}])}`);
    const carCount = Number(response.headers.get('X-Total-Count'));
    return carCount;
};

const getCar = async (id: string) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`);
    const car = await response.json();
    return car;
};

const createCar = async (body: string) => {
    const response = await fetch(`${baseURL}${path.garage}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const deleteCar = async (id: string) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'DELETE',
    });
    const car = await response.json();
    return car;
}; 

const updateCar = async (id: string, body: string) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const updateCarParamater = async (id: string, body: string) => {
    const response = await fetch(`${baseURL}${path.garage}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const car = await response.json();
    return car;
};

const engineStart = async (id: string) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'started'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json()
    return car;
};

const engineStop = async (id: string) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'stopped'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json();
    return car;
};

const switchEnginetoDrive = async (id: string) => {
    const response = await fetch(`${baseURL}${path.engine}${generateQueryString([{key: 'id', value: id}, {key: 'status', value: 'drive'}])}`, {
        method: 'PATCH',
    });
    const car = await response.json();
    const success = car.success;
    return success;
};


const getWinners = async (queryParams: queryP) => {
    const response = await fetch(`${baseURL}${path.winners}${generateQueryString(queryParams)}`);
    const cars = await response.json();
    return cars;
};

const getTotalCountWinners = async () => {
    const response = await fetch(`${baseURL}${path.winners}${generateQueryString([{key: '_page', value: '0'}])}`);
    const carCount = Number(response.headers.get('X-Total-Count'));
    return carCount;
};

const createWinner = async (body: string) => {
    const response = await fetch(`${baseURL}${path.winners}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const winner = await response.json();
    return winner;
};