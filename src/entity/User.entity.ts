import { hash } from 'bcryptjs'
import { Field, ID, Int, ObjectType } from 'type-graphql'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert
} from 'typeorm'

import { UserRole } from './user/UserRole.enum'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field({ nullable: true })
  @Column()
  name: string

  @Column('int', { default: 0 })
  tokenVersion: number

  @Field()
  @Column('text', { unique: true })
  email: string

  @Field()
  @Column('text', { unique: true })
  username: string

  @Column()
  password: string

  @Field()
  @Column('bool', { default: false })
  confirmed: boolean

  @Field(() => [UserRole])
  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.USER]
  })
  roles: UserRole[]

  @Field(() => Int, { nullable: true })
  @Column('int', { default: null })
  githubId: number

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 12)
  }
}
