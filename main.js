// dotenv pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();

// a variável discord vai ser o meu ponto de entrada pra instanciar objetos do módulo discord.js
const Discord = require('discord.js');
const client = new Discord.Client();

// WOKCommands é um command handler que vai me ajudar a executar meus comandos de maneira mais fácil
const WOKCommands = require('wokcommands');

// const { checarComandos } = require('./functions/checarComando');
const { assinatura } = require('./functions/assinatura');

// usando o prefixo como uma variável pra facilitar a manutenção
const prefix = '>';

// id do servidor de testes
const testesID = '850829150160027698';

// logando erros
client.on('error', err => console.error(err));

// quando o bot estiver pronto, ele vai instanciar o handler do WOK, vai logar uma mensagem no console e setar um status personalizado
client.on('ready', async () => 
{
	new WOKCommands(client,
		{
			commandsDir: '/commands/',
			testServers: [testesID],
			showWarns: false,
			ignoreBots: true,
			disabledDefaultCommands: [
				'help',
				'language',
				'command',
				'prefix',
				'requiredrole',
				'channelonly',
			],
		})
		.setBotOwner(`${process.env.meuID}`)
		.setDefaultPrefix(prefix);
				
	console.log(`${client.user.username} está online.`);

	client.user.setPresence({ status: 'online', activity: { name: '>help 🤖 || Não recebo mensagens no privado >:)', type: 'PLAYING' } });
});

// quando eu chegar no rate limit, vai ser logado a quantidade em segundos do timeout que eu levei
client.on('rateLimit', info => console.log('RATE LIMITED! timeout em segundos: ' + (info.timeout / 1000)));

// logando um aviso de desconexão
client.on('disconnect', () => console.log(`${client.user.username} foi desconectado!`));

// logando todas as mensagens que começam com o prefixo do bot. também bloqueando as mensagens que são enviadas no privado do bot ou que são de bots
client.on('message', mensagem => 
{
	if (mensagem.channel.type === 'dm' || mensagem.author.bot === true) return;

	if (mensagem.content.startsWith(prefix))
	{
		console.log(`${mensagem.author.username} disse: "${mensagem.content}" no servidor "${mensagem.guild.name}"`);
	}
	
	assinatura(mensagem);
});

// login do bot com token
client.login(process.env.BOT_TOKEN);