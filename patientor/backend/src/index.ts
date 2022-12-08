import express from 'express';
import { Request } from 'express';
import cors from 'cors';

const app = express();
app.use(cors<Request>());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
	console.log('Server pinged');
	res.send('pong');
});

app.use('/api/diagnoses');

const PORT = 3001;

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
