import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Viagem } from "../entities/viagem.entity";

@Injectable()
export class ViagemService {
    constructor(
        @InjectRepository(Viagem)
        private viagemRepository: Repository<Viagem>
    ) { }

    async findAll(): Promise<Viagem[]> {
        return await this.viagemRepository.find();
    }

    async findById(id: number): Promise<Viagem> {
        let viagem = await this.viagemRepository.findOne({
            where: {
                id
            },
        });

        if (!viagem)
            throw new HttpException('Viagem não achada!', HttpStatus.NOT_FOUND);

        return viagem;
    }
    async findAllByEnderecoEmbarque(enderecoEmbarque: string): Promise<Viagem[]> {
        return await this.viagemRepository.find({
            where: {
                enderecoEmbarque: ILike(`%${enderecoEmbarque}%`)
            },
            relations: {
                usuario: true
            }
        })
    }

    async create(Viagem: Viagem): Promise<Viagem> {
        return await this.viagemRepository.save(Viagem);
    }

    async update(viagem: Viagem): Promise<Viagem> {

        await this.findById(viagem.id)

        return await this.viagemRepository.save(viagem);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id)

        return await this.viagemRepository.delete(id)
    }

}