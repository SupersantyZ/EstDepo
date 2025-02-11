import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) { }

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }
  async create(data: CreateCustomerDto) {
    const newCustomer = await this.customerRepo.save(data);
    return newCustomer;
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOne(id);
    this.customerRepo.merge(customer, changes);
    return this.customerRepo.save(customer);
  }

  async remove(id: number) {
    const customer = await this.customerRepo.findOne(id);
    return this.customerRepo.remove(customer);
  }

}
