import Garage from "./garage";

const BTN_CREATE_CAR = document.querySelector('.create_btn');
if (BTN_CREATE_CAR) BTN_CREATE_CAR.addEventListener('click', Garage.createNewCar);

const GENERATE_BTN = document.querySelector('.generate_btn');
if (GENERATE_BTN) GENERATE_BTN.addEventListener('click', Garage.generator);

const BTN_CHANGE_CAR = document.querySelector('.update_btn');
if (BTN_CHANGE_CAR) BTN_CHANGE_CAR.addEventListener('click', Garage.changeCar);

const RACE_BTN = document.querySelector('.race_btn');
if (RACE_BTN) RACE_BTN.addEventListener('click', Garage.race);

const RESET_BTN = document.querySelector('.reset_btn');
if(RESET_BTN) RESET_BTN.addEventListener('click', Garage.reset);