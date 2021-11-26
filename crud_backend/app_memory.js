const express = require('express');

const ContatosDao = require('./dao/menory/contatos-dao');
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

//Definindo rotas
app.get('/', function (req, res) {

    res.send('Minha Primeira API')
})

//Listagem
app.get('/contatos', function (req, res) {
    let conatos = contatosDao.lista()
    res.send(conatos)
})

//Busca por id
app.get('/contatos/:id', function (req, res) {

    let id = req.params.id
    let contato = contatosDao.buscarPorId(id)
    res.send(contato)
})
//Inserir
app.post('/contatos', function (req, res) {
    contatosDao.inserir(req.body)
    res.send(
        {
            "mensagem": "Contato salvo com sucesso"
        }
    )
})

//editar
app.put('/contatos/:id', function (req, res) {
    let id = req.params.id
    let update = req.body
    contatosDao.atualizar(update, id)
    res.send({ status: 'OK PUT', id: `${id}` })
})

app.delete('/contatos/:id', function (req, res) {

    let id = req.params.id
    let contato = contatosDao.deletar(id)
    res.send(contato)
})

app.listen(3000, '0.0.0.0', () => {
    console.log('Servidor rodando em : http://localhost:3000')
})