/* eslint-disable no-async-promise-executor */
import { carStatus, preview } from './controller';
import { carBrand, carModal } from './components/data';
import Main from './view/main';
import Pagination from './components/pagination';
import Popup from './components/popup';
import Server from './server';
import { carData, carDrive, winnerData } from './types';
import Winners from './winners';

class Garage {
    static totalCarCount = 0;
    static carsOnPage = 7;
    static raceWinner: winnerData;

    static carCount = async function() {
        const GARAGE_HEADER = document.querySelector('.garage_and_count');
        Garage.totalCarCount = await Server.getTotalCountCars();
        if (GARAGE_HEADER) GARAGE_HEADER.innerHTML = `Garage (${Garage.totalCarCount})`;
        Main.totalGarage.innerHTML = `${Math.ceil(Garage.totalCarCount / Garage.carsOnPage)}`;
    }

    static carCreator(newCarName: string, newCarColor: string, newCarID: number) {
        const updateBtn = document.createElement('button');
        updateBtn.classList.add('regular_btn');
        updateBtn.classList.add('car_btn');
        updateBtn.id = `${newCarID}-select`;
        updateBtn.innerText = `Update`;
        updateBtn.addEventListener('click', () => Garage.updateCarFunc(newCarID));

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('regular_btn');
        removeBtn.classList.add('car_btn');
        removeBtn.id = `${newCarID}-remove`;
        removeBtn.innerText = `X`;
        removeBtn.addEventListener('click', () => Garage.deleteCarFunc(newCarID));

        const carName = document.createElement('a');
        carName.classList.add('car_name');
        carName.id = `${newCarID}-name`;
        carName.innerText = `${newCarName}`;

        const settings = document.createElement('div');
        settings.classList.add('car_settings');
        settings.append(updateBtn);
        settings.append(removeBtn);
        settings.append(carName);

        const driveStart = document.createElement('button');
        driveStart.classList.add('drive_btn');
        driveStart.id = `${newCarID}-start`;
        driveStart.innerText = `Start`;
        driveStart.addEventListener('click', () => Garage.moveCar(newCarID));

        const moveStart = document.createElement('button');
        moveStart.classList.add('drive_btn');
        moveStart.id = `${newCarID}-to-start`;
        moveStart.disabled = true;
        moveStart.innerText = `to start`;
        moveStart.addEventListener('click', () => Garage.moveToStart(newCarID));

        const driving = document.createElement('div');
        driving.classList.add('car_road_buttons');
        driving.append(driveStart);
        driving.append(moveStart);

        const car = document.createElement('div');
        car.classList.add('car_img_container');
        car.innerHTML = `
                        <svg class="car_img" id="${newCarID}-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                            <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${newCarColor}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                        </svg>`;

        const finish = document.createElement('div');
        finish.classList.add('flag_img');

        const roadLine = document.createElement('div');
        roadLine.classList.add('car_road_top');
        roadLine.append(driving);
        roadLine.append(car);
        roadLine.append(finish);

        const crossLine = document.createElement('hr');

        const road = document.createElement('div');
        road.classList.add('car_road');
        road.append(roadLine);
        road.append(crossLine);


        const CAR_CARD_HTML = document.createElement('div');
        CAR_CARD_HTML.className = 'car';
        CAR_CARD_HTML.id = `${newCarID}`;
        CAR_CARD_HTML.append(settings);
        CAR_CARD_HTML.append(road);

        const container: HTMLElement | null = document.querySelector('.car_section');
        if (container) container.append(CAR_CARD_HTML);
        
        Garage.carCount();
    }

    static carChanger(newCarName: string, newCarColor: string, carID: number) {
        const changingCarName = document.getElementById(`${carID}-name`);
        if (changingCarName) changingCarName.innerHTML = newCarName;
        const changingCarPicture = document.getElementById(`${carID}-pic`);
        if (changingCarPicture) changingCarPicture.innerHTML = `<svg class="car_img" id="${carID}-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                            <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${newCarColor}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                                        </svg>`;
        const carPreview = document.querySelector('.car_preview');
        if (carPreview) carPreview.remove();
    }

    static changeCar = async () => {
        let newCarColor: string, newCarName: string, id: number;
        const INPUT_CHANGE_CAR = document.querySelector('.change_input');
        const COLOR_CHANGE_CAR = document.querySelector('.change_color');
        const BTN_CHANGE_CAR = document.querySelector('.update_btn');
        const carToChange = document.querySelector('.active');
        if (carToChange && INPUT_CHANGE_CAR instanceof HTMLInputElement && COLOR_CHANGE_CAR instanceof HTMLInputElement) {
            newCarName = INPUT_CHANGE_CAR.value;
            newCarColor = COLOR_CHANGE_CAR.value;
            id = +carToChange.id.replace('-select', '');
            await Server.updateCar(id, {name: newCarName, color: newCarColor, }); 
            Garage.carChanger(newCarName, newCarColor, id);
            if (BTN_CHANGE_CAR instanceof HTMLButtonElement) BTN_CHANGE_CAR.disabled = true;
            const SELECTED_BTN = document.getElementById(`${id}-select`);
            if (SELECTED_BTN) SELECTED_BTN.classList.remove('active');
            if (INPUT_CHANGE_CAR instanceof HTMLInputElement) INPUT_CHANGE_CAR.value = '';
            Winners.render();
        }  
    }

    static updateCarFunc = async (id: number) => {
        const SELECTED_BTN = document.getElementById(`${id}-select`);
        const INPUT_CHANGE_CAR = document.querySelector('.change_input');
        const COLOR_CHANGE_CAR = document.querySelector('.change_color');
        const BTN_CHANGE_CAR = document.querySelector('.update_btn');
        const car = await Server.getCar(id);
        if (COLOR_CHANGE_CAR instanceof HTMLInputElement) {
            COLOR_CHANGE_CAR.addEventListener('change', () => preview(id, COLOR_CHANGE_CAR.value));
        }
        if (SELECTED_BTN) {
            if (document.getElementsByClassName('active').length > 0) {
                if (SELECTED_BTN.classList.contains('active')) {
                    SELECTED_BTN.classList.remove('active');
                    if (BTN_CHANGE_CAR instanceof HTMLButtonElement) BTN_CHANGE_CAR.disabled = true;
                    if (INPUT_CHANGE_CAR instanceof HTMLInputElement) INPUT_CHANGE_CAR.value = '';
                } else {
                    const active = document.querySelector('.active');
                    if (active) active.classList.remove('active');
                    SELECTED_BTN.classList.add('active');
                    if (BTN_CHANGE_CAR instanceof HTMLButtonElement) BTN_CHANGE_CAR.disabled = false;
                    if (INPUT_CHANGE_CAR instanceof HTMLInputElement) INPUT_CHANGE_CAR.value = car.name; 
                    if (COLOR_CHANGE_CAR instanceof HTMLInputElement) COLOR_CHANGE_CAR.value = car.color;
                }
            } else {
                SELECTED_BTN.classList.add('active');
                if (BTN_CHANGE_CAR instanceof HTMLButtonElement) BTN_CHANGE_CAR.disabled = false;
                if (INPUT_CHANGE_CAR instanceof HTMLInputElement) INPUT_CHANGE_CAR.value = car.name; 
                if (COLOR_CHANGE_CAR instanceof HTMLInputElement) COLOR_CHANGE_CAR.value = car.color;
            }
        }
        const carPreview = document.querySelector('.car_preview');
        if (carPreview) carPreview.remove();
    }

    static deleteCarFunc = async (id: number) => {
        const garage = await Server.deleteCar(id);
        if (garage) {
            const delCar: HTMLElement | null = document.getElementById(`${id}`);
            if (delCar) delCar.remove();
            const count = document.querySelectorAll('.car').length;
            if (count === 0) {
                Pagination.garagePrev();
            }
        }
        const winner = await Server.deleteWinner(id);
        if (winner) {
            const delWinner: HTMLElement | null = document.querySelector(`.winner_row_${id}`);
            if (delWinner) delWinner.remove();
            Winners.render();
        }
    }

    static createNewCar = async () => {
        const INPUT_CREATE_CAR: HTMLElement | null = document.querySelector('.create_input');
        const COLOR_CREATE_CAR: HTMLElement | null = document.querySelector('.create_color');
        let newCarName;
        if (INPUT_CREATE_CAR instanceof HTMLInputElement) {
            if (INPUT_CREATE_CAR.value == '') {
                newCarName = carBrand[Math.floor(Math.random()*107)] + ' ' + carModal[Math.floor(Math.random()*58)]; 
            } else newCarName = INPUT_CREATE_CAR.value;
        }
        if (COLOR_CREATE_CAR instanceof HTMLInputElement) {
            const newCarColor = COLOR_CREATE_CAR.value;
            if (newCarName) await Server.createCar({name: newCarName, color: newCarColor, });
        }
        Garage.render();
        if (INPUT_CREATE_CAR instanceof HTMLInputElement) INPUT_CREATE_CAR.value = '';  
        Garage.carCount();
    }

    static generator = async () => {
        for (let i = 0; i < 100; i++) {
            const newCarName = carBrand[Math.floor(Math.random()*107)] + ' ' + carModal[Math.floor(Math.random()*58)]; 
            const newCarColor = `#${Math.floor(Math.random()*256).toString(16)}${Math.floor(Math.random()*256).toString(16)}${Math.floor(Math.random()*256).toString(16)}`;
            await Server.createCar({name: newCarName, color: newCarColor, });
        }
        Garage.render();
        Garage.carCount();
    }

    static moveCar = async function (id: number) {
        const carPreview = document.querySelector('.car_preview');
        if (carPreview) carPreview.remove();
        const WINDOW_WIDTH = document.documentElement.clientWidth;

        const driveBTN = document.getElementById(`${id}-start`);
        if (driveBTN instanceof HTMLButtonElement) driveBTN.disabled = true;
        const toStartBTN = document.getElementById(`${id}-to-start`);
        if (toStartBTN instanceof HTMLButtonElement) toStartBTN.disabled = false;
    
        const car: carDrive = await Server.engineStart(id);
        const time = car.distance / car.velocity ;
        const carToMove = document.getElementById(`${id}-pic`);
        let success: boolean;
    
        let start: number | null = null;
        const state: carData = {name: '', color: '', id: 0};
        function step(timestamp: number) {
            if (!start) start = timestamp;
            const progress = timestamp - start; 
            const dist = WINDOW_WIDTH - 215;
            const passed = Math.round(progress * (dist / time))
            if (carToMove) carToMove.style.transform = 'rotate(90deg) translateY(-' + Math.min(passed, dist) + 'px)';
            if (passed < dist) {
                state.id = window.requestAnimationFrame(step);
            }
        }
        state.id = window.requestAnimationFrame(step);
    
        try {
            success = await Server.switchEnginetoDrive(id);
        } catch {
            carStatus(id, 'broken');
            success = false;
            window.cancelAnimationFrame(+state.id);
        } 
        
        return {time, success};
    }

    static race = async function () {
        await Garage.reset();
        const cars = document.querySelectorAll('.car');
        const carsID = [];
        let winnerInfo;
        for (const car of cars) {
            carsID.push(car.id);
        }
        const promises: Promise<unknown>[] = [];
        carsID.map(async (el) => {
            const prom = new Promise(async (resolve, reject) => {
                const {time, success} = await Garage.moveCar(+el);
                if (success) {
                    resolve({wins: 0, time: time, id: +el,});
                } else reject();
            });
            promises.push(prom);
        });
        const result = await Promise.any(promises) as winnerData;
        console.log('result' + result.id + result.time);
        if (result) {
            Garage.raceWinner = result;
            if (Garage.raceWinner.id) {
                carStatus(Garage.raceWinner.id, 'winner');
                winnerInfo = await Server.getCar(Garage.raceWinner.id);
                const winnerTime = Math.floor(Garage.raceWinner.time / 10) / 100;
                Popup.renderPopup(winnerInfo.name, winnerTime, 3000);
                Winners.addWin(Garage.raceWinner.id, winnerTime);
            }
        } else console.log('no winner');
        Winners.render();
    }

    static moveToStart = async function (id: number) {
        
        return new Promise(async (resolve, reject) => {
            const stat = document.querySelectorAll('.car_status');
            stat.forEach((el) => el.remove());
            const driveBTN = document.getElementById(`${id}-start`);
            if (driveBTN instanceof HTMLButtonElement) driveBTN.disabled = false;
            const toStartBTN = document.getElementById(`${id}-to-start`);
            if (toStartBTN instanceof HTMLButtonElement) toStartBTN.disabled = true;
            await Server.engineStop(id);
            const carToMove = document.getElementById(`${id}-pic`);
            if (carToMove) carToMove.style.transform = 'rotate(90deg) translateY(0px)';
            resolve(true);
        });
    }

    static reset = async function () {
        const promises: Promise<unknown>[] = [];
        const cars = document.querySelectorAll('.car');
        cars.forEach(async (el) => {
            promises.push(Garage.moveToStart(+el.id));
        });
        await Promise.all(promises);
    }

    static render = async () => {
        document.querySelectorAll('.car').forEach(el => el.remove());
        try {
            const cars: carData[] = await Server.getCars([{key: '_page', value: `${Pagination.currentPageG}`}, {key: '_limit', value: `${Garage.carsOnPage}`}]); 
            cars.forEach(el => {
                if (el.id) Garage.carCreator(el.name, el.color, el.id);
            });
        } catch {
            const container = document.querySelector('.car_section');
            container?.append('Failed to load resource. Start server https://github.com/mikhama/async-race-api and refresh page');
        }
        Pagination.btnDesabling();
    }
} 

export default Garage;
