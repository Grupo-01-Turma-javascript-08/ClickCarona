import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './entities/usuario.entity';
import { UsuarioController } from './controllers/usuario.controller';
import { ViagemModule } from '../viagem/viagem.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), ViagemModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [TypeOrmModule],
})
export class UsuarioModule{}