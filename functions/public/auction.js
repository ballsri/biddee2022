
var form = document.getElementById('search')
if (form != null) {
  form.addEventListener('submit', search);

}
function search(event) {
  event.preventDefault();
  var find = document.getElementById('search__text').value;
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  if (containsSpecialChars(find)) {
    alert('Special Character are not allowed!')
  } else {

    window.location.href = '/auction/searched-result?q=' + find;
  }

}






function animateValue(item, start = 0) {

  if(item == null) return;

  var time, countDownDate;
    time = item.innerHTML;

    countDownDate = new Date(time);
    countDownDate= countDownDate.getTime();

  
  
  var x = setInterval(function () {
    
    // Get today's date and time
    var now = new Date();
    //	    console.log(now);
    now = now.getTime();
    
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
    
    // Time calculations for days, hours, minutes and seconds
    
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // If the count down is over, write some text 
    if (distance <= 0) {
      item.innerHTML = "EXPIRED";
      clearInterval(x);
      return;
    }
    // Output the result in an element with id="demo"
    if (days > 0) {
      item.innerHTML = "~ " + (days + 1) + " days";
    } else {
      
      item.innerHTML = hours + "h "
      + minutes + "m " + seconds + "s ";
    }
  }, 1000);
}

document.querySelectorAll('.Ticking').forEach((item) => {
  //	console.log(item);
  animateValue(item);
});



// console.log(time);

// Update the count down every 1 second


const page = document.getElementById('page');
setTimeout(() => {
  page.style.visibility = 'visible';
}, 1000); // 
