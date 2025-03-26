document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("task-list");
    const taskForm = document.getElementById("task-form");

    function loadTasks() {
        fetch("/api/tasks/")
            .then(response => response.json())
            .then(data => {
                taskList.innerHTML = "";
                data.forEach(task => {
                    const li = document.createElement("li");
                    li.className = "list-group-item d-flex justify-content-between align-items-center";
                    li.innerHTML = `
                        <strong>${task.title}</strong> - ${task.status}
                        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Eliminar</button>
                    `;
                    taskList.appendChild(li);
                });
            })
            .catch(error => console.error("Error al cargar tareas:", error));
    }

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newTask = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            due_date: document.getElementById("due_date").value,
            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value
        };

        fetch("/api/tasks/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(() => {
            loadTasks();
            taskForm.reset();
        })
        .catch(error => console.error("Error al agregar tarea:", error));
    });

    window.deleteTask = function (taskId) {
        fetch(`/api/tasks/${taskId}/`, { method: "DELETE" })
        .then(() => loadTasks())
        .catch(error => console.error("Error al eliminar tarea:", error));
    };

    loadTasks();
});
