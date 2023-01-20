import Garage from "../garage";
import Main from "../view/main";
import Server from "../server";
import Winners from "../winners";

class Pagination {
    static currentPageG = 1;
    static currentPageW = 1;

    static garageNext() {
        Pagination.currentPageG += 1;
        Garage.render();
        Main.headerGarage.innerHTML = 'Page ' + Pagination.currentPageG;
        Main.currentGarage.innerHTML = `${Pagination.currentPageG}`;
        Pagination.btnDesabling();
    }

    static garagePrev() {
        Pagination.currentPageG -= 1;
        Garage.render();
        Main.headerGarage.innerHTML = 'Page ' + Pagination.currentPageG;
        Main.currentGarage.innerHTML = `${Pagination.currentPageG}`;
        Pagination.btnDesabling();
    }

    static async btnDesabling () {
        Garage.totalCarCount = await Server.getTotalCountCars();
    
        if (Pagination.currentPageG == 1) {
            Main.previousGarage.disabled = true;
        } else Main.previousGarage.disabled = false;
    
        if ((Garage.totalCarCount < 7) || (Pagination.currentPageG == Math.ceil(Garage.totalCarCount / 7))) {
            Main.nextGarage.disabled = true;
        } else Main.nextGarage.disabled = false;
    }

    static winnersNext() {
        Pagination.currentPageW += 1;
        Winners.render();
        Main.headerWinners.innerHTML = 'Page ' + Pagination.currentPageW;
        Main.currentWinners.innerHTML = `${Pagination.currentPageW}`;
        Pagination.btnWinnersDesabling();
    }

    static winnersPrev() {
        Pagination.currentPageW -= 1;
        Winners.render();
        Main.headerWinners.innerHTML = 'Page ' + Pagination.currentPageW;
        Main.currentWinners.innerHTML = `${Pagination.currentPageW}`;
        Pagination.btnWinnersDesabling();
    }

    static async btnWinnersDesabling () {
        Winners.totalWinnersCount = await Server.getTotalCountWinners();
        if (Pagination.currentPageW == 1) {
            Main.previousWinners.disabled = true;
        } else Main.previousWinners.disabled = false;

        if ((Winners.totalWinnersCount < 7) || (Pagination.currentPageW == Math.ceil(Winners.totalWinnersCount / 10))) {
            Main.nextWinners.disabled = true;
        } else Main.nextWinners.disabled = false;
        
    }
}

export default Pagination;
