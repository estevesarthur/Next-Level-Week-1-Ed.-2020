const express = require("express")
const server = express()

//Configurar pasta pública em vez de digitar nas html e outros
server.use(express.static("public"))

//utilizando template engine, turbinar as HTML 
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noChace: true
})
//configurar caminhos da minha aplicação
//pághina inicial
//req é requisição e res é resposta
server.get("/", (req, res) => {
    return res.render("index.html")//depois ("index.html", title: "Título") - Assim fica mais dinamico e no HTML ficaria {{title}}
})
server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})
server.get("/search-results", (req, res) => {
    return res.render("search-results.html")
})

//ligar o servidor
server.listen(3000)