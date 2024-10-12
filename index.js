import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js"; // Importa o modelo User

const app = express();

app.use(express.json());

// Operação de leitura (GET) - Buscar todos os usuários
app.get("/users", async (request, response) => {
    const users = await User.find(); // Busca todos os usuários no banco de dados
    return response.status(200).json(users); // Retorna os usuários
});

// Operação de leitura (GET) - Buscar um usuário específico por ID
app.get("/users/:id", async (request, response) => {
    const { id } = request.params;
    const user = await User.findById(id); // Busca o usuário pelo ID
    return response.status(200).json(user); // Retorna o usuário encontrado
});

// Operação de criação (POST) - Criar um novo usuário
app.post("/users", async (request, response) => {
    const user = request.body; // Dados enviados pelo corpo da requisição
    const newUser = await User.create(user); // Cria um novo usuário no banco de dados
    return response.status(201).json(newUser); // Retorna o usuário criado
});

// Operação de atualização (PUT) - Atualizar um usuário existente por ID
app.put("/users/:id", async (request, response) => {
    const { id } = request.params;
    const updatedData = request.body; // Dados atualizados enviados no corpo da requisição
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true }); // Atualiza o usuário e retorna o novo
    return response.status(200).json(updatedUser); // Retorna o usuário atualizado
});

// Operação de exclusão (DELETE) - Deletar um usuário por ID
app.delete("/users/:id", async (request, response) => {
    const { id } = request.params;
    await User.findByIdAndDelete(id); // Remove o usuário pelo ID
    return response.status(200).json({ message: "Usuário removido com sucesso" }); // Retorna a confirmação de exclusão
});

// Conectar ao banco de dados MongoDB
mongoose.connect("mongodb+srv://gabrielamaia:1pLK0HaF8srG0Ow7@cluster0.pdoyj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Banco de dados conectado"))
    .catch(() => console.log("Deu ruim!"));

// Iniciar o servidor na porta 3000
app.listen(4000, () => {
    console.log("Servidor rodando na porta 4000");
});
