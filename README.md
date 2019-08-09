# github-azure-kafka-event-queue

Sync API for GitHub and Azure DevOps to Kafka event queue


## Installation

### Run kafka
```
$ docker run --rm --net=host landoop/fast-data-dev
```

### Run ngrok

```
$ ./ngrok http 3001
```

Get ngrok https url and use it to configure Github and Azure Devops webhooks

### Run backend

```
$ npm install
$ npm run dev
```

### Github configuration
1. Register webhook for github repo, specify URL:
```
https://{ngrokaddress}/api/events/github
```
2. Specify secret key (and store it at `config/index.js` **GITHUB_SECRET**) 
3. Select following events: **Issue comments** and **Issues**
4. Select active checkbox

Done

### Azure configuration

1. Change team process to Agile
2. Configure Service Hook -> Webhook -> Work item created
```
https://{ngrokaddress}/api/events/azure
```
3. Specify username and password for basic auth 
4. Store username and password at `config/index.js`:
```
AZURE_USERNAME
AZURE_PASSWORD
``` 

Repeat 2 and 4 step for each event type:
```
workitem.updated
workitem.created
workitem.deleted
workitem.restored
workitem.updated
workitem.commented
```

Done

## Tests

1. Run container:
```
$ docker run --rm --net=host landoop/fast-data-dev
```

2. Run tests:

```
$ npm run test
```