import Pagination from "../components/pagination";
import Winners from "../winners";

class Main { 
    static previousGarage = document.createElement('button');
    static nextGarage = document.createElement('button');
    static currentGarage = document.createElement('a');
    static totalGarage = document.createElement('a');
    static headerGarage = document.createElement('h3');
    
    static previousWinners = document.createElement('button');
    static nextWinners = document.createElement('button');
    static currentWinners = document.createElement('a');
    static totalWinners = document.createElement('a');
    static headerWinners = document.createElement('h3');

    static garage() {
        const garageHeader = document.createElement('h2');
        garageHeader.classList.add('garage_and_count');
        garageHeader.innerText = 'Garage';

        Main.headerGarage.classList.add('garage_page');
        Main.headerGarage.innerText = 'Page 1';

        const garageHeaders = document.createElement('div');
        garageHeaders.classList.add('garage_headers');
        garageHeaders.append(garageHeader);
        garageHeaders.append(Main.headerGarage);

        const garageSettings = document.createElement('div');
        garageSettings.classList.add('garage_settings');
        garageSettings.innerHTML = `<div class="garage_settings_row create_set">
                                        <input type="text" class="create_input" placeholder="Type to create car...">
                                        <input type="color" class="create_color" value="#DDB6B6">
                                        <button class="regular_btn create_btn">Create</button>
                                    </div>
                                    <div class="garage_settings_row change_set">
                                        <input type="text" class="change_input" placeholder="Type to change car...">
                                        <input type="color" class="change_color" value="#525252">
                                        <button class="regular_btn update_btn" disabled>Update</button>
                                    </div>
                                    <div class="garage_settings_row">
                                        <button class="regular_btn race_btn">Race</button>
                                        <button class="regular_btn reset_btn">Reset</button>
                                        <button class="regular_btn generate_btn">Generate cars</button>
                                    </div>`;

        const header = document.createElement('div');
        header.classList.add('garage_header');
        header.append(garageHeaders);
        header.append(garageSettings);

        const cars = document.createElement('div');
        cars.classList.add('car_section');
        
        Main.currentGarage.classList.add('garage_page_current');
        Main.currentGarage.innerText = '1';

        Main.totalGarage.classList.add('garage_page_total');
        Main.totalGarage.innerText = '1';

        Main.nextGarage.classList.add('regular_btn');
        Main.nextGarage.classList.add(`pagination_btn`);
        Main.nextGarage.classList.add(`garage_page_next`);
        Main.nextGarage.innerText = `→`;
        Main.nextGarage.addEventListener('click', Pagination.garageNext);

        Main.previousGarage.classList.add('regular_btn');
        Main.previousGarage.classList.add(`pagination_btn`);
        Main.previousGarage.classList.add(`garage_page_prev`);
        Main.previousGarage.innerText = `←`;
        Main.previousGarage.addEventListener('click', Pagination.garagePrev);

        const pagination = document.createElement('div');
        pagination.classList.add('garage_pagination');
        pagination.append(Main.previousGarage);
        pagination.append(Main.currentGarage);
        pagination.append('/');
        pagination.append(Main.totalGarage);
        pagination.append(Main.nextGarage);

        const wrapper = document.createElement('div');
        wrapper.classList.add('garage_wrapper');
        wrapper.append(header);
        wrapper.append(cars);
        wrapper.append(pagination);

        const section = document.createElement('section');
        section.classList.add('garage');
        section.append(wrapper);
        return section;
    }

    static winners() {
        const winnersHeader = document.createElement('h2');
        winnersHeader.classList.add('winners_and_count');
        winnersHeader.innerText = 'Winners';

        Main.headerWinners.classList.add('winners_page');
        Main.headerWinners.innerText = 'Page 1';

        const colgroup = document.createElement('colgroup');
        colgroup.innerHTML = `<col style="width: 30px">
                              <col style="width: 60px">
                              <col style="width: 230px">
                              <col style="width: 55px">
                              <col style="width: 142px">`;

        const tNumber = document.createElement('th');
        tNumber.innerText = '#';

        const tCar = document.createElement('th');
        tCar.innerText = 'Car';

        const tName = document.createElement('th');
        tName.innerText = 'Name ⬍';
        tName.addEventListener('click', () => Winners.sortWinners('id'));

        const tWins = document.createElement('th');
        tWins.innerText = 'Wins ⬍';
        tWins.addEventListener('click', () => Winners.sortWinners('wins'));

        const tTime = document.createElement('th');
        tTime.innerText = 'Best time (sec.) ⬍';
        tTime.addEventListener('click', () => Winners.sortWinners('time'));
        
        const thead = document.createElement('tr');
        thead.classList.add('winners_table_head');
        thead.append(tNumber);
        thead.append(tCar);
        thead.append(tName);
        thead.append(tWins);
        thead.append(tTime);

        const tbody = document.createElement('tbody');
        tbody.classList.add('winners_body');
        
        const table = document.createElement('table');
        table.classList.add('winners_section');
        table.append(colgroup);
        table.append(thead);
        table.append(tbody);

        Main.currentWinners.classList.add('winners_page_current');
        Main.currentWinners.innerText = '1';

        Main.totalWinners.classList.add('winners_page_total');
        Main.totalWinners.innerText = '1';

        Main.nextWinners.classList.add('regular_btn');
        Main.nextWinners.classList.add(`pagination_btn`);
        Main.nextWinners.classList.add(`winners_page_next`);
        Main.nextWinners.innerText = `→`;
        Main.nextWinners.addEventListener('click', Pagination.winnersNext);

        Main.previousWinners.classList.add('regular_btn');
        Main.previousWinners.classList.add(`pagination_btn`);
        Main.previousWinners.classList.add(`winners_page_prev`);
        Main.previousWinners.innerText = `←`;
        Main.previousWinners.addEventListener('click', Pagination.winnersPrev);

        const pagination = document.createElement('div');
        pagination.classList.add('winners_pagination');
        pagination.append(Main.previousWinners);
        pagination.append(Main.currentWinners);
        pagination.append('/');
        pagination.append(Main.totalWinners);
        pagination.append(Main.nextWinners);
        
        const wrapper = document.createElement('div');
        wrapper.classList.add('winners_wrapper');
        wrapper.append(winnersHeader);
        wrapper.append(Main.headerWinners);
        wrapper.append(table);
        wrapper.append(pagination);

        const section = document.createElement('section');
        section.classList.add('winners');
        section.classList.add('invisible');
        section.append(wrapper);
        return section;
    } 

    static render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.append(Main.garage());
        wrapper.append(Main.winners());

        const main = document.createElement('main');
        main.append(wrapper);
        return main;
    }
}

export default Main;
