//importar a dependência do SQLite3

const sqlite3 = require ("sqlite3").verbose()

//iniciar o objeto que irá fazer operações no banco de dados
// const db = {
//     propriedade: "valor" // é uma forma
// }
const db = new sqlite3.Database("./src/database/database.db") // essas duas linhas são capazes de gera um BD. No node tem que digitar: node src/database/db.js e aí aparece a pasta de banco de dados

module.exports = db

// utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {//função anonima
//     //criar uma tabela com comandos SQL
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//         );
//     `)
//     //inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1582408921715-18e7806365c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Colecteria",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)//quando tem "this" nao pode usar funcao anonima
//     }
//     db.run(query, values, afterInsertData) //inserir o dado no SQL
    
    // //consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function (err, rows){ // busca por todos = *, por campo, tem que digitar o campo
    //     if(err){
    //        return console.log(err)
    //     }
    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)
    // })

    //deletar um dados da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [5], function(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Registro deletado com sucesso!")
// })