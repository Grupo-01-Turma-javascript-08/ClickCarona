import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Viagem } from "../../viagem/entities/viagem.entity";

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dataCadastro: Date;

    @OneToMany(() => Viagem, (viagem) => viagem.usuario)
    viagens: Viagem[];
}

