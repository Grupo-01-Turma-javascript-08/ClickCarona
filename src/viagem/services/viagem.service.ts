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
        return await this.viagemRepository.find({
            relations: ['usuario'],
        });

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
            relations: ['usuario'],


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

    async calculoTempoViagem(id: number, velocidade: number): Promise<TempoViagemType> {

        let viagem = await this.findById(id)

        if (viagem.distanciaViagem <= 0 || velocidade <= 0) {
            throw new HttpException('Distância e velocidade devem ser maiores que zero.', HttpStatus.CONTENT_DIFFERENT);
        }

        let tempoHoras = viagem.distanciaViagem / velocidade;
        let horas = Math.floor(tempoHoras);
        let minutos = Math.round((tempoHoras - horas) * 60);

        return {
            tempo: `${horas} hora(s) e ${minutos} minuto(s)`,
            horas,
            minutos,
            distancia: viagem.distanciaViagem,
            velocidade
        };
    }

}

export type TempoViagemType = {
    tempo: string;
    horas: number;
    minutos: number;
    distancia: number;
    velocidade: number;
};