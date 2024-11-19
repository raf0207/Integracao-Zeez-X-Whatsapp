Integração Zeez x WhatsApp

Este projeto utiliza a biblioteca `whatsapp-web.js` para integrar o WhatsApp com outros sistemas. A seguir estão as instruções detalhadas para configurar e executar o projeto em um servidor.

REQUISITOS

- Node.js (versão 18.x ou superior)
- NPM (gerenciador de pacotes do Node.js)
- Git (para clonar o repositório)
- Xvfb (servidor virtual de exibição)

PASSO A PASSO PARA INSTALAÇÃO

1. Acesse o servidor via SSH:
   ssh username@ip-do-servidor

2. Atualize os pacotes do sistema:
   sudo apt update && sudo apt upgrade -y

3. Instale o Node.js e o NPM:
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

4. Instale o Xvfb (servidor virtual de exibição):
   sudo apt install -y xvfb

5. Instale o Git (se necessário):
   sudo apt install -y git

6. Clone o repositório do projeto:
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio

7. Instale as dependências do projeto:
   npm install

8. Crie a pasta para armazenar os dados do WhatsApp:
   mkdir ./data

CONFIGURAÇÃO DO PUPPETEER

Como este projeto utiliza o Puppeteer, é necessário configurar um servidor virtual de exibição com o `Xvfb`.

1. Inicie o `Xvfb`:
   Xvfb :99 -ac &

2. Configure a variável de ambiente `DISPLAY`:
   export DISPLAY=:99

3. Execute o servidor do projeto:
   node server.js

Se tudo estiver configurado corretamente, o servidor estará escutando na porta 3001.

MANTER O SERVIDOR EM EXECUÇÃO

Para garantir que o servidor continue rodando após desconectar do SSH, você pode usar as opções abaixo:

USANDO `tmux` OU `screen`

1. Instale o `tmux`:
   sudo apt install tmux

2. Inicie uma sessão no `tmux`:
   tmux new -s whatsapp

3. Execute o servidor dentro do `tmux`:
   node server.js

4. Para desconectar do `tmux` sem interromper o processo, pressione `Ctrl+B` seguido de `D`.

USANDO O PM2

1. Instale o PM2 globalmente:
   npm install -g pm2

2. Inicie o servidor com o PM2:
   pm2 start server.js --name whatsapp

3. Verifique o status do servidor:
   pm2 list

BACKUP E MIGRAÇÃO

Se precisar migrar o projeto para outro servidor e deseja manter as sessões do WhatsApp:

1. Copie a pasta `./data` do servidor antigo para o novo:
   scp -r ./data username@ip-do-novo-servidor:/caminho-do-projeto/

2. No novo servidor, inicie o projeto normalmente, e ele utilizará os dados existentes.

SOLUÇÃO DE PROBLEMAS

Erro: `Missing X server or $DISPLAY`

Certifique-se de que o `Xvfb` está rodando e que a variável `DISPLAY` está configurada:
   Xvfb :99 -ac &
   export DISPLAY=:99

Erro: `Cannot establish any listening sockets`

Verifique se outro processo do `Xvfb` já está rodando:

1. Liste os processos ativos:
   ps aux | grep X

2. Finalize o processo existente:
   kill -9 PID

Substitua `PID` pelo ID do processo retornado.

TESTANDO O PROJETO

Para testar se o servidor está funcionando corretamente:

1. Abra o navegador e acesse:
   http://ip-do-servidor:3001

2. Um QR code será exibido para conectar o WhatsApp.

Com essas instruções, você poderá configurar e rodar o projeto em qualquer servidor compatível.
