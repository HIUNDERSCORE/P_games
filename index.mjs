import compression from 'compression'; // Add this to your package.json dependencies
// ... rest of your imports

const app = express();
app.use(compression()); // This shrinks the data sent to your browser, making it load faster
import express from 'express';
import { createServer } from 'node:http';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import { createBareServer } from '@tomphttp/bare-server-node';

const app = express();
const bare = createBareServer('/bare/');
const server = createServer();
app.get('/health', (req, res) => res.status(200).send('OK'));

app.use(express.static('public'));
app.use('/uv/', express.static(uvPath));

server.on('request', (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.route(req, res);
    } else {
        app(req, res);
    }
});

const port = process.env.PORT || 8080;
server.listen(port, '0.0.0.0');
