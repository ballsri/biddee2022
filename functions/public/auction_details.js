function add(e){
    document.getElementById('price').value = Number(document.getElementById('price').value) + Number(3000);
}
function subtract(e){
    var num = Number(document.getElementById('price').value);
    var ref = Number(document.getElementById('startPrice').value);
    // console.log(ref)
    document.getElementById('price').value = ((num-3000 >=ref) ? num-Number(3000): num);
}


var time = document.getElementById('startTime').value;

var countDownDate = new Date(time).getTime();
// console.log(time);

// Update the count down every 1 second
var x = setInterval(function() {

// Get today's date and time
var now = new Date().getTime();

// Find the distance between now and the count down date
var distance = countDownDate - now;

// Time calculations for days, hours, minutes and seconds

var seconds = Math.floor((distance % (1000 * 60)) / 1000);
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var days = Math.floor(distance / (1000 * 60 * 60 * 24));  
// Output the result in an element with id="demo"
if(days >0){
document.getElementById("time").innerHTML =  "~ "+ (days+1) +" days";
} else {

document.getElementById("time").innerHTML =  hours + "h "
+ minutes + "m " + seconds + "s ";
}

// If the count down is over, write some text 
if (distance < 0) {
    clearInterval(x);
    document.getElementById("time").innerHTML = "EXPIRED";
    var btn = document.getElementById('bidbt');
    var price = document.getElementById('price');
    var add = document.getElementById('add').onclick = null;
    var sub = document.getElementById('subtract').onclick = null;
    price.disabled = true;
    btn.remove();
}
}, 1000);

const page = document.getElementById('page');
setTimeout(() => {
page.style.visibility = 'visible';
}, 1000); // 

const priceInput = document.getElementById('price')
priceInput.addEventListener('keyup', check)

function check(event){
    var newPrice = Number(document.getElementById('price').value)
    const priceref = Number(document.getElementById('startPrice').value)
    if(newPrice < priceref || (newPrice % 1000) != 0){
        document.getElementById('price').classList.remove("color-green-bid")
        document.getElementById('price').classList.add("color-red-bid")
    }
    else{
        document.getElementById('price').classList.remove("color-red-bid")
        document.getElementById('price').classList.add("color-green-bid")
    }
}
