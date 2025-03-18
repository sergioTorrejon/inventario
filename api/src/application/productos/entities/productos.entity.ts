import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Productos {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 254 })
  categoria: string;
  
  @Column({ type: 'varchar', length: 254 })
  descripcion: string;

  @Column({ type: 'varchar', length: 254 })
  marca: string;

  @Column({ type: 'varchar', length: 254 })
  modelo: string;

  @Column({ type: 'varchar', length: 254 })
  observaciones: string;
  

  //#region 
  /* Estado */
  @Column({ type: 'bool', default: true })
  estado: boolean;
  
  
  /* Campos de Auditoria */
  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_creacion: string;

  @CreateDateColumn({ name: 'fecha_creacion', type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'varchar', length: 50, default: 'Admin' })
  usuario_modificacion: string;

  @UpdateDateColumn({ name: 'fecha_modificacion', type: 'timestamp' })
  fecha_modificacion: Date;
}