var uid = new ShortUniqueId();
let colors = ["pink","blue","green","black"];
let defaultColor = "black";
let cFilter = "";
let isclose = false;
let lockFlag = true;
let body = document.body;

let input = document.querySelector(".input_container_text");
let mainContainer = document.querySelector(".main-container");
let colorContainer = document.querySelector(".color-group_container");
// let lockContainer = document.querySelector(".lock-container");
// let unlockContainer = document.querySelector(".unlock-container");
let lock = document.querySelector(".lock");
let plusContainer = document.querySelector(".plus-container");
let closeContainer = document.querySelector(".multiply-container");
let colorpicker = document.querySelector(".color_container");
let modal = document.querySelector(".modal");
let infoBtn = document.querySelector(".information_container");

input.addEventListener("keydown",function(e){
    if(e.code == "Enter" && input.value){
        let id = uid();
        modal.style.display = "none";
        createTask(id,input.value,defaultColor,true);
        input.value = "";
        let selectedColor = colorpicker.querySelector(".selected");
        let blackColor = colorpicker.querySelector(".black");
        selectedColor.classList.remove("selected");
        blackColor.classList.add("selected");
        defaultColor = "black";
    }
})

// lockContainer.addEventListener("click", function(e){
//     let numberOfElements = document.querySelectorAll(".task_main-container>div")
//     for(let i = 0 ; i < numberOfElements.length ; i++){
//         numberOfElements[i].contentEditable = false;
//     }
    
//     // lockContainer.classList.add("active")
//     // unlockContainer.classList.remove("active")
// })

// unlockContainer.addEventListener("click", function(e){
//     let numberOfElements = document.querySelectorAll(".task_main-container>div")
//     for(let i = 0 ; i < numberOfElements.length ; i++){
//         numberOfElements[i].contentEditable = true;
//     }

//     // lockContainer.classList.remove("active")
//     // unlockContainer.classList.add("active")
// })

lock.addEventListener("click",function(){
    let taskDescElemArr = document.querySelectorAll(".task_main-container>div");
   
    lockFlag = !lockFlag;
    if (lockFlag == false) {
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-unlock-alt");
        taskDescElemArr.forEach(function(taskDescElem){
            taskDescElem.setAttribute("contenteditable","true");
        })
    }else {
        lock.classList.remove("fa-unlock-alt");
        lock.classList.add("fa-lock");
        taskDescElemArr.forEach(function(taskDescElem){
            taskDescElem.setAttribute("contenteditable","false");
        })
    }
})

closeContainer.addEventListener("click",function(){
    if(isclose){
        closeContainer.classList.remove("active")
    }else{
        closeContainer.classList.add("active")
    }
    isclose = !isclose
})

plusContainer.addEventListener("click",function(){
    modal.style.display = "flex";
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
                
            }
        }
    }else{
        cFilter = "";
        for(let i = 0 ; i < allinputs.length ; i++){
            allinputs[i].style.display = "block";
        }
    }
})

colorpicker.addEventListener("click",function(e){
    let selectedColor = document.querySelector(".selected");
    
    if(e.target.classList[0] == "color_picker"){
        selectedColor.classList.remove("selected");
        e.target.classList.add("selected");
        defaultColor = e.target.classList[1];
    }
})

window.addEventListener("click",function(e) {
    if(mainContainer == e.target){ 
     modal.style.display= "none";
     input.value = "";
        let selectedColor = document.querySelector(".selected");
        let blackColor = colorpicker.querySelector(".black");
        selectedColor.classList.remove("selected");
        blackColor.classList.add("selected");
        defaultColor = "black";
    }
})

infoBtn.addEventListener("mouseover", function () {
    console.log("hover")
	let functionalities = document.createElement("div");
	functionalities.setAttribute("class", "functionalities");
	functionalities.innerHTML = `<h2><u>Features:</u></h2>
	<ul>
		<li><b>Add Tasks:</b> Click '+' Icon.</li>
		<br />
		<li><b>Delete Tasks:</b> Click 'x' Icon.</li>
		<br />
		<li>
			<b>Edit Tasks:</b> Unlock the lock by pressing the lock
			button and click the task description.
		</li>
		<br />
		<li><b>View All Tasks:</b> Double click any color in the Toolbar.</li>
		<br />
		<li>
			<b>Lock/Unlock Task Editing:</b> Click Lock/Unlock icon on
			Task Container.
		</li>
		<br />
		<li><b>Change Color of a Task:</b> Click color bar of the Task Container.</li>
		<br />
		<li>
			<b>Filter specific Tasks:</b> Click that specific color in the Toolbar.
		</li>
		<br />		
			
		<p>
			<b><i>Your data will be stored for the next time you visit us.</b>
		<i></i></p>
	</ul>`;
	body.appendChild(functionalities);
});

infoBtn.addEventListener("mouseout", function () {

	body.removeChild(body.childNodes[body.childNodes.length - 1]);
});


function createTask(id, task, defaultColor, flag){
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
    let inputTask = taskContainer.querySelector(".task_main-container>div")

  taskHeader.addEventListener("click",function(){
        //get all the classes 
        let cColor = taskHeader.classList[1];
        console.log(cColor);  
        let idx = colors.indexOf(cColor);
        let nextIdx = (idx + 1) % 4;
        let nextColor = colors[nextIdx];
      taskHeader.classList.remove(cColor);
      taskHeader.classList.add(nextColor);

    //   let idElem = taskHeader.parentNode.children[1].children[0];
    //   let id = idElem.textContent;
    //   id = id.split('#')[1];
      let tasksString = localStorage.getItem("tasks");
      let tasksArr = JSON.parse(tasksString)

      for(let i = 0 ; i < tasksArr.length ; i++){
          if(tasksArr[i].id == id){
              tasksArr[i].color = nextColor;
              break;
          }
      }
      localStorage.setItem("tasks",JSON.stringify(tasksArr));
  })

  taskContainer.addEventListener("click",function(){
      if(isclose == true){
          taskContainer.remove()

        let tasksString = localStorage.getItem("tasks");
        let tasksArr = JSON.parse(tasksString)

        for(let i = 0 ; i < tasksArr.length ; i++){
            if(tasksArr[i].id == id){
                tasksArr.splice(i,1);
                break;
            }
        }
        localStorage.setItem("tasks",JSON.stringify(tasksArr));
      }
  })

  inputTask.addEventListener("blur", function(){
      let content = inputTask.textContent;
      let tasksString = localStorage.getItem("tasks");
      let tasksArr = JSON.parse(tasksString);
      for(let i = 0 ; i < tasksArr.length ; i++){
          if(tasksArr[i].id == id){
              tasksArr[i].task = content;
              break;
          }
      }
      localStorage.setItem("tasks", JSON.stringify(tasksArr));
  })

  //local storage add
  if(flag == true){
    let tasksString = localStorage.getItem("tasks");
    let tasksArr = JSON.parse(tasksString) || [];
    let taskObject = {
        id : id,
        task : task,
        color: defaultColor
    }
    tasksArr.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(tasksArr));
  }

  defaultColor = "black";
}

(function(){
    modal.style.display = "none";
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    for(let i = 0 ; i < tasks.length ; i++){
        let { id, task, color} = tasks[i];
        createTask(id,task,color,false);
    }
})();