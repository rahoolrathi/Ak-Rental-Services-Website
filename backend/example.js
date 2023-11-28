const uuid = require('uuid');

// Generate a standard UUID (36 characters)
const standardUuid = uuid.v4();
const truncatedUuid = standardUuid.substring(0, 10);
console.log('Truncated UUID:', truncatedUuid);
