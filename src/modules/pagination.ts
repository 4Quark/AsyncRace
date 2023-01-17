import Garage from "./garage";
import Server from "./server";
import Winners from "./winners";

// если на странице нет машин, перерисовать

const PAGE_NUMBER_GARAGE: HTMLElement | null = document.querySelector('.garage_page');
const PAGE_PREVIOUS_GARAGE: HTMLElement | null = document.querySelector('.garage_page_prev');
const PAGE_NEXT_GARAGE: HTMLElement | null = document.querySelector('.garage_page_next');
const PAGE_CURRENT_GARAGE: HTMLElement | null = document.querySelector('.garage_page_current');

const PAGE_NUMBER_WINNERS: HTMLElement | null  = document.querySelector('.winners_page');
const PAGE_PREVIOUS_WINNERS: HTMLElement | null  = document.querySelector('.winners_page_prev');
const PAGE_NEXT_WINNERS: HTMLElement | null  = document.querySelector('.winners_page_next');
const PAGE_CURRENT_WINNERS: HTMLElement | null  = document.querySelector('.winners_page_current');

class Pagination {
    static currentPageG = 1;
    static currentPageW = 1;

    static garageNext() {
        Pagination.currentPageG += 1;
        Garage.render();
        if (PAGE_NUMBER_GARAGE) PAGE_NUMBER_GARAGE.innerHTML = 'Page #' + Pagination.currentPageG;
        if (PAGE_CURRENT_GARAGE) PAGE_CURRENT_GARAGE.innerHTML = `${Pagination.currentPageG}`;
        Pagination.btnDesabling();
    }

    static garagePrev() {
        Pagination.currentPageG -= 1;
        Garage.render();
        if (PAGE_NUMBER_GARAGE) PAGE_NUMBER_GARAGE.innerHTML = 'Page #' + Pagination.currentPageG;
        if (PAGE_CURRENT_GARAGE) PAGE_CURRENT_GARAGE.innerHTML = `${Pagination.currentPageG}`;
        Pagination.btnDesabling();
    }

    static async btnDesabling () {
        Garage.totalCarCount = await Server.getTotalCountCars();
    
        if (PAGE_PREVIOUS_GARAGE instanceof HTMLButtonElement) {
            if (Pagination.currentPageG == 1) {
                PAGE_PREVIOUS_GARAGE.disabled = true;
            } else PAGE_PREVIOUS_GARAGE.disabled = false;
        }
    
        if (PAGE_NEXT_GARAGE instanceof HTMLButtonElement) {
            if ((Garage.totalCarCount < 7) || (Pagination.currentPageG == Math.ceil(Garage.totalCarCount / 7))) {
                PAGE_NEXT_GARAGE.disabled = true;
            } else PAGE_NEXT_GARAGE.disabled = false;
        }
    }

    static winnersNext() {
        Pagination.currentPageW += 1;
        Winners.render();
        if (PAGE_NUMBER_WINNERS) PAGE_NUMBER_WINNERS.innerHTML = 'Page #' + Pagination.currentPageW;
        if (PAGE_CURRENT_WINNERS) PAGE_CURRENT_WINNERS.innerHTML = `${Pagination.currentPageW}`;
        Pagination.btnWinnersDesabling();
    }

    static winnersPrev() {
        Pagination.currentPageW -= 1;
        Winners.render();
        if (PAGE_NUMBER_WINNERS) PAGE_NUMBER_WINNERS.innerHTML = 'Page #' + Pagination.currentPageW;
        if (PAGE_CURRENT_WINNERS) PAGE_CURRENT_WINNERS.innerHTML = `${Pagination.currentPageW}`;
        Pagination.btnWinnersDesabling();
    }

    static async btnWinnersDesabling () {
        Winners.totalWinnersCount = await Server.getTotalCountWinners();
        if (PAGE_PREVIOUS_WINNERS instanceof HTMLButtonElement) {
            if (Pagination.currentPageW == 1) {
                PAGE_PREVIOUS_WINNERS.disabled = true;
            } else PAGE_PREVIOUS_WINNERS.disabled = false;
        }
        if (PAGE_NEXT_WINNERS instanceof HTMLButtonElement) {
            if ((Winners.totalWinnersCount < 7) || (Pagination.currentPageW == Math.ceil(Winners.totalWinnersCount / 10))) {
                PAGE_NEXT_WINNERS.disabled = true;
            } else PAGE_NEXT_WINNERS.disabled = false;
        }
    }
}

if (PAGE_PREVIOUS_GARAGE) PAGE_PREVIOUS_GARAGE.addEventListener('click', Pagination.garagePrev);
if (PAGE_NEXT_GARAGE) PAGE_NEXT_GARAGE.addEventListener('click', Pagination.garageNext);

if (PAGE_PREVIOUS_WINNERS) PAGE_PREVIOUS_WINNERS.addEventListener('click', Pagination.winnersPrev);
if (PAGE_NEXT_WINNERS) PAGE_NEXT_WINNERS.addEventListener('click', Pagination.winnersNext);


export default Pagination;