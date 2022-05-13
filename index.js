const inputBox = document.querySelector('.input-section input');
const loginBtn = document.querySelector('.input-section button');
const allUsersList = document.querySelector('.users-list');
const loggedUser = document.querySelector('.logged-user');
let usersArr;

inputBox.onkeyup = function () {
  let data = inputBox.value;

  if (data.trim() != 0) {
    loginBtn.classList.add('active');
  } else {
    loginBtn.classList.remove('active');
  }
};

showUsersList();

loginBtn.onclick = function () {
  let data = inputBox.value.toLowerCase();
  let getLocalStorage = localStorage.getItem('Users');

  if (getLocalStorage == null) {
    usersArr = [];
  } else {
    usersArr = JSON.parse(getLocalStorage);
  }
  if (usersArr.includes(data)) {
    window.open(window.location.href, '_blank');
  } else {
    usersArr.unshift(data);
    localStorage.setItem('Users', JSON.stringify(usersArr));
  }

  showUsersList();
  loginBtn.classList.remove('active');
};

function showUsersList() {
  let getLocalStorage = localStorage.getItem('Users');

  if (getLocalStorage == null) {
    usersArr = [];
  } else {
    usersArr = JSON.parse(getLocalStorage);
  }
  let newListElement = '';
  let allUsersListElement = '';

  usersArr.forEach(function (element, index) {
    if (index === 0) {
      newListElement = `<p>Logged in user: ${element}<span class="logoutBtn" onclick="logout(${index})"><a>Logout</a></span></p>`;
    //   if (
    //     document.getElementsByClassName('logoutBtn').clicked == true
    //   ) {
    //     newListElement = '';
    //   }
    //   console.log(newListElement);
    }

    allUsersListElement += `<li>${element}<span onclick="logout(${index})"><a class="logoutBtn">Logout</a></span></li>`;
  });

  loggedUser.innerHTML = newListElement;
  allUsersList.innerHTML = allUsersListElement;
  inputBox.value = '';
}

function logout(index) {
  let getLocalStorage = localStorage.getItem('Users');
  usersArr = JSON.parse(getLocalStorage);

  usersArr.splice(index, 1);

  localStorage.setItem('Users', JSON.stringify(usersArr));
  showUsersList();
}
