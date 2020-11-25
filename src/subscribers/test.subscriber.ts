import {eventEmitter} from './index';

eventEmitter.on('test', async ( data: any) => {
  console.log(data, 'test')
});

export default eventEmitter;