class ContatosDao {

    constructor() {
        this._ultimoId = 3;
        this._contatos = [
            {
                "id": 1,
                "nome": "Elioenai",
                "email": "elioenai@gmail.com",
                "telefone": "81988888889",
                "dataNascimento": "1999-12-12"
            },
            {
                "id": 2,
                "nome": "Fernando Pessoa",
                "email": "pessoa@gmail.com",
                "telefone": "8199999999",
                "dataNascimento": "1999-01-12"
            },
            {
                "id": 3,
                "nome": "Camila Pitanga",
                "email": "pitanga@gmail.com",
                "telefone": "81991035111",
                "dataNascimento": "2009-02-27"
            }
        ]
    }
    lista() {
        return this._contatos
    }

    buscarPorId(id) {
        let contato = this._contatos.find(item => item.id == id)
        return contato;
    }

    inserir(contato) {
        this._ultimoId += 1
        contato.id = this._ultimoId
        this._contatos.push(contato)
    }

    atualizar(contato, id) {

        let old = this.buscarPorId(id)
        for (const key in contato) {
            old[key] = contato[key]
        }
        //console.log(old)
    }

    deletar(id) {
        this._contatos = this._contatos.filter(contato => contato.id != id)
        return this._contatos
    }

}

module.exports = ContatosDao