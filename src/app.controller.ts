import { Controller, Get, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import type { Request } from 'express';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello(@Req() request: Request): string {
		return `${this.appService.getHello()}\n\nrequest header content type :\n${JSON.stringify(request.headers['content-type'])}`;
	}

	@Get('github-repository')
	@Redirect('https://github.com/bouvb/NestJS-API', 302)
	getGitHubRepository() {}
}
