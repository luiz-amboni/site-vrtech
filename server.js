require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const fs = require('fs').promises; // Usar versão baseada em Promises para não bloquear o Event Loop
const path = require('path');
const twilio = require('twilio');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' })); // Permite que o site (frontend) fale com o servidor de qualquer origem
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
            contacts = fileData.trim() ? JSON.parse(fileData) : [];
        } catch (error) {
            // Se der erro de arquivo não encontrado (ENOENT) ou JSON inválido, iniciamos com array vazio
            if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error;
        }

        // Adicionar novo contato
        contacts.push(newContact);

        // Salvar no arquivo de forma assíncrona
        await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));

        // --- NOTIFICAÇÃO VIA WHATSAPP (TWILIO) ---
        // Envia em segundo plano (sem await) para responder ao site instantaneamente
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        
        client.messages.create({
            body: `🚀 *Novo Lead Vear Tech*\n\n👤 *Nome:* ${newContact.name}\n📧 *Email:* ${newContact.email}\n📱 *Tel:* ${newContact.phone}`,
            from: process.env.TWILIO_PHONE_FROM,
            to: process.env.TWILIO_PHONE_TO
        })
        .then(() => console.log('Notificação WhatsApp enviada com sucesso (Twilio).'))
        .catch(err => console.error('Erro ao enviar notificação WhatsApp:', err.message));

        console.log('Novo lead recebido:', newContact.name);
        return res.status(201).json({ message: 'Contato salvo com sucesso!' });
    } catch (error) {
        console.error("Erro no servidor:", error);
        return res.status(500).json({ error: 'Erro interno ao salvar contato.' });
    }
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});