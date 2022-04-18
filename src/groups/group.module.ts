import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authMiddleware } from 'src/middlewares/auth.middleware';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { groupSchema } from './models/group.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Group', schema: groupSchema }]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class groupModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authMiddleware).forRoutes('/groups');
  }
}
