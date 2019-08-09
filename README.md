# github-azure-kafka-event-queue

Sync API for GitHub and Azure DevOps to Kafka event queue


# Azure configuration

1. Change team process to Agile
2. Configure Service Hook -> Webhook -> Work item created

## Tests

1. Run container:
```
$ docker run --rm --net=host landoop/fast-data-dev
```

2. Run tests:

```
$ npm run test
```