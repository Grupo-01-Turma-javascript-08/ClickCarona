import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_viagens" })

export class Viagem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    motorista: string;

    @Column()
    modeloCarro: string;

    @Column()
    enderecoEmbarque: string;

    @Column()
    enderecoDesembarque: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valorPorMinuto: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valorPorKm: number;

    @Column()
    tempoViagem: number;

    @Column()
    tipoPagamento: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.viagens, { onDelete: 'CASCADE' })

    @JoinColumn({ name: "usuario_id" })

    usuario: Usuario;
}