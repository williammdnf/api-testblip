const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 3000;

// Colocar o token como variável de ambiente
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const handler = (request, response) => {
    const { url, method } = request;
    const urlParts = url.split('/');

    if (urlParts.length >= 3 && urlParts[1] === 'github' && urlParts[2] === 'takenet') {
        const options = {
            hostname: 'api.github.com',
            path: '/orgs/takenet/repos',
            method: 'GET',
            headers: {
                'User-Agent': 'williammdnf',
                'Authorization': `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`
            }
        };

        https.get(options, (githubRes) => {
            let data = '';

            githubRes.on('data', chunk => {
                data += chunk;
            });

            githubRes.on('end', () => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            });

        }).on('error', (err) => {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Erro ao acessar o GitHub');
        });

    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Não existe ou não encontrado');
    }
};

http.createServer(handler)
    .listen(PORT, () => console.log(`Servidor executando na porta ${PORT}`));
