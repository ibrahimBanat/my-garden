'use strict';

// getting DOM elemetnts
const from = document.getElementById('form');
const table = document.getElementById('table');
const removeLs = document.getElementById('clear');

const Flower = function (name, imageName, season) {
  this.name = name;
  this.imageName = imageName;
  this.path = `./assets/${imageName.toLowerCase()}.jpeg`;
  this.season = season;
  Flower.all.push(this);
};

Flower.all = [];

if (localStorage.flower) {
  Flower.all = JSON.parse(localStorage.getItem('flower'));
}

Flower.prototype.addToLocalStorage = function () {
  localStorage.setItem('flower', JSON.stringify(Flower.all));
};

// rendering function

const tableHeadRender = function () {
  let tableHead = document.createElement('thead');
  let tableHeadRow = document.createElement('tr');

  let tableHeadRowC1 = document.createElement('th');

  tableHeadRowC1.textContent = '#';
  tableHeadRow.appendChild(tableHeadRowC1);

  let tableHeadRowC2 = document.createElement('th');
  tableHeadRowC2.textContent = 'Image';

  tableHeadRow.appendChild(tableHeadRowC2);

  let tableHeadRowName = document.createElement('th');
  tableHeadRowName.textContent = 'Name';
  tableHeadRow.appendChild(tableHeadRowName);

  let tableHeadRowC3 = document.createElement('th');
  tableHeadRowC3.textContent = 'Season';
  tableHeadRow.appendChild(tableHeadRowC3);

  tableHead.appendChild(tableHeadRow);
  table.appendChild(tableHead);
};

const renderData = function () {
  // table
  table.innerHTML = '';
  tableHeadRender();
  let tableBody = document.createElement('tbody');

  for (let index = 0; index < Flower.all.length; index++) {
    let remove = document.createElement('span');
    remove.textContent = 'X';
    remove.setAttribute('id', `${index}`);
    remove.setAttribute('class', 'remove');

    let imageCell = document.createElement('td');
    imageCell.innerHTML = `<img src="${Flower.all[index].path}" alt="">`;

    let nameCell = document.createElement('td');
    nameCell.textContent = `${Flower.all[index].name}`;

    let seasonCell = document.createElement('td');
    seasonCell.textContent = `${Flower.all[index].season}`;

    let tableRow = document.createElement('tr');

    tableRow.appendChild(remove);
    tableRow.appendChild(imageCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(seasonCell);
    tableBody.appendChild(tableRow);
  }
  table.appendChild(tableBody);
};
renderData();

// event lsitners functions
const handleSubmission = function (event) {
  event.preventDefault();
  let flowerName = event.target.name.value;
  let flowerType = event.target.type.value;
  let flowerSeason = event.target.season.value;

  let flower = new Flower(flowerName, flowerType, flowerSeason);
  flower.addToLocalStorage();
  renderData();
  from.reset();
};

const handleRemove = function (event) {
  if (event.target.matches('.remove')) {
    Flower.all.splice(event.target.id, 1);

    localStorage.setItem('flower', JSON.stringify(Flower.all));
    Flower.all = JSON.parse(localStorage.getItem('flower'));
    renderData();
  }
};

const handleRemoveLs = function () {
  localStorage.removeItem('flower');
  Flower.all = [];
  renderData();
};

// event listner
from.addEventListener('submit', handleSubmission);
table.addEventListener('click', handleRemove);
removeLs.addEventListener('click', handleRemoveLs);
