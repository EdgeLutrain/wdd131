let tasks = []; // To store all tasks for filtering

// Fetch and display tasks from Tarkov API
fetch('https://api.tarkov.dev/graphql', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    body: JSON.stringify({
        query: `{
            tasks {
                name
                objectives {
                    description
                    maps {
                        name
                    }
                    optional
                }
                restartable
                startRewards {
                    items {
                        quantity
                        count
                        item {
                            name
                            imageLink
                        }
                    }
                    offerUnlock {
                        item {
                            name
                            imageLink
                        }
                    }
                    skillLevelReward {
                        name
                        skill {
                            name
                        }
                        level
                    }
                }
                finishRewards {
                    items {
                        item {
                            name
                            imageLink
                        }
                        quantity
                        count
                    }
                }
                failConditions {
                    description
                }
                factionName
                experience
                availableDelaySecondsMin
                kappaRequired
                lightkeeperRequired
                taskImageLink
                trader {
                    name
                }
            }
        }`,
    }),
})
    .then((response) => response.json())
    .then((data) => {
        const loading = document.getElementById('loading');
        loading.style.display = 'none'; // Hide the loading message

        tasks = data.data.tasks; // Save tasks for search
        renderTasks(tasks); // Initial render
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '<p>Failed to load tasks. Please try again later.</p>';
    });

// Render tasks dynamically
function renderTasks(taskList) {
    const tasksContainer = document.getElementById('task-list');
    tasksContainer.innerHTML = ''; // Clear existing tasks

    if (taskList.length === 0) {
        tasksContainer.innerHTML = '<p>No tasks found.</p>';
        return;
    }

    taskList.forEach((task) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');

        // Build HTML for a single task
        taskElement.innerHTML = `
            <h2>${task.name}</h2>
            <img src="${task.taskImageLink}" alt="${task.name}" class="task-image">
            <p><strong>Faction:</strong> ${task.factionName}</p>
            <p><strong>Experience:</strong> ${task.experience} EXP</p>
            <p><strong>Trader:</strong> ${task.trader ? task.trader.name : 'None'}</p>
            <p><strong>Kappa Required:</strong> ${task.kappaRequired ? 'Yes' : 'No'}</p>
            <p><strong>Lightkeeper Required:</strong> ${task.lightkeeperRequired ? 'Yes' : 'No'}</p>
            <h3>Objectives</h3>
            <ul>
                ${task.objectives
                    .map(
                        (obj) =>
                            `<li>${obj.description}${
                                obj.maps.length
                                    ? ` (Maps: ${obj.maps
                                          .map((map) => map.name)
                                          .join(', ')})`
                                    : ''
                            }</li>`
                    )
                    .join('')}
            </ul>
            <h3>Rewards</h3>
            <div>
                ${task.finishRewards.items
                    .map(
                        (reward) => `
                        <div class="reward-item">
                            <img src="${reward.item.imageLink}" alt="${reward.item.name}">
                            <span>${reward.quantity}x ${reward.item.name}</span>
                        </div>
                    `
                    )
                    .join('')}
            </div>
        `;

        tasksContainer.appendChild(taskElement);
    });
}

// Filter tasks based on search and checkboxes
function filterTasks() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const kappaRequired = document.getElementById('filter-kappa').checked;
    const lightkeeperRequired = document.getElementById('filter-lightkeeper').checked;

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.name.toLowerCase().includes(searchQuery) ||
            task.factionName.toLowerCase().includes(searchQuery) ||
            (task.trader?.name.toLowerCase() || '').includes(searchQuery);

        const matchesKappa = kappaRequired ? task.kappaRequired : true;
        const matchesLightkeeper = lightkeeperRequired ? task.lightkeeperRequired : true;

        return matchesSearch && matchesKappa && matchesLightkeeper;
    });

    renderTasks(filteredTasks);
}

// Attach event listeners for search and filter
document.getElementById('search-input').addEventListener('input', filterTasks);
document.getElementById('filter-kappa').addEventListener('change', filterTasks);
document.getElementById('filter-lightkeeper').addEventListener('change', filterTasks);
