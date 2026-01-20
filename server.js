const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Usar versão baseada em Promises para não bloquear o Event Loop
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite que o site (frontend) fale com o servidor
app.use(express.json()); // Permite ler JSON enviado pelo formulário

// Rota para receber o contato
app.post('/api/contact', async (req, res) => {
    const { name, email, phone } = req.body;

    // Validação básica
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const newContact = {
        id: Date.now(),
        date: new Date().toLocaleString('pt-BR'),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim()
    };

    // Caminho do arquivo de banco de dados (JSON)
    const dbPath = path.join(__dirname, 'contacts.json');

    try {
        // Ler dados existentes ou iniciar array vazio
        let contacts = [];
        
        // Verifica se o arquivo existe tentando lê-lo
        try {
            const fileData = await fs.readFile(dbPath, 'utf8');
            contacts = JSON.parse(fileData);
        } catch (error) {
            // Se der erro de arquivo não encontrado (ENOENT), iniciamos com array vazio
            if (error.code !== 'ENOENT') throw error;
        }

        // Adicionar novo contato
        contacts.push(newContact);

        // Salvar no arquivo de forma assíncrona
        await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));

        console.log('Novo lead recebido:', newContact.name);

        return res.status(201).json({ message: 'Contato salvo com sucesso!' });
    } catch (error) {
        console.error("Erro no servidor:", error);
        return res.status(500).json({ error: 'Erro interno ao salvar contato.' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});