//Vill börja med attv säga att jag har försökt så gott jag kan och just nu känns JS lite bättre än vad den gjorde för en vecka sen. Jag börjar förstå hur man ska tänka men fortfraande svårt att finna rätt var när hur. Har kollat på mina lektioner och googlat endel så ursäkta att den inte är så kommenterad, jag har verkligen haft hjärngympa 5.0 dessa veckor <3

//----------------------Formulär------------------
//mina variabler
const aliasInput = document.querySelector('#aliasName');
const sendBtn = document.querySelector('#sendBtn');
const displayUsername = document.querySelector('#displayUsername');
const textInput = document.querySelector('#resultElement');
let getValueLength = 0;
let savedValue = ''; // Variabel för att spara värdet på inputfältet

//För att text ska komma fram när man skriver i formuläret
aliasInput.addEventListener('keyup', () => {
    getValueLength = aliasInput.value.length;
    if (getValueLength > 3) {
        sendBtn.disabled = false;
        displayUsername.innerHTML = `Välkommen! ${aliasInput.value}`;
    } else {
        sendBtn.disabled = true;
        displayUsername.innerHTML = `Det måste vara fler än 3 tecken`;
    }
});

//fokusfunktioner så att man ska kunna hitta till input
aliasInput.addEventListener('focus', () => {
    aliasInput.classList.toggle('focusBorder');
});

aliasInput.addEventListener('blur', () => {
    aliasInput.classList.toggle('focusBorder');
});

//min skicka knapp, här ska det som skrivs in i input även skrivas ut på sidan och sparas där när sidan uppdateras och input rensas
sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (getValueLength >= 3) {
        savedValue = aliasInput.value; // Spara värdet på inputfältet
        aliasInput.value = ''; // Rensa inputfältet
        sendBtn.disabled = true;
        // textInput.textContent = `Välkommen! ${savedValue}`; // Visa sparade värdet på sidan
    } else {
        textInput.textContent = 'Det måste vara fler än 3 tecken';
    }
});

//------------------------------API-bilder--------------------

//min nyckel som jag gör en const av
const apiKey = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=zAxKPc5OQZvSjydwTK7hfER78AyEyTHDLYrHz4rA';


fetch(apiKey)
    .then(response => response.json())
    .then(data => {
    const photos = data.photos;
    const marsCards = document.querySelector('#opportunity');

    if (photos.length > 0) {
        //för att bara 4 foton ska visas och inte 900
        photos.slice(0, 4).forEach(photo => {
            //skapar kort som de kan ligga i
        const newCard = createCard(photo);
        marsCards.appendChild(newCard);
        });
    } else {
        //om det inte finns några bilder
        displayMessage('Ursäkta! Finns inga bilder att visa.');
    }
    })
    .catch(error => console.error('Error fetching data:', error));
// vill skapa upp nya kort där bilderna ska hamna
function createCard(photo) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const h4 = document.createElement('h4');
    const p = document.createElement('p');

    article.classList.add('card');

    img.src = photo.img_src;
    img.alt = 'Mars Rover Photo';

        //text till bilderna 
    h4.textContent = `Date: ${photo.earth_date}`;
    p.textContent = `Rover: ${photo.rover.name}`;

    article.appendChild(img);
    article.appendChild(h4);
    article.appendChild(p);

    return article;
}

function displayMessage(message) {
    const messageContainer = document.querySelector('#messageContainer');
    const messageElement = document.createElement('h3');

    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
}

//-----------------------------Darkmode---------------------------

const switchBtn = document.querySelector('#switchBtn');
const bodyRef = document.querySelector('body'); 
const darkModeKey = 'theme-dark';
const darkModeValue = 'active';

// Kontrollera om darkModeKey finns i localStorage vid sidans laddning
if (localStorage.getItem(darkModeKey) === darkModeValue) {
    bodyRef.classList.add('dark');
    switchBtn.checked = true;
}

// Lägg till lyssnare för klick på switchBtn
switchBtn.addEventListener('click', () => {
    if (bodyRef.classList.contains('dark')) {
        // Om body har klassen dark, ta bort den
        bodyRef.classList.remove('dark');
        switchBtn.checked = false;
        removeLocalStorage();
    } else {
        // Annars lägg till klassen dark
        bodyRef.classList.add('dark');
        switchBtn.checked = true;
        setLocalStorage();
    }
});

// Funktion för att sätta darkModeKey i localStorage
function setLocalStorage() {
    localStorage.setItem(darkModeKey, darkModeValue);
}

// Funktion för att ta bort darkModeKey från localStorage
function removeLocalStorage() {
    localStorage.removeItem(darkModeKey);
}
