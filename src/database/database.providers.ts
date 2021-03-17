import * as mongoose from "mongoose";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: "DATABASE_CONNECTION",
    useFactory: async (
      configService: ConfigService
    ): Promise<typeof mongoose> => {
      const connectionString = configService.get<string>(
        "database.connectionString"
      );

      return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
    },
    inject: [ConfigService],
  },
];
