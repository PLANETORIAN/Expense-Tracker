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
                <p>Current Balance:</p>
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
                <h2>${selectedName}</h2>
                <ul>
                    <li>home</li>
                    <li>dashboard</li>
                    <li class="split">splitwise</li>
                    
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

    calBal(selectedName);


    document.querySelector(".split").addEventListener("click", ()=>{splitWise(selectedName)});

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
    calBal(selectedName);
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
    calBal(selectedName);
}


function calBal(selectedName){
    let totalCredit = 0;
    let totalDebit=0;
    let totalBalance = 0;

    let userIndex = users.findIndex(user=>user.name===selectedName);
    let user = users[userIndex];
    if (user.credit){
        user.credit.forEach(entry => {
            totalCredit += Number(entry.balance);
        });
    }
    if (user.debit){
        user.debit.forEach(entry=>{
            totalDebit+=Number(entry.balance);
        });
    }
    
    
    
    totalBalance = totalCredit-totalDebit;
    document.querySelector(".curr-bal").innerHTML=`<h1>${totalBalance}</h1>`

  

}

function splitWise(){
    document.querySelector(".main-content").innerHTML=`
    <div class="curr-bal"><h1>Split</h1></div>
            <div class="notes1">
                <div class="container3">
                    <div class="bal-container1">
                        <div class="payments">
                            <h1 class="balance">Add Payment</h1>
                            <input type="number" id="add-payment" class="add-payment money-btn" placeholder="Enter Amount">
                        </div>
                        <div class="people">
                            <div class="by"><p>Payment by</p></div>
                            <div class="for"><span>Payment for</span></div>
                        </div>
                        <div class="sub-input">
                            <input type="text" id="p-text" class="p-text money-btn" placeholder="add a note">
    
                            <button class="add-p submit-btn">Add Payment</button>
                        </div>
                        
                    </div>
                    <div class="settle-up">
                        <span>Settle Up</span>
                        <div class="suggested-payments">
                            <div class="pay">
                                <div class="pay-text">
                                    <p>Amount</p>
                                    <p>To Name</p>
                                </div>
                                
                                
                                <button class="pay-up">Settle up</button>
                            </div>
                        </div>
                        
                    </div>
                </div>


                <div class="expense-container1">
                    <div class="expense1">
                        <h1>Expenses</h1>
                    </div>
                    <div class="past-expenses">
                        <div class="expense-block">
                            <div class="pay-details">
                                <p>Note</p>
                                <p>Paid By</p>
                            </div>
                            <div class="amount">Amount</div>
                        </div>
                    </div>

                </div>
            </div>`


            let spAmount = document.querySelector('.add-payment');
            let valAmount =  spAmount.value;
            let spNote = document.querySelector('.p-text');
            let valNote= spNote.value;

            if(valAmount!=''){
                let userIndex = users.findIndex(user => user.name === selectedName);

                if (!users[userIndex].transaction){
                    users[userIndex].transaction = [];
        
                }
                users[userIndex].transaction.push({Amount: valAmount, note: valNote, paidBy: "name", splitAmont:["name","name"]});


            }


}