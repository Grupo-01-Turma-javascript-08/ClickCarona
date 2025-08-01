import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({ name: "tb_viagens" })

export class Viagem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    enderecoEmbarque: string;

    @Column()
    enderecoDesembarque: string;

    @Column()
    tempoViagem: number;

    @Column()
    distanciaViagem: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.viagens, { onDelete: 'CASCADE' })

    @JoinColumn({ name: "usuario_id" })

    usuario: Usuario;
}