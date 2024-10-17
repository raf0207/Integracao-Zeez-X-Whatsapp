const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const bodyParser = require('body-parser');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer-core');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configuração do cliente WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: false,
        executablePath: '/usr/bin/chromium', // Ajuste o caminho, se necessário
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('QR code gerado!');
});

client.on('ready', () => {
    console.log('Cliente pronto!');
});

client.on('authenticated', () => {
    console.log('Cliente autenticado!');
});

client.on('auth_failure', message => {
    console.error('Falha na autenticação:', message);
});

client.on('disconnected', (reason) => {
    console.log('Cliente desconectado:', reason);
});

// Endpoint para enviar mensagens
app.post('/send-message', async (req, res) => {
    const { number, message } = req.body;
    if (!number || !message) {
        return res.status(400).send('Número e mensagem são necessários.');
    }

    try {
        // Corrigido: Enviar mensagem diretamente
        await client.sendMessage(`${number}@c.us`, message);
        res.status(200).send('Mensagem enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).send('Erro ao enviar mensagem.');
    }
});

client.initialize();

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});
