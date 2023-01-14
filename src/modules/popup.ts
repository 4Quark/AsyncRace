class Popup {
    static renderPopup(carName: string, time: number, delay: number) {
      const textField = document.createElement('div');
      textField.classList.add('popup_text');
      textField.innerText = `${carName} finished in ${time} sec.`;

      const header = document.createElement('h3');
      header.innerText = 'Winner';
  
      const close = document.createElement('div');
      close.classList.add('close');
      close.addEventListener('click', Popup.removePopup);
  
      const modalWindow = document.createElement('div');
      modalWindow.classList.add('modal_window');
      modalWindow.append(close);
      modalWindow.append(header);
      modalWindow.append(textField);
  
      const modalWrapper = document.createElement('div');
      modalWrapper.classList.add('modal_wrapper');
      modalWrapper.append(modalWindow);
  
      const popup = document.createElement('div');
      popup.classList.add('popup');
      popup.append(modalWrapper);
  
      document.body.append(popup);
  
      window.onclick = function (event) {
        if (event.target == popup) Popup.removePopup;
      };
  
      setTimeout(Popup.removePopup, delay);
    }
  
    static removePopup() {
      const popup: HTMLElement | null = document.querySelector('.popup');
      if (popup) popup.remove();
    }
  }
  
  export default Popup;
  