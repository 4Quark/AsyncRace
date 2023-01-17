import listener from "./controller";
import Garage from "./garage";
import Server from "./server";
import Winners from "./winners";

// export const enum pageIDs {
//   GaragePage = 'garage-page',
//   WinnersPage = 'winners-page',
// }

/* -------------- CHANGE VIEW -------------- */

const BTN_TO_GARAGE: HTMLElement | null = document.querySelector('.to_garage_btn');
const GARAGE: HTMLElement | null = document.querySelector('.garage');
const BTN_TO_WINNERS: HTMLElement | null = document.querySelector('.to_winners_btn');
const WINNERS: HTMLElement | null = document.querySelector('.winners');
if (BTN_TO_GARAGE) BTN_TO_GARAGE.addEventListener('click', () => {
    if (WINNERS) WINNERS.classList.add('invisible');
    if (GARAGE) GARAGE.classList.remove('invisible');
});
if (BTN_TO_WINNERS) BTN_TO_WINNERS.addEventListener('click', () => {
    if (GARAGE) GARAGE.classList.add('invisible');
    if (WINNERS) WINNERS.classList.remove('invisible');
});



class AppView {
  private static container: HTMLElement = document.body;

  constructor() {}

  public renderApp(): void {
    Garage.render();
    Winners.render();
    listener();
  }

}

export default AppView;
