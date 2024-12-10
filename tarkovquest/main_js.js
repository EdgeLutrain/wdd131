// Mission data (from your JSON)
const missionData = {
    name: "First in Line",
    restartable: false,
    startRewards: { items: [], offerUnlock: [], skillLevelReward: [] },
    failConditions: [],
    factionName: "Any",
    experience: 1200,
    availableDelaySecondsMin: null,
    objectives: [
        {
            description: "Locate the Emercom station on Ground Zero",
            optional: false,
            maps: [
                { name: "Ground Zero" },
                { name: "Ground Zero 21+" }
            ]
        },
        {
            description: "Hand over any found in raid medicine items",
            maps: [],
            optional: false
        }
    ],
    finishRewards: {
        items: [
            {
                quantity: 6400,
                count: 6400,
                item: {
                    name: "Roubles",
                    imageLink: "https://assets.tarkov.dev/5449016a4bdc2d6f028b456f-image.webp"
                }
            },
            {
                quantity: 1,
                count: 1,
                item: {
                    name: "Factory plan map",
                    imageLink: "https://assets.tarkov.dev/574eb85c245977648157eec3-image.webp"
                }
            },
            {
                quantity: 1,
                count: 1,
                item: {
                    name: "Bottle of water (0.6L)",
                    imageLink: "https://assets.tarkov.dev/5448fee04bdc2dbc018b4567-image.webp"
                }
            }
        ]
    }
};

// Dynamically render mission details
const missionContainer = document.getElementById('mission-container');

function renderMission(data) {
    const objectivesHTML = data.objectives.map(obj => `
        <li>${obj.description}${obj.maps.length > 0 ? ` (Maps: ${obj.maps.map(map => map.name).join(', ')})` : ''}</li>
    `).join('');

    const rewardsHTML = data.finishRewards.items.map(reward => `
        <div class="reward-item">
            <img src="${reward.item.imageLink}" alt="${reward.item.name}">
            <span>${reward.quantity}x ${reward.item.name}</span>
        </div>
    `).join('');

    missionContainer.innerHTML = `
        <h1>${data.name}</h1>
        <p><strong>Faction:</strong> ${data.factionName}</p>
        <p><strong>Experience:</strong> ${data.experience} EXP</p>
        <h2>Objectives</h2>
        <ul class="objectives">${objectivesHTML}</ul>
        <h2>Rewards</h2>
        <div class="rewards">${rewardsHTML}</div>
    `;
}

// Render the mission
renderMission(missionData);
