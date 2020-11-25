import { App } from './app';
import { AuthController } from './controllers';

const app = new App(
  [
    new AuthController(),
  ],
  8000,
);

app.listen();