const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
	return response.json(repositories);
});

app.post('/repositories', (request, response) => {
	const { title, url, techs } = request.body;
	const id = uuid();
	const repository = {
		id,
		title,
		url,
		techs,
		likes: 0,
	};

	repositories.push(repository);

	return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;

	const repo = repositories.find((repository) => {
		if (repository.id === id) {
			repository.title = title;
			repository.url = url;
			repository.techs = techs;
			return this;
		}
	});

	if (!repo) {
		return response.status(400).json();
	}

	return response.json(repo);
});

app.delete('/repositories/:id', (request, response) => {
	const { id } = request.params;
	const index = repositories.findIndex((repository) => repository.id === id);

	index != -1 ? repositories.splice(index, 1) : response.status(400).json();

	return response.status(204).json();
});

app.post('/repositories/:id/like', (request, response) => {
	const { id } = request.params;

	const findRepositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);

	if (findRepositoryIndex === -1) {
		return response.status(400).json({ error: 'Repository does not exist' });
	}

	repositories[findRepositoryIndex].likes += 1;

	return response.json(repositories[findRepositoryIndex]);
});

module.exports = app;
