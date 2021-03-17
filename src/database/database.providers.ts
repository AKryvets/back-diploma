import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      configService: ConfigService,
    ): Promise<typeof mongoose> => {
      const host = configService.get<string>('database.host');
      const port = configService.get<string>('database.port');
      const name = configService.get<string>('database.name');

      return mongoose.connect(`mongodb://${host}:${port}/${name}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    },
    inject: [ConfigService],
  },
];
