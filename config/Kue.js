const Kue = require("Kue");
const queue = Kue.createQueue();
module.exports = queue;