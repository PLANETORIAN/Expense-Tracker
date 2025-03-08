let users = JSON.parse(localStorage.getItem("users"))|| [];



const addName = document.querySelector(".add-user");
const names = document.querySelector(".name-cover");
const content = document.querySelector(".container");


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


            //doubt
            event.stopPropagation();


            let delName = this.parentElement.querySelector("h2").innerText;
            deleteUser(delName);
        });
    });

    document.querySelectorAll(".name-content").forEach((name) => {
        name.addEventListener("click", ()=>{

            nameClick(name.querySelector("h2").innerText);
        })
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

function nameClick(selectedName){
    content.innerHTML=`<div class="container2">
            <div class="sidebar">
                <h2>name</h2>
                <ul>
                    <li>home</li>
                    <li>dashboard</li>
                    <li>splitwise</li>
                    
                </ul>

            </div>
            <div class="main-content">
                <div class="curr-bal"><h1>balance</h1></div>
                <div class="notes">
                    <div class="bal-container">
                        <div class="deposits"><h1 class="balance">Deposits</h1>
                        
                            <input type="number" id="credit" class="credit money-btn" placeholder="Enter credit amount">
                        </div>
                       
    
                        <input type="text" id="c-text" class="c-text money-btn" placeholder="add a note">
    
                        <button class="add-balance submit-btn">Add Deposit</button>
                    </div>


                    <div class="expense-container">
                        <div class="expense">
                            <h1>Expense</h1>
                        <input type="number" id="debit" class="debit money-btn" placeholder="Enter debit amount">
                        </div>
                        
    
                        <div class="category">
                            <p>category
                            </p>
                            <div class="cat-container">
                                <div class="cats">0</div>
                            <div class="cats">1</div>
                            <div class="cats">2</div>
                            <div class="cats">3</div>
                            <div class="cats">4</div>
                            <div class="cats">5</div>
                            <div class="cats">6</div>
                            <div class="cats">7</div>
                            </div>
                            
                        </div>
                        
                        <input type="text" id="d-text" class="d-text money-btn" placeholder="add a note">
    
                        <button class="add-expense submit-btn">Add Expense</button>
    
                    </div>
                </div>
                
        </div>
    </div>`

    let selCat=0;
    document.querySelectorAll(".cats").forEach((cat)=>{
        cat.addEventListener("click", function (){
            selCat = this.innerText;

            //chatgpted

            document.querySelectorAll(".cats").forEach(c => c.style.border = "none");
        
            this.style.border = "2px solid red";
        }   
        )
    })

    let addDeposit = content.querySelector(".add-balance");
    addDeposit.addEventListener("click", ()=> addCredit(selectedName));

    let addExpense=content.querySelector(".add-expense");
    
    addExpense.addEventListener("click",()=>{addDebit(selectedName,selCat)
        document.querySelectorAll(".cats").forEach(c => c.style.border = "none")
    });

}


function addDebit(selectedName,selCat){
    let debInput=document.querySelector(".debit");
    let newDeb = debInput.value;
    let debNote=document.querySelector(".d-text");
    let newDNote= debNote.value;
    
    
    if (newDeb != ""){

        let userIndex = users.findIndex(user => user.name === selectedName);


        //chatgpted 


        if (!users[userIndex].debit) {
            users[userIndex].debit = [];
        }
        users[userIndex].debit.push({ balance: newDeb, note: newDNote, category:selCat });

        localStorage.setItem("users", JSON.stringify(users));
    debInput.value = "";
    debNote.value = "";

    
    }
}

function addCredit(selectedName){
    let creInput=document.querySelector(".credit");
    let newCre = creInput.value;
    let creNote = document.querySelector(".c-text");
    let newCNote = creNote.value;

    if (newCre!=""){
        let userIndex = users.findIndex(user => user.name === selectedName);

        if (!users[userIndex].credit){
            users[userIndex].credit = [];

        }
        users[userIndex].credit.push({balance: newCre, note: newCNote});
        localStorage.setItem("users",JSON.stringify(users));
    creInput.value="";
    creNote.value="";
    }
}


