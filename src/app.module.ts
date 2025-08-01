import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViagemModule } from './viagem/viagem.module';
import { UsuarioModule } from './usuario/usuario.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { Viagem } from './viagem/entities/viagem.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Usuario,Viagem],
      synchronize: true,
      logging: true,
    }),
    UsuarioModule,
    ViagemModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
