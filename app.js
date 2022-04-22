const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");


let updatedData = [];

getRandomUser();
getRandomUser();
getRandomUser();


// functions

// Fetch the Data
async function getRandomUser(){
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    }

     addData(newUser);
}


// doubleMoney
 function doubleMoney() {
    updatedData = updatedData.map(item => {
        return {...item, money: item.money*2};
    });

    updateDOM();
 }


//sortByRichest

function sortByRichest(){
    updatedData.sort((a,b)=>b.money-a.money);

    updateDOM();
}


//showMillionairesBtn

function showMillionaires(){

    updatedData = updatedData.filter(item => item.money > 1000000);

    updateDOM();
}


//calculateWealth

function calculateWealth(){
    
const wealth = updatedData.reduce((acc, num)=> (acc+num.money), 0);

const wealthEl = document.createElement("div");
wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong>`;

main.appendChild(wealthEl);
}



// Add new obj to data array
function addData(obj) {
    updatedData.push(obj);

    updateDOM();
}

// Update DOM
function updateDOM(provideData = updatedData){
    //clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    provideData.forEach(item => {
        const element = document.createElement("div");
        element.classList.add("person");
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
            item.money)}`;

        main.appendChild(element);
        
    });
}

//Format number as money

function formatMoney(number){
     return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners

//addUserBtn
addUserBtn.addEventListener("click", getRandomUser);

//doubleMoney
doubleBtn.addEventListener("click", doubleMoney);

//Sort by Rich

sortBtn.addEventListener("click", sortByRichest);

//

showMillionairesBtn.addEventListener("click", showMillionaires);

//calculateWealth

calculateWealthBtn.addEventListener("click", calculateWealth)