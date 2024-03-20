// Include output for storage queue
const { app, output } = require('@azure/functions');

// Setup connection to storage queue
const queueOutput = output.storageQueue({
    queueName: 'order-service',
    connection: 'StorageConnectionString'
});

app.http('HttpTrigger', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    extraOutputs: [queueOutput], // tell our function we are using this output queue
    handler: async (request, context) => {
        
        // Get the json from the http request
        const json = await request.json();
        console.log("Function executed - Json received:", json);

        // TO-DO: validate the incoming data
        
        // Send order to storage queue
        context.extraOutputs.set(queueOutput, json);

        return { body: "Success - order submitted to queue." };
    }
});
