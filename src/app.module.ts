import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";
import { UsersModule } from "./users/users.module";
import {TasksModule} from './tasks/tasks.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
