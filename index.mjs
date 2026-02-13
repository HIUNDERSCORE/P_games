import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { createBareServer } from '@tomphttp/bare-server-node';
import path from 'node:path';

const app = express();
const bare = createBareServer('/bare/');
const server = createServer();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uv/', express.static(uvPath));

app.get('/health', (req, res) => res.status(200).send('OK'));

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.route(req, res);
    } else {
        app(req, res);
    }
});

server.on('upgrade', (req, socket, head) => {
    if (bare.shouldRoute(req)) {
        bare.onUpgrade(req, socket, head);
    } else {
        socket.end();
    }
});

const port = process.env.PORT || 10000;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server live on port ${port}`);
});
