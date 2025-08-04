import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Viagem } from "../entities/viagem.entity";
import { TempoViagemType, ViagemService } from "../services/viagem.service";

@Controller('/viagens')
export class ViagemController {
    constructor(private readonly viagemService: ViagemService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Viagem[]> {
        return this.viagemService.findAll();
    }

    calculoTempoViagem(
        @Query('id', ParseIntPipe) id: number,
        @Query('velocidade', ParseIntPipe) velocidade: number,
    ): Promise<TempoViagemType> {
        return this.viagemService.calculoTempoViagem(id, velocidade);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Viagem> {
        return this.viagemService.findById(id);
    }

    @Get('/enderecoembarque/:enderecoEmbarque')
    @HttpCode(HttpStatus.OK)
    findAllByEnderecoEmbarque(@Param('enderecoEmbarque') enderecoEmbarque: string): Promise<Viagem[]> {
        return this.viagemService.findAllByEnderecoEmbarque(enderecoEmbarque);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() viagem: Viagem): Promise<Viagem> {
        return this.viagemService.create(viagem);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() viagem: Viagem): Promise<Viagem> {
        return this.viagemService.update(viagem);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.viagemService.delete(id);
    }
}