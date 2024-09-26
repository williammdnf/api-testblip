const http = require('http');
const https = require('https');
const PORT = process.env.PORT || 3000;

const handler = (request, response) => {
    const { url, method } = request;
    const [first, route, org] = url.split('/');

    if (route === 'github' && org === 'takenet') {
        const options = {
            hostname: 'api.github.com',
            path: '/orgs/takenet/repos',
            method: 'GET',
            headers: { 'User-Agent': 'williammdnf',
                       'Authorization': `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`
                    }
        };

        https.get(options, (githubRes) => {
            let data = '';

            // Salva informações
            githubRes.on('data', chunk => {
                data += chunk;
            });

            // Grava o retorno final
            githubRes.on('end', () => {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(data);
            });

        // Em caso de erro 500 irá enviar a resposta 'Erro ao acessar o GitHub'
        }).on('error', (err) => {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Error ao acessar o GitHub');
        });
     
    // Se o retorno for 404 irá enviar a responsta 'Não existe ou não encontrado'    
    } else {
        response.writeHead(404, { 'Content-Type': 'text/plain' });
        response.end('Nao existe ou nao encontrado');
    }
};

http.createServer(handler)
    .listen(PORT, () => console.log('Servidor executando na porta ', PORT));
