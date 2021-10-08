var uid = new ShortUniqueId();
let colors = ["pink","blue","green","black"];
let defaultColor = "black";
let cFilter = "";
let isclose = false;

let input = document.querySelector(".task_input");
let mainContainer = document.querySelector(".main-container");
let colorContainer = document.querySelector(".color-group_container");
let lockContainer = document.querySelector(".lock-container");
let unlockContainer = document.querySelector(".unlock-container");
let plusContainer = document.querySelector(".plus-container");
let closeContainer = document.querySelector(".multiply-container");


input.addEventListener("keydown",function(e){
    if(e.code == "Enter" && input.value){
        let id = uid();
        createTask(id,input.value,true);
        input.value = "";
    }
})

lockContainer.addEventListener("click", function(e){
    let numberOfElements = document.querySelectorAll(".task_main-container>div")
    for(let i = 0 ; i < numberOfElements.length ; i++){
        numberOfElements[i].contentEditable = false;
    }

    lockContainer.classList.add("active")
    unlockContainer.classList.remove("active")
})

unlockContainer.addEventListener("click", function(e){
    let numberOfElements = document.querySelectorAll(".task_main-container>div")
    for(let i = 0 ; i < numberOfElements.length ; i++){
        numberOfElements[i].contentEditable = true;
    }

    lockContainer.classList.remove("active")
    unlockContainer.classList.add("active")
})

closeContainer.addEventListener("click",function(){
    if(isclose){
        closeContainer.classList.remove("active")
    }else{
        closeContainer.classList.add("active")
    }
    isclose = !isclose
})

colorContainer.addEventListener("click",function(e){
    let cColor = e.target.classList[1];
    let allinputs = document.querySelectorAll(".task_container");
    
    if(cColor != cFilter){
        cFilter = cColor;
        for(let i = 0 ; i < allinputs.length ; i++){
            let taskHeader = allinputs[i].querySelector(".task_header");
            let color = taskHeader.classList[1];
            if(cColor != color){
                allinputs[i].style.display = "none";
            }else{
                allinputs[i].style.display = "block";
                e.target.classList.add("active")
            }
        }
    }else{
        cFilter = "";
        for(let i = 0 ; i < allinputs.length ; i++){
            allinputs[i].style.display = "block";
        }
    }
})

function createTask(id, task, flag){
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class","task_container");
    mainContainer.appendChild(taskContainer);
    taskContainer.innerHTML = `
    <div class="task_header ${defaultColor}">
    </div>
    <div class="task_main-container">
    <h3 class="task_id">#${id}</h3>
    <div class="text" contentEditable = "true">${task}</div>
    </div>`

    let taskHeader = taskContainer.querySelector(".task_header");
    taskHeader.addEventListener("click",function(){
        //get all the classes 
        let cColor = taskHeader.classList[1];
        console.log(cColor);  
        let idx = colors.indexOf(cColor);
        let nextIdx = (idx + 1) % 4;
        let nextColor = colors[nextIdx];
      taskHeader.classList.remove(cColor);
      taskHeader.classList.add(nextColor);
    })

  taskContainer.addEventListener("click",function(){
      if(isclose == true){
          taskContainer.remove()
      }
  })

  //local storage add
  if(flag == true){
    let tasksString = localStorage.getItem("tasks");
    let tasksArr = JSON.parse(tasksString) || [];
    let taskObject = {
        id : id,
        task : task,
        color: cColor
    }
    tasksArr.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }
}


(function(){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0 ; i < tasks.length ; i++){
        let { id, task, color} = tasks[i];
        createTask(id,task,false);
    }
})();