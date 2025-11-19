import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
	private users: User[] = [];
	private currentId = 1;

	// inject rep/db in service dependecies/constructor arguments
	constructor() {}

	private idValidation(id: number) {
		if (isNaN(id)) throw new Error('Invalid id.');
		if (id <= 0) throw new Error('Id null or negative.');
	}

	private getUserIndex(id: number) {
		this.idValidation(id);

		const userIndex: number = this.users.findIndex((user) => user.id === id);

		if (userIndex === -1) throw new Error('User not found.');

		return userIndex;
	}

	private getUser(id: number) {
		return this.users[this.getUserIndex(id)];
	}

	create(createUserDto: CreateUserDto) {
		// test every required attribute here
		// TODO: create a validity function for the CreateUserDTO
		// throw new Error('Invalid new user structure');

		//  add logger here : this.logger.error('Invalid name);
		if (!createUserDto.name) throw new Error('Invalid user name.');

		const newUser: User = {
			id: this.currentId++,
			...createUserDto,
		};

		this.users.push(newUser);
		return this.users.at(-1);
	}

	findAll() {
		return this.users;
	}

	findOne(id: number) {
		return this.getUser(id);
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		// test every required attribute here
		// TODO: create a validity function for the UpdateUserDto
		// throw new Error('Invalid updated user structure');
		if (!updateUserDto.name) throw new Error('Invalid user name.');

		const userIndex = this.getUserIndex(id);

		const updatedUser: User = {
			...this.users[userIndex],
			name: updateUserDto.name,
		};

		this.users[userIndex] = updatedUser;

		return this.users[userIndex];
	}

	remove(id: number) {
		const userIndex = this.getUserIndex(id);

		const user = this.users[userIndex];
		this.users.splice(userIndex, 1);

		return user;
	}

	findOneRoles(id: number) {
		const user = this.getUser(id);

		return `This action returns the roles from the #${id} user`; // roles not implemented yet
	}
}
