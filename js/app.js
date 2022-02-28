// 1. button event handeller setup
// 2. get input value
// eror handelling for string value...
const main = document.getElementById('main');
const main2 = document.getElementById('main2');

const searchBtn = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = parseInt(inputField.value);
    if(isNaN(inputFieldValue) || inputFieldValue =='' || inputFieldValue<0){//is NaN check number or string or others true

        const error = document.getElementById('eror')
        error.innerText = 'please give a postive number';
        inputField.value = '';
        main.innerHTML = ''; // ekhane innerhtml sorai dece
    }
    else{
        // load api
        main.innerHTML = '';
        fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=${inputFieldValue}`)//search korle koita value asbe ta ber korar jnne dynamic vbe use kora hoi
        .then(res => res.json())
        .then(data => cardDisplay(data.cards))

        inputField.value = '';
        const error2 = document.getElementById('eror')
        error2.innerHTML= '';
    }
}

const cardDisplay = (cards) => {
    // console.log(cards);
    
    for(const card of  cards){
        console.log(card);

        const div = document.createElement('div');
        div.classList.add('col-lg-4');
        div.classList.add('mb-5')
        div.innerHTML = `
                
            <div class="card" style="width: 18rem;">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">${card.code}</p>
            <p class="card-text">${card.suit}</p>
            <button onclick ="cardDetails('${card.code}')" class="btn btn-primary">see details</button>
            </div>
            </div>

            `

            main.appendChild(div)


    }
}


const cardDetails = (code) =>{
    fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)//search korle koita value asbe ta ber korar jnne dynamic vbe use kora hoi
    .then(res => res.json())
    .then(data => {
        const allCards = data.cards;
        const singleCard = allCards.find(card => card.code === code)
        const div = document.createElement('div');
        main.innerHTML  ="";
        div.innerHTML = ` 
        <div class="card" style="width: 18rem;">
        <img src="${singleCard.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">${singleCard.code}</p>
        <p class="card-text">${singleCard.suit}</p>
        </div>
        </div>
        `;

        main2.appendChild(div);
    })
}
