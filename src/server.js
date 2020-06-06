const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db.js")
//Configurar pasta pública em vez de digitar nas html e outros
server.use(express.static("public"))

//habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extende:true}))

//utilizando template engine, turbinar as HTML 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noChace: true
})
//configurar caminhos da minha aplicação
//página inicial
//req é requisição e res é resposta
server.get("/", (req, res) => {
    return res.render("index.html")//depois ("index.html", title: "Título") - Assim fica mais dinamico e no HTML ficaria {{title}}
})

server.get("/create-point", (req, res) => {
    //console.log (req.query) //salvar no bd
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {//caminho para armazenar dados via post. ver action do html create.point
    
    //usa no POST req com objeto body, req.body, o query não vai pegar quando em POST
    //inserir dados no banco de dados
    //inserir dados na tabela
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items    
    ]
        
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")//tratamento de erro em casos de cadatsro, bem simples. retornará que deu erro ao cocnluir para o usuário
            }
        console.log("Cadastrado com sucesso")
        console.log(this)//quando tem "this" nao pode usar funcao anonima
        
        return res.render("create-point.html", {saved: true})
    }
    
    db.run(query, values, afterInsertData) //inserir o dado no SQL

})

server.get("/search-results", (req, res) => {
    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total:0})
    }
//pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE = '%${search}%'`, function (err, rows){ //WHERE para dizer onde vc quer achar e LIKE mais '%${}%' para dizer que nao precisa ser a palavra completa
        // busca por todos = *, por campo, tem que digitar o campo
        if(err){
            return console.log(err)
        }
        const total = rows.length// dar o total de pontos encontrados o sql
        //mostar a página do html com os dados do banco de dados
        return res.render("search-results.html", {places: rows, total: total})
    })
    
})

//ligar o servidor
server.listen(3000)