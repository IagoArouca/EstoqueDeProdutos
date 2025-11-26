import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column('int')
    stock: number;

    @Column({ nullable: true })
    photoUrl: string;

    @Column({ default: 'Geral' })
    category: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdAt: Date;
    
    @UpdateDateColumn({ type: 'timestamp with time zone' })
    updatedAt: Date;
}