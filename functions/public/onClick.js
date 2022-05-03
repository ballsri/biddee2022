
function Menu(e) {
  let list = document.getElementById("menu");
  e.name == 'menu-outline' ? (e.name = 'close-outline', list.classList.add('top-[80]px'), list.classList.add('block'), list.classList.remove('hidden')) : (e.name = 'menu-outline', list.classList.remove('top-[80]px'), list.classList.remove('block'), list.classList.add('hidden'));
}

function Dropdown(e) {
  let list = document.getElementById("dropdown-ws");
  e.name === 'not-used' ? (e.name = 'used', list.classList.add('top-[80]px'), list.classList.add('opacity-100')) : (e.name = 'not-used', list.classList.remove('top-[80]px'), list.classList.remove('opacity-100'));
}

function myFunction1() {
  document.getElementById("myDropdown1").classList.toggle("show");
}
function myFunction2() {
  document.getElementById("myDropdown2").classList.toggle("show");
}
window.onclick = function (event) {
  if (!event.target.matches('#drop1') || !event.target.matches('#drop2')) {
    if (!event.target.matches('#drop1') && !event.target.matches('#drop2')) {
      var dropdowns1 = document.getElementsByClassName("function1");
      var dropdowns2 = document.getElementsByClassName("function2");
      var i;
      for (i = 0; i < dropdowns1.length; i++) {
        var openDropdown1 = dropdowns1[i];
        if (openDropdown1.classList.contains('show')) {
          openDropdown1.classList.remove('show');
        }
      }

      for (i = 0; i < dropdowns2.length; i++) {
        var openDropdown2 = dropdowns2[i];
        if (openDropdown2.classList.contains('show')) {
          openDropdown2.classList.remove('show');
        }
      }
    } else if (!event.target.matches('#drop1')) {
      var dropdowns = document.getElementsByClassName("function1");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    } else {
      var dropdowns = document.getElementsByClassName("function2");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
}

function menu2(e) {
  let list = document.getElementById("btn-search");
  e.name == 'arrow-down-circle-outline' ? (e.name = 'arrow-up-circle-outline', list.classList.add('block'), list.classList.remove('hidden')) : (e.name = 'arrow-down-circle-outline', list.classList.remove('block'), list.classList.add('hidden'));
}

function menu3(e) {
  let list = document.getElementById("btn-search");
  let l = document.getElementById(e);
  l.name = 'arrow-down-circle-outline';
  list.classList.remove('block');
  list.classList.remove('hidden');
  list.classList.add('hidden');
}
