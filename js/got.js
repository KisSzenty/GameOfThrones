const dataGOTChars = {
  fullData: [],
  liveData: [],
  deadData: [],
  init() {
    this.findAll();
  },
  findAll() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        this.setData(request.responseText);
      }
    };
    request.open('GET', '/json/got.json');
    request.send();
  },
  setData(userData) {
    this.fullData = Array.from(JSON.parse(userData));
    this.deadData = this.fullData.filter(aliveActors => aliveActors.dead === true)
      .sort((x, y) => {
        if (x.name === y.name) {
          return 0;
        } else if (x.name > y.name) {
          return 1;
        } return -1;
      });
    this.liveData = this.fullData.filter(aliveActors => aliveActors.dead !== true)
      .sort((x, y) => {
        if (x.name === y.name) {
          return 0;
        } else if (x.name > y.name) {
          return 1;
        } return -1;
      });
    this.objectsToView();
  },
  objectsToView() {
    let gotContents = '';
    this.liveData.forEach((element, i) => {
      gotContents += `<div class="main_container_divs">
      <img src="/${this.liveData[i].portrait}" alt="${this.liveData[i].name}">
      <div class="got_name" onclick="dataGOTChars.showDescription(${i})">${this.liveData[i].name}</div>
      </div>`;
      document.querySelector('.content--view').innerHTML = gotContents;
    });
  },
  showDescription(gotTargetIndex) {
    const createDescriptionDiv = `<div class="aside_Container">
  <div class="aside_container-picture"> <img src="/${this.liveData[gotTargetIndex].picture}"
  alt="${this.liveData[gotTargetIndex].name} picture">
  <div class="aside_container-name">${this.liveData[gotTargetIndex].name}${this.isLogoExist(gotTargetIndex)}</div>
  <div class"aside_container-description">${this.liveData[gotTargetIndex].bio}</div>
  </div>`;
    document.querySelector('.main_container-description').innerHTML = createDescriptionDiv;
  },
  isLogoExist(index) {
    if (this.liveData[index].house === undefined) {
      return '';
    }
    return `<img src="/assets/houses/${this.liveData[index].house}.png" alt="${this.liveData[index].name} house">`;
  },
  searchByName() {

    const inputValue = document.querySelector('.searchInput');
    for (let i = 0; i < this.liveData.length; i += 1) {
      if (this.liveData[i].name.toLowerCase() === inputValue.value.toLowerCase()) {
        inputValue.value = '';
        return this.showDescription(i);
      }
    }
    inputValue.value = '';
    return this.showNotFound();
  },
  showNotFound() {
    document.querySelector('.notFound').setAttribute('class', 'notFound');
    setTimeout(() => {
      document.querySelector('.notFound').setAttribute('class', 'notFound display--none');
    }, 5000);
  }
}
dataGOTChars.init();