import { NestFactory } from '@nestjs/core';
// import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
	// choix du framework du HTTP provider ici
	// on reste sur express, on se complexe pas la vie avec fastify
	const app = await NestFactory.create(AppModule);
	// const app = await NestFactory.create<NestFastifyApplication>(
	//   AppModule,
	//   new FastifyAdapter()
	// );

	// choix du prot, du host, etc
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
