async function loadTasks(){

    const res = await fetch('/tasks');
    const tasks = await res.json();

    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(task => {

        const li = document.createElement('li');

        li.innerHTML = `
            ${task.task}
            <button onclick="deleteTask(${task.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

async function addTask(){

    const task = document.getElementById('taskInput').value;

    await fetch('/tasks',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            task:task
        })
    });

    document.getElementById('taskInput').value='';

    loadTasks();
}

async function deleteTask(id){

    await fetch('/tasks/'+id,{
        method:'DELETE'
    });

    loadTasks();
}

loadTasks();
