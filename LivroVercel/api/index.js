const express = require('express');
const cors = require('cors');
const path = require('path');
const livroPath = path.join(__dirname, 'livros.json');

// Importa o módulo 'fs' para ler e escrever arquivos
const fs = require('fs');

 // Lidar com os caminhos dos arquivos
const app = express();

// Define a porta onde o servidor irá rodar

const port = process.env.PORT || 3000

app.use(cors());

// Midlewere que permite qur a aplicação recebr dados JSON
app.use(express.json())

// Definindo o caminho a´te o arquivo de livro.json e retorna os dados convertidos
const getLivros = () => {
    const data = fs.readFileSync(livroPath) // Lê o conteúdo do arquivo
    return JSON.parse(data) // Converte a string JSON em objeto javascript
 }


// Rotas

// Rota GET para\ retornar todos os livros
app.get('/api/livros', (req,res) =>{
    const livros = getLivros() // Pega todos os livros
    res.json(livros) // Retorna os livros
})

// Rota GET para retornar um livro específico pelo ID
app.get('/api/livros/:id', (req, res) =>{
    const {id} = req.params // extrai o ID
    const livros = getLivros() // Lê todos os livros
    const livro = livro.find(f => f.id == id) // Busca od livro


    if(livro){
        res;json(livros)
    }else{
        res.status(404).json({error: "Livro não encontrado"})
    }
})
// Rota POSt para adicionar um novo livro
app.post('api/livros', (req, res) =>{
    const{titulo, autor, editora, ano} = req.body
    // Verifica se os campos obrigatórios forma preenchidos
    if(titulo || autor || editora || ano){
        return res.status(400).json ({ error :"Preencha todos os campos"})
    }
    const livros = getLivros() // Adiciona um nv livro

    // Cria umum novo livro com um ID incremental e os dados fornecidos
    const novoLivro = {
        id: livros.length + 1,
        titulo,
        autor,
        editora,
        ano
    }
    livros.push(novoLivro) // Adiciona novo livro

    // Escreva a lista atualizada
    fs.writeFileSync(livroPath, JSON.stringify(livros, nullm, 2))

    // retorna o novo livro criado (201 criado)
    res.status(203).json(novoLivro)
})
// Rota DELETE para remover um por ID
app.delete('/api/livros/:id', (req, res) => {
    const {id} = req.params // extrai ID do parâmetros
    let livros = getLivros
    livros = livros.filter( f => f.id != id) // Filtra todos os livros removendo o de ID correspondente

    // Atualiza o arquivo com a nova lista de livros
    fs.writeFileSync(livroPath, JSON.stringify(livros, null, 2))

    // Retorna status 204 (sem conteúdo), indicando que a operação foi bem-sucedida
    res.status(204).send()
})
// Inicia o servidor na porta definida
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
    console.log(`Arquivo de dados em: ${livroPath}`)

})