import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { ViagemService } from "../../viagem/services/viagem.service";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private viagemService: ViagemService,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
           relations: ['viagens'],
        });
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
           relations: ['viagens'],
        });

        if (!usuario)
            throw new HttpException('usuário não encontrado!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findAllByName(nome: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: ['viagens'],
        })
    }

    async create(usuario: Usuario): Promise<Usuario> {

        

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        await this.viagemService.findById(usuario.id);

        return await this.usuarioRepository.save(usuario);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.usuarioRepository.delete(id);

    }

}