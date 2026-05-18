require('dotenv').config();
const { handler } = require('./lambda');


async function write() {
    const result = await handler({
        action: 'write',
        key: 'testKey1',
        value: 'testValue',
        expiry: 3600
    });
    return result;
}

async function read() {
    const result = await handler({
        action: 'read',
        key: 'testKey1'
    });
    return result;
}

write().then((result) => console.log(result)).catch(console.error);
//read().then((result) => console.log(result)).catch(console.error);

// {
//     "action": "write",
//     "key": "testKey1",
//     "value": "testValue",
//     "expiry": 3600
// }