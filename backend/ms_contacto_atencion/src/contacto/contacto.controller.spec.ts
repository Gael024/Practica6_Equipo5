import { Test, TestingModule } from '@nestjs/testing';
import { ContactoController } from './contacto.controller';
import { beforeEach, describe, it } from 'node:test';
import expectCookies from 'supertest/lib/cookies';

describe('ContactoController', () => {
  let controller: ContactoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactoController],
    }).compile();

    controller = module.get<ContactoController>(ContactoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
