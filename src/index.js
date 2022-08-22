import templCountryListMarkup from './templates/templCountryList.hbs';
import templCountryInfoMarkup from './templates/templCountryInfo.hbs';
import debounce from 'lodash.debounce';
import { fetchCountries } from '../src/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;
let textSearchField = 0;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

// Викликаємо прослуховувач для події input в полі inputField
refs.inputField.addEventListener(
  'input',
  debounce(onTextFieldInput, DEBOUNCE_DELAY)
);

// Функція отримання значення з поля вводу input
function onTextFieldInput(event) {
  textSearchField = event.target.value.trim();
  checkedTextField(textSearchField);
}

//функція перевірки значення данних в полі вводу
function checkedTextField(textSearchField) {
  console.log('textSearchField.length :>> ', textSearchField.length);
  if (textSearchField.length > 0) {
    fetchCountries(textSearchField).then(renderMarkup).catch(onFetchError);
  } else if (textSearchField.length === 0) {
    onClearMarkup();
  }
}

//  Функція виконання розмітки
function renderMarkup(fetchCountry) {
  const sizeArray = fetchCountry.length;

  if (sizeArray > 10) {
    onClearMarkup();
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (sizeArray > 1 && sizeArray < 10) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = templCountryListMarkup(fetchCountry);
  } else if (sizeArray === 1) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = templCountryInfoMarkup(fetchCountry);
  }
}

//Функція обнулення розмітки з попереднього результату
function onClearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

//Функція видає попереджуюче сповіщення про помилку запиту
function onFetchError() {
  Notify.failure('Oops, there is no country with that name');
}
