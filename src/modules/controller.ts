import Garage from "./garage";

const listener = function(): void {
    const BTN_CREATE_CAR: HTMLElement | null = document.querySelector('.create_btn');
    if (BTN_CREATE_CAR) BTN_CREATE_CAR.addEventListener('click', Garage.createNewCar);

    const GENERATE_BTN: HTMLElement | null = document.querySelector('.generate_btn');
    if (GENERATE_BTN) GENERATE_BTN.addEventListener('click', Garage.generator);

    const BTN_CHANGE_CAR: HTMLElement | null = document.querySelector('.update_btn');
    if (BTN_CHANGE_CAR) BTN_CHANGE_CAR.addEventListener('click', Garage.changeCar);

    const RACE_BTN: HTMLElement | null = document.querySelector('.race_btn');
    if (RACE_BTN) RACE_BTN.addEventListener('click', Garage.race);

    const RESET_BTN: HTMLElement | null = document.querySelector('.reset_btn');
    if(RESET_BTN) RESET_BTN.addEventListener('click', Garage.reset);
}

export const preview = function (id: number, color: string) {
    const preview = document.querySelector('.car_preview');
    if (preview) preview.remove();
    const carPic = document.getElementById(`${id}-pic`)?.parentNode;
    const picture = document.createElement('div');
    picture.classList.add('car_preview');
    picture.innerHTML = `
                <svg class="car_img" id="${id}-pic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                    <g><g transform="translate(0.0,511.0) scale(0.10,-0.10)" fill="${color}"><path d="M4053.6,4997.9c-692.3-121.3-1214.4-637.5-1333.7-1320c-23.5-136.9-29.3-350.1-29.3-1026.7v-856.6l-119.3-41.1c-326.6-109.5-582.8-400.9-655.1-743.1c-45-217.1-84.1-197.5,373.5-197.5h398.9l5.9-2125.7c5.9-2104.2,7.8-2129.7,48.9-2274.4c166.2-584.7,569.1-989.5,1149.9-1157.7c154.5-45,172.1-45,1104.9-45c921.1,0,952.4,1.9,1099.1,43c592.6,172.1,1003.2,590.6,1163.6,1183.2c31.3,111.5,33.2,324.6,39.1,2250.9l7.8,2125.7h400.9h400.9l-11.7,93.9c-56.7,408.7-307,723.6-672.7,846.8l-119.3,41.1v837c0,483-9.8,903.5-21.5,991.5c-86.1,635.6-531.9,1146-1171.4,1337.6c-142.8,43-176,45-1056,48.9C4556.2,5011.6,4104.5,5005.7,4053.6,4997.9z M5659.2,2367.6c385.3-54.7,756.8-160.4,1011.1-287.5c64.5-33.2,121.3-62.6,125.2-66.5c2-2-84.1-275.8-193.6-604.3l-199.5-600.4l-72.3,11.7c-645.4,107.6-2018.2,107.6-2663.6,0l-72.4-11.7l-199.5,600.4c-109.5,328.5-195.6,602.3-193.6,604.3c3.9,3.9,60.6,33.3,125.2,66.5c330.5,164.3,794,275.8,1359.2,324.6C4853.5,2420.4,5459.7,2396.9,5659.2,2367.6z M4147.5-1956.3c555.4-50.8,1451.1-37.1,2014.3,31.3c86.1,11.7,174.1,19.6,197.5,19.6c39.1,0,62.6-54.8,234.7-571c103.7-314.9,193.6-584.7,199.5-598.4c11.7-33.3-310.9-183.8-531.9-248.4c-416.5-119.3-770.5-166.2-1263.3-166.2c-492.8,0-846.8,46.9-1263.3,166.2c-221,64.5-543.7,215.1-531.9,248.4c5.9,13.7,95.8,283.6,201.4,600.4l191.6,575l119.3-13.7C3779.8-1921.1,3975.4-1940.7,4147.5-1956.3z"/></g></g>
                </svg>`;
    if (carPic) carPic.append(picture);
}

export const carStatus = function (id: number, status: string) {
    const carPic = document.getElementById(`${id}-pic`)?.parentNode;
    const picture = document.createElement('div');
    picture.classList.add('car_status');
    if (status === 'broken') {
        picture.innerHTML = "Car's engine was broken down";
    } else if (status === 'winner') {
        picture.innerHTML = "¡ WINNER !";
    } else picture.innerHTML = `Time: ${status} sec.`;
    if (carPic) carPic.append(picture);
}

export default listener;