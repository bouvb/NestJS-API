import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication<App>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe('redirections', () => {
		it('should redirect to the GitHub repository', () => {
			return request(app.getHttpServer())
				.get('/github-repository') // try my redirection path
				.expect(302)
				.expect('Location', 'https://github.com/bouvb/NestJS-API');
		});
	});

	describe('others', () => {
		it('should show "Hello World !"', () => {
			return request(app.getHttpServer())
				.get('/') // try home page
				.expect(200)
				.expect('Hello World!');
		});
	});
});
