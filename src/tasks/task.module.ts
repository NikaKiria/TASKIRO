import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { taskSchema } from './models/task.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class taskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('/groups');
  }
}
