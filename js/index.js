const URL_ADDRESS = 'http://localhost:3000/'
let page = 1;

const getMonsters = monsters => {
    fetch(URL_ADDRESS + `monsters/?_limit=50&_page=${monsters}`)
    .then(resp => resp.json())
    .then(res => {
        document.getElementById('monster-container').innerHTML = '';
        for (let i = 0; i < res.length; i++) createMonsterCard(res[i])
    })
},

    createMonsterCard = monster => {
    let div = document.createElement('div');
    let h2 = document.createElement('h2');
    let h4 = document.createElement('h4');
    let p = document.createElement('p');

    h2.innerHTML = `${monster.name}`, h4.innerHTML = `Age: ${monster.age}`, p.innerHTML = `Bio: ${monster.description}`, div.appendChild(h2), div.appendChild(h4), div.appendChild(p), document.getElementById('monster-container').appendChild(div)
    },
    
    createMonsterForm = () => {
        const form = document.createElement('form');
        const nameInput = document.createElement('input');
        const ageInput = document.createElement('input');
        const descriptionInput = document.createElement('input');
        const btn = document.createElement('button');
        form.id = ('monster-form'), nameInput.id = 'name', ageInput.id = 'age', descriptionInput.id = 'description', nameInput.placeholder = 'name...', ageInput.placeholder = 'age...', descriptionInput.placeholder = 'description...', btn.innerHTML = 'Create Monster', form.appendChild(nameInput), form.appendChild(ageInput), form.appendChild(descriptionInput), form.appendChild(btn), document.getElementById('create-monster').appendChild(form), addSubmitMonsterEventListener();
    },

    addSubmitMonsterEventListener = () => {
        document.getElementById('monster-form').addEventListener('submit', monster => {
            monster.preventDefault(), postNewMonster(getMonsterFormData()), clearForm();
        })
    },

    getFormData = () => {
        let name = document.getElementById('name'),
            age = document.getElementById('age'),
            description = document.getElementById('description');
        return {
            name: name.value,
            age: parseFloat(age.value),
            description: description.value
        }
    },

    postNewMonster = monster => {
        let monsterAddress = URL_ADDRESS + `monsters`,
            postReqMonster = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify(monster)
            };
            fetch(monsterAddress, postReqMonster)
            .then(resp => resp.json())
            .then(res => console.log('new monster', res))
    },

    clearForm = () => {
        document.getElementById('monster-form').reset()
    },

    addNavigationListeners = () => {
        let backBtn = document.getElementById('back'),
            forwardBtn = document.getElementById('forward');
        backBtn.addEventListener('click', () => {
            pageDown()
        }), forwardBtn.addEventListener('click', () => {
            pageUp()
        })
    },

    pageUp = () => {
        page++, getMonsters(page)
    },

    pageDown = () => {
        1 < page ? (page--, getMonsters(page)) : alert('you fugged up, monster is coming to eat you now')
    },

    initialize = () => {
        getMonsters(), createMonsterForm(), addNavigationListeners()
    };

document.addEventListener('DOMContentLoaded', initialize)