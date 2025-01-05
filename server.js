//IMPORTAR express FORMA MAIS NOVA  
//OBS: NO JSON PRECISA COLOCAR "TYPE:'MODULE,"

import express from 'express'

//Import cors para conectar com o nosso front end sem barreira

import cors from 'cors'


//IMPORTAR prisma client

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//App
const app = express()

app.use(express.json()) //Faz o express entender o json como req

//Executar o cors

app.use(cors())


//ROTA
/*
app.get('/usuarios') ----> Traz dados
app.post('/usuarios') ----> Cria dados
app.delete('/usuarios') ----> Deleta dados
app.put('/usuarios') ----> Edita  vários dados
app.patch('/usuarios') ----> Edita um dado
*/

app.post('/usuarios',async (req,res)=>{
    await prisma.user.create({ //Pegar os dados da requisição //SE for usar await a função tem que ter async
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body) //Responder Status que foi criado
})

app.get('/usuarios', async (req,res)=>{
    const users = await prisma.user.findMany()
    res.status(200).json(users) // Responder com json e expecificar status
})

app.put('/usuarios/:id',async (req,res)=>{
    await prisma.user.update({ //Atualizar os dados //SE for usar await a função tem que ter async
        where:{
            id:req.params.id
        },
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body) //Responder Status que foi criado
})

app.delete('/usuarios/:id', async (req,res)=>{
    await prisma.user.delete({
        where: { 
            id:req.params.id
        }
    })
    res.status(200).json({message: 'Usuário deletado com Sucesso!'})
})


/*
  O QUE PRECISA PARA CRIAR UMA ROTA
  1) Definir o Método ou Verbo http
  2) Endereço 
*/

//Servidor
app.listen(3000)

/*
     Objetivos para Criar nosso Api de Usuários


     -Criar  um usuário
     -Listar todos os usuários
     -Editar um usuário
     -Deletar um usuário

*/

/*
    Http Status (Response do backend)
    2xx ---> sucesso
    4xx ---> problema cliente
    5xx ---> erro servidor
*/
/*
conta no banco de dados
davihjhafeborgesnery
10082010
 */