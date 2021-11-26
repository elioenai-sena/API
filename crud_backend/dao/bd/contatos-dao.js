
const mysql = require('mysql2')

class ContatosDao {

    constructor() {
        let params = {
           // host: '127.0.0.1',
            //user: 'root',
            //password: '12345',
            host: '54.89.179.238',
            user: 'root',
            password: 'mariadb',
            database: 'api_db'
        }
        this._connection = mysql.createConnection(params)
        this._connection.connect();
    }
    lista(funcao) {
        this._connection.query(`select * from contatos`, funcao)
    }
    listaPoremail(email, funcao) {
        this._connection.query(`select * from contatos where emailUsuario = '${email}'`, funcao)
    }

    buscarPorId(id, funcao) {
        this._connection.query(`select * from contatos where id ='${id}'`, funcao)
    }

    inserir(contato, funcao) {

        let sql = 'insert into contatos (nome,email,telefone,dataNascimento,emailUsuario) values(?,?,?,?,?)'
        let params = [contato.nome, contato.email, contato.telefone, contato.dataNascimento, contato.emailUsuario]

        this._connection.query(sql, params, funcao)
    }

    atualizar(contato, id, funcao) {

        let sql = `update contatos set `
        let params = []

        for (const atributo in contato) {
            params.push(` ${atributo} = '${contato[atributo]}'`)
        }

        sql += params.join(',')
        sql += `where id ='${id}'`

        this._connection.query(sql, funcao)

    }

    deletar(id, funcao) {

        let sql = `delete from contatos where id='${id}'`
        this._connection.query(sql, funcao)

    }

    //Usuario
    auth(email, funcao) {
        this._connection.query(`select * from usuario where email ='${email}'`, funcao)
    }

    cadUsuario(contato, funcao) {

        let sql = 'insert into usuario (nome,email,senha) values(?,?,?)'
        let params = [contato.nome, contato.email, contato.senha]

        this._connection.query(sql, params, funcao)
    }

    atualizarUsuario(contato, email, funcao) {

        let sql = `update usuario set `
        let params = []

        for (const atributo in contato) {
            params.push(` ${atributo} = '${contato[atributo]}'`)
        }

        sql += params.join(',')
        sql += `where email ='${email}'`
        //console.log(sql)
        this._connection.query(sql, funcao)

    }

}

module.exports = ContatosDao