
//const url = 'http://api.josinon.codes/api/contatos/'
const url = 'http://localhost:3000/contatos/'


function loadData(login) {
    fetch(url + 'email/' + login)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (dados) {
            if (dados.message) {
                alert(dados.message)
            } else {
                console.log(dados)
                tableBody = document.getElementById('conteudoTabela')

                for (const dado of dados) {

                    var row = document.createElement('tr')
                    row.innerHTML = `
                <td>${dado.nome}</td>
                <td>${dado.email}</td>
				<td>${dado.telefone}</td>
				<td>${dado.dataNascimento}</td>
                <td>
                <a class="waves-effect waves-teal btn-flat" id ="editar" onclick="editar(${dado.id})"><i class="material-icons">edit</i></a>
                <a class="waves-effect waves-teal btn-flat" id ="deletar" onclick="remove(${dado.id})"><i class="material-icons">delete</i></a>
                </td>
                `
                    tableBody.appendChild(row)
                }
            }
        })
}

function loadDetail(id) {
    fetch(url + id)
        .then(resp => resp.json())
        .then(contato => {
            //console.log(contato)
            document.getElementById('login').innerHTML = contato.emailUsuario
            document.getElementById('id').value = contato.id
            document.getElementById('nome').value = contato.nome
            document.getElementById('telefone').value = contato.telefone
            document.getElementById('email').value = contato.email
            document.getElementById('nascimento').value = contato.dataNascimento
        })
}

function save() {
    const contato = {
        emailUsuario: document.getElementById('login').innerHTML,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('nascimento').value
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    fetch(url, options).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            alert(data.message)
            document.location = `lista.html?${contato.emailUsuario}`
        })



}

function atualizar() {

    var id = document.getElementById('id').value
    var login = document.getElementById('login').innerHTML

    const contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        dataNascimento: document.getElementById('nascimento').value
    }
    //console.log(contato)
    //console.log(id)

    const options = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }

    fetch(url + id, options)
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            alert(data.message)
            document.location = `lista.html?${login}`
        })

}

function cancelar() {
    login = document.getElementById('login').innerHTML
    //console.log(login)
    document.location = `lista.html?${login}`
}

function saveUser() {

    //const urlUser = 'http://localhost:3000/contatos/auth'
    const contato = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contato)
    }
    console.log(contato)

    fetch(url + 'auth', options).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            alert(data.message)
            document.location = "index.html"
        })

}

//Editar
function editar(id) {
    alert(`Editar Contato`)
    document.location = `detail.html?${id}`

}

//função para deletar por id
function remove(id) {

    login = document.getElementById('login').innerText
    const option = {
        method: 'delete',
        body: JSON.stringify({
            id: `${id}`
        })
    }
    fetch(url + id, option)
        .then((resp) => resp)
        .then((dado) => {
            console.log(dado)
            alert(`Contato Removido!!!`)
            document.location = `lista.html?${login}`
        })
}

function auth() {

    const login = document.getElementById('login').value
    const senha = document.getElementById('senha').value

    fetch(url + 'auth/' + login).then((resp) => resp.json()).then((dados) => {

        //console.log(dados)
        //console.log(login)
        //console.log(senha)

        //Teste da conta e senha
        if (dados.email == login && dados.senha == senha) {
            alert('Logou com sucesso')
            window.location.href = `lista.html?${login}`;
        } else {
            alert('ops Falhou!!! O login ou senha invalido ')
            document.location.href = "index.html";
        }

    }).catch(function (error) {
        console.log('Houve algum proplema com a sua solicitação: ' + error.message);
    });


}

function form() {
    let urlLista = window.location.href;
    urlLista = urlLista.split('?')
    let login = urlLista[1]
    document.location = `form.html?${login}`
}

