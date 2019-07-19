/* const el = document.querySelector("#module");
el.addEventListener("mousemove", (e) => {
  el.style.setProperty('--x', -e.offsetX + "px");
  el.style.setProperty('--y', -e.offsetY + "px");
}); */
const dataGOTChar = {
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
    this.fullData = JSON.parse(userData);
    console.log(this.fullData);
  },
};
dataGOTChar.init();