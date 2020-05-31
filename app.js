var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var listElement = document.querySelector('#app ul')
var msgError = document.querySelector('#msg-error');
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderTodo() {
    listElement.innerHTML = '';

    for (todo of todos) {
        var itemElement = document.createElement('li')
        var textList = document.createTextNode(todo);

        var linkElement = document.createElement('a');
        linkElement.setAttribute('href', '#');

        var posicao = todos.indexOf(todos);
        linkElement.setAttribute('onclick', 'removeTodo(' + posicao + ')');

        var textLink = document.createTextNode('Excluir');

        linkElement.appendChild(textLink);
        itemElement.appendChild(textList);
        itemElement.appendChild(linkElement);
        listElement.appendChild(itemElement);
    }
}
renderTodo();

function addTodo() {
    var textList = inputElement.value;

    if (inputElement.value.length == 0) {
        msgError.innerHTML = `Preencha o campo para poder adicionar um To Do.`
        msgError.style.visibility = 'visible';
        msgError.style.backgroundColor = '#F8D7DA';
        msgError.style.color = '#A33629';
        msgError.style.padding = '10px';
        msgError.style.width = '380px'
        msgError.style.textAlign = 'center';
        msgError.style.borderRadius = '5px';
    } else {
        msgError.innerHTML = '';
        msgError.style.visibility = 'hidden';
        todos.push(textList);
        inputElement.value = '';
        renderTodo();
    }
    inputElement.focus();
    saveToStorage();
}
buttonElement.onclick = addTodo;


function removeTodo(position) {
    todos.splice(position, 1);
    renderTodo();
    saveToStorage();
}

// extra - salvar to do no storage do browser
function saveToStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos));
}