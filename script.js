

const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyminus = document.getElementById('money-minus');
const trans = document.getElementById('trans');
const form = document.getElementById('form');
const inputText = document.getElementById('text');
const inputAmount = document.getElementById('amount');


// const dummyData = [
//     {id:1,description:"Salary",amount:10000},
//     {id:2,description:"Petrol",amount:-250},
//     {id:3,description:"Book",amount:-500},
//     {id:4,description:"Recharge",amount:-666},
//     {id:5,description:"Bonus",amount:5000},
//     {id:6,description:"Food",amount:-150},
// ];

// let transactions = dummyData;

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans")!== null ? localStorageTrans : [];

function loadTransactionDetails(transaction){
    const sing = transaction.amount < 0 ? "-":"+";
    const item = document.createElement("li");
    item.classList.add(transaction.inputAmount< 0 ? "exp":"inc");
    item.innerHTML =`${transaction.inputText}
    <span>${sing} ${Math.abs(transaction.inputAmount)}</span>
    <button class="btn-del" onclick="removeTrans(${transaction.id})">x</button>
    `;
    trans.appendChild(item);
}
 
function removeTrans(id) {
    if(confirm("You want to delete this transaction?")){
        transactions = transactions.filter((transaction) => transaction.id != id);
        config();
        updateLocalStorage();
    }else{
        return;
    }
}

function updateAmount() {
    const amounts = transactions.map((transaction) => transaction.inputAmount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    balance.innerHTML = `₹ ${Number(total)}`;

    const income = amounts.filter((item) => item > 0).reduce((acc,item) => (acc += item),0);
    moneyPlus.textContent= `₹ ${income}`;

    const expense = amounts.filter((item) => item < 0).reduce((acc,item) => (acc += item),0);
    moneyminus.innerHTML = `₹ ${Math.abs(expense)}`;
}

function config() {
    trans.innerHTML = "";
    transactions.forEach(loadTransactionDetails);
    updateAmount();
}

function addTransaction(e) {
    e.preventDefault();
    if (inputText.value.trim() == ""||inputAmount.value.trim() == ""){
        alert("Plese Enter Description and Amount");
    }else{
        const transaction = {
            id: uniqueId(),
            inputText: inputText.value,
            inputAmount: +inputAmount.value,
        };
        transactions.push(transaction);
        loadTransactionDetails(transaction);
        inputText.value = "";
        inputAmount.value = "";
        updateAmount();
        updateLocalStorage();
    }
}
function uniqueId(){
    return Math.floor(Math.random()* 10000000);
}
form.addEventListener("submit", addTransaction);

window.addEventListener("load", function () {
    config();
});

function updateLocalStorage() {
    localStorage.setItem("trans", JSON.stringify(transactions));
}