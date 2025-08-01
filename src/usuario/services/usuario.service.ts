import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private viagemService: ViagemService,
    ) { }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                viagem: true
            }
        });
    }

    async findById(id: number): Promise<Usuario> {

        let Usuario = await this.usuarioRepository.findOne({
            where: {
                id
            },
            relations: {
                viagem: true
            }
        });

        if (!Usuario)
            throw new HttpException('usuário não encontrada!', HttpStatus.NOT_FOUND);

        return usuario;
    }

    async findAllByTitulo(titulo: string): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },
            relations: {
                viagem: true
            }
        })
    }

    async create(usuario: UsuarioService): Promise<usuario> {

        await this.viagemService.findById(usuario.viagem.id);

        return await this.usuarioRepository.save(usuario);
    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(Usuario.id);

        await this.viagemService.findById(usuario.viagem.id);

        return await this.postagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.postagemRepository.delete(id);

    }

}