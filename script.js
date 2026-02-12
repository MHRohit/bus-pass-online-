
function login() {
    let email = document.getElementById("email").value;

    if(email === ""){
        alert("Please enter email");
        return;
    }

    localStorage.setItem("userEmail", email);
    localStorage.setItem("history", JSON.stringify([])); 

    window.location.href = "profile.html";
}


function goPage(page){
    window.location.href = page;
}


function saveHistory(data){
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(data);
    localStorage.setItem("history", JSON.stringify(history));
}


function viewHistory(){
    let history = JSON.parse(localStorage.getItem("history")) || [];

    if(history.length === 0){
        alert("No Booking Found");
        return;
    }

    let message = "";
    history.forEach((item, index) => {
        message += (index+1) + ". " + item.type + 
                   " | ₹" + item.amount + "\n";
    });

    alert(message);
}


function payment(amount, type){

    let method = prompt("Enter Payment Method (UPI / CARD)");

    if(!method){
        alert("Payment Cancelled");
        return;
    }

    alert("Payment Successful ₹" + amount);

    let booking = {
        type: type,
        amount: amount,
        date: new Date().toLocaleString()
    };

    saveHistory(booking);

    window.location.href = "profile.html";
}


function schoolSubmit(){
    payment(500, "School Pass");
}


function collegeSubmit(){
    payment(800, "College Pass");
}


function commuterSubmit(){
    payment(1000, "Commuter Pass");
}


function ticketSubmit(){

    let age = parseInt(document.getElementById("age").value);
    let gender = document.getElementById("gender").value;

    let amount = 100;

    if(age >= 75){
        amount = 0;
    }
    else if(age >= 15 && age <= 50){
        if(gender === "Female"){
            amount = 50;
        } else {
            amount = 100;
        }
    }

    payment(amount, "Ticket Booking");
}


function loadRefundPage(){

    let history = JSON.parse(localStorage.getItem("history")) || [];
    let container = document.getElementById("refundList");

    if(history.length === 0){
        container.innerHTML = "No Booking Available";
        return;
    }

    container.innerHTML = "";

    history.forEach((item, index) => {

        let div = document.createElement("div");
        div.style.background = "#f1f1f1";
        div.style.padding = "10px";
        div.style.margin = "8px 0";
        div.style.borderRadius = "5px";

        div.innerHTML = `
            <b>${item.type}</b><br>
            Amount: ₹${item.amount}<br>
            Date: ${item.date}<br>
            <button onclick="refundBooking(${index})">Cancel & Refund</button>
        `;

        container.appendChild(div);
    });
}

function refundBooking(index){

    let history = JSON.parse(localStorage.getItem("history")) || [];

    if(!confirm("Are you sure to cancel?")) return;

    alert("Refund Successful ₹" + history[index].amount);

    history.splice(index,1);
    localStorage.setItem("history", JSON.stringify(history));

    loadRefundPage();
}
