import HardWorker from './modules/hard-worker.js';

const worker = new HardWorker();

worker.name = 'Bob';
worker.age = 25;
worker.salary = 3500;

console.log(worker.toObject());