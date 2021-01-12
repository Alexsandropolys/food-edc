function menu() {
  class MenuItem {
    constructor(name, price, content, img, alt, parentElement, ...classes) {
      this.name = name;
      this.price = price;
      this.content = content;
      this.img = img;
      this.alt = alt;
      this.parentElement = parentElement;
      this.classes = classes;
    }

    getShown() {
      const element = document.createElement('div');

      element.innerHTML = `
            <div class="menu__item">
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">Меню ${this.name}</h3>
            <div class="menu__item-descr">${this.content}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> $/день</div>
            </div>
            </div>
            `;
      this.parentElement.append(element);
      const elementInnerDiv = element.children[0];
      this.classes.forEach((c) => {
        elementInnerDiv.classList.add(c);
      });
    }
  }

  const menuHoleder = document.querySelector('[data-menuHolder]');

  axios.get('http://localhost:3000/menu')
    .then((res) => {
      res.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price,
      }) => {
        new MenuItem(title, price, descr, img, altimg, menuHoleder).getShown();
      });
    });
}

export default menu;
