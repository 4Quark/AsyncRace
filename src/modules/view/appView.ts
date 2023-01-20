import listener from "../controller";
import Footer from "./footer";
import Garage from "../garage";
import Header from "./header";
import Main from "./main";
import Winners from "../winners";

class AppView {
  private static container: HTMLElement = document.body;

  static changeView(view: string) {
    const GARAGE: HTMLElement | null = document.querySelector('.garage');
    const WINNERS: HTMLElement | null = document.querySelector('.winners');
    if (view === 'garage') {
      if (WINNERS) WINNERS.classList.add('invisible');
      if (GARAGE) GARAGE.classList.remove('invisible');
    }
    if (view === 'winners') {
      if (GARAGE) GARAGE.classList.add('invisible');
      if (WINNERS) WINNERS.classList.remove('invisible');
    }
  }

  public renderApp(): void {
    AppView.container.append(Header.render());
    AppView.container.append(Main.render());
    AppView.container.append(Footer.render());

    Garage.render();
    Winners.render();
    listener();
  }

}

export default AppView;
