import AppView from "./appView";

class Header {    
    private static defaultLogo = 'Async Race';

    private static pages: string[] = ['garage', 'winners'];

    private static renderButton(item: string) {
        const button = document.createElement('button');
        button.classList.add('header_btn');
        button.classList.add(`to_${item}_btn`);
        button.innerText = `to ${item}`;
        button.addEventListener('click', () => AppView.changeView(item));
        return button;
    }

    static render() {
        const logo = document.createElement('h1');
        logo.classList.add('logo');
        logo.innerText = Header.defaultLogo;
        logo.addEventListener('click', () => AppView.changeView('garage'));

        const btsContainer = document.createElement('section');
        btsContainer.classList.add('nav');
        Header.pages.forEach(el => btsContainer.append(Header.renderButton(el)));

        const headerContainer = document.createElement('section');
        headerContainer.classList.add('header_inner');
        headerContainer.append(logo);
        headerContainer.append(btsContainer);

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.append(headerContainer);

        const header = document.createElement('header');
        header.append(wrapper);

        return header;
    }
}

export default Header;
