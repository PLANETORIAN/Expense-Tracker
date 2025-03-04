let users = JSON.parse(localStorage.getItem("users"))|| [];



const addName = document.querySelector(".add-user");
const names = document.querySelector(".name-cover");


function displayNames() {
    names.innerHTML = "";

    users.forEach((user) => {
        names.innerHTML+=`
        <div class="name-content">
                <h2>${user.name}</h2>
                <p>Date n time</p>
                <button class="del-user">delete</button>
            </div>`
    });



    document.querySelectorAll(".del-user").forEach((button) => {
        button.addEventListener("click", function () {
            let delName = this.parentElement.querySelector("h2").innerText;
            deleteUser(delName);
        });
    });
}

function addUser(){
    let newInput = document.querySelector(".get-name");
    let newName = newInput.value;
    if (newName != ""){
        let newUser = { name: newName};
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    console.log(users);
    newInput.value = "";
    }
    displayNames(); 
}



displayNames();

addName.addEventListener("click", addUser);

function deleteUser(delName){
    users = users.filter(user=> user.name != delName);
    localStorage.setItem("users",JSON.stringify(users));
    displayNames();
}

const delUser = document.querySelectorAll(".del-user");
