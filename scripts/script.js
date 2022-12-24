const anser = document.querySelector('.answer');

const latitudeInput = document.querySelector('.latitude__input');
const longitudeInput = document.querySelector('.longitude__input');

const getGeoButton = document.querySelector('.getGeoButton');
const otherInfo = document.querySelector('.otherInfo');

const countryInfoBlock = document.querySelector('.countryInfoBlock');

getGeoButton.addEventListener('click', () => {
    getLocation(latitudeInput.value, longitudeInput.value);
    latitudeInput.value = '';
    longitudeInput.value = '';
})

const getLocation = function(latitude, longitude) {
    fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=281325638923530529014x46757`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Что-то пошло не так, код ошибки: ${response.status}`)
        }
        return response.json();
    })
    .then(data => {
        if(data.country === undefined) throw new Error('Ошибка запроса, проверте данные для ввода!')
        anser.innerHTML = `По твоему запросу: город: ${data.city} страна: ${data.country}`;
        otherInfo.classList.add('active');
        return fetch(`https://restcountries.com/v2/name/${data.country.toLowerCase()}`)
    })
    .then(response => response.json())
    .then(data => {
        countryInfoBlock.innerHTML = '';
        countryInfoBlock.insertAdjacentHTML('beforeend', 
        `<img src="${data[0].flags.png}" alt="" class="countryFlag">
        <div class="coutryInfo">
            <div class="coutryInfoText">
                <div class="region">Регион: ${data[0].region}</div>
                <div class="population">Насиление: ${Math.round(data[0].population / 1000000)} млн</div>
                <div class="language">Язык: ${data[0].languages[0].name}</div>
            </div>
        </div>`)
    })
    .catch(e => {
        console.error(e);
        anser.innerHTML = e.message;
    });
}

otherInfo.addEventListener('click', () => {
    countryInfoBlock.classList.toggle('active')
});