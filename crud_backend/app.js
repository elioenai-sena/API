const express = require('express');

const ContatosDao = require('./dao/bd/contatos-dao');
const app = express();

// modulo do Express para trabalhar com Json
app.use(express.json())

//Definir as permissões de cors e cabeçalhos
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Autorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PACTH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

//Criando uma instancia do ContatoDao
var contatosDao = new ContatosDao()

//////////// Definindo rotas ////////////

//Home
app.get('/', function (req, res) {

    res.send({
        message: 'Minha Primeira API'
    })
})

//Listagem Contatos
app.get('/contatos/', function (req, res) {

    let funcao = function (err, results, fields) {
        res.send(results)
    }
    contatosDao.lista(funcao)

})

//Listagem Contatos por em usuario
app.get('/contatos/email/:email', function (req, res) {
    let email = req.params.email
    let funcao = function (err, results, fields) {
        if (results.length > 0) {
            res.send(results)
        } else {
            res.send(400, {
                message: `O Usuario ainda não possui contatos Cadastrados. `
            })
        }
        // res.send(results)
    }
    contatosDao.listaPoremail(email, funcao)

})

//Autenticar Usuario
app.get('/contatos/auth/:email', function (req, res) {

    let email = req.params.email
    let funcao = function (err, results, fields) {
        if (results.length > 0) {
            res.send(results[0])
        } else {
            res.send(400, {
                message: `Não foram  encontrados resultados com o email = ${email} `
            })
        }
    }
    contatosDao.auth(email, funcao)
})

//Inserir Usuario
app.post('/contatos/auth', function (req, res) {

    let funcao = function (err, results, fields) {

        if (err) {
            //console.log(err.sqlMessage)
            res.send(500, {
                message: "Erro ao realizar a operação",
            })

        } else {
            res.send(200, {
                message: "Usuario cadastrado salvo com sucesso"
            })
        }

    }
    contatosDao.cadUsuario(req.body, funcao)
})

//editar Usuario
app.put('/contatos/auth/:email', function (req, res) {

    let email = req.params.email
    let update = req.body
    let funcao = function (err, results, fields) {
        if (err) {
            console.log(err)
            res.send(500, {
                message: "Erro ao realizar a operação"
            })
        } else if (results.affectedRows == 0) {
            res.send(400, {
                message: `Email = ${email}, não esta cadastrado.!!!`
            })
        } else {
            console.log(results)
            res.send(200, {
                message: `Dados atualizados com Sucesso.!!!`
            })

        }
    }
    contatosDao.atualizarUsuario(update, email, funcao)
})

//Busca por id
app.get('/contatos/:id', function (req, res) {

    let id = req.params.id
    let funcao = function (err, results, fields) {
        if (results.length > 0) {
            res.send(results[0])
        } else {
            res.send(400, {
                message: `Não foram  encontrados resultados com o id=${id} `
            })
        }
    }
    contatosDao.buscarPorId(id, funcao)
})

//Inserir contatos
app.post('/contatos', function (req, res) {

    let funcao = function (err, results, fields) {
        res.send(200, {
            message: "Contato salvo com sucesso"
        })
    }

    contatosDao.inserir(req.body, funcao)

})

//editar contatos
app.put('/contatos/:id', function (req, res) {
    let nome = req.body.nome
    let id = req.params.id
    let update = req.body
    let funcao = function (err, results, fields) {
        if (err) {
            console.log(err)
            res.send(500, {
                message: "Erro ao realizar a operação"
            })
        } else if (results.affectedRows == 0) {
            res.send(400, {
                message: `O contato de id = ${id}, não esta cadastrado.!!!`
            })
        } else {
            console.log(results)
            res.send(200, {
                message: `O contato ${nome}, foi atualizado com Sucesso.!!!`
            })

        }
    }
    contatosDao.atualizar(update, id, funcao)
})

// Deletar Contatos
app.delete('/contatos/:id', function (req, res) {

    let id = req.params.id
    let funcao = function (err, results, fields) {
        if (err) {
            console.log(err)
            res.send(500, {
                message: "Erro ao realizar a operação"
            })
        } else if (results.affectedRows == 0) {
            res.send(400, {
                message: `Contato Id = ${id} não Cadastrado`
            })
        } else {
            //console.log(results)
            res.send(200, {
                message: `Contato Id = ${id} deletado com sucesso`
            })
        }
    }

    contatosDao.deletar(id, funcao)

})

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando em : http://localhost:3000')
})