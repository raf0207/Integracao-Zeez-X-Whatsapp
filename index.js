const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

// Configurações do Puppeteer
const puppeteerOptions = {
    headless: false, // Define como false para visualizar o navegador, útil para depuração
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Adiciona argumentos para o Puppeteer
    defaultViewport: null // Configura a visualização padrão
};

// Cria uma nova instância do cliente com as opções do Puppeteer
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: puppeteerOptions
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code gerado! Escaneie com o WhatsApp.');
});

client.on('authenticated', () => {
    console.log('Autenticado com sucesso!');
});

client.on('ready', () => {
    console.log('Cliente pronto!');
});

client.on('message', message => {
    console.log(`Mensagem recebida: ${message.body}`);
});

client.initialize();
