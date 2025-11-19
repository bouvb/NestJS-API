import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { after } from 'node:test';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

describe('UsersService', () => {
	let usersService: UsersService;
	// let repository: Repository<User>;

	beforeEach(async () => {
		/* 	
		// const mockRepository = {
		// 	find: jest.fn().mockResolvedValue([]),
		// };

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				// {
				// 	provide: getRepositoryToken(Property),
				// 	useValue: mockRepository,
				// },
			],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
		// repository = module.get<Repository<Property>>(getRepositoryToken(Property));
	 */
		usersService = new UsersService();
	});

	afterAll(() => {
		// return clearDB()
	});

	describe('create', () => {
		it('should create a valid User', () => {
			const result = usersService.create({ name: 'Bob' });

			expect(result).toStrictEqual({ id: 1, name: 'Bob' });
			// test if the instance has the same attributes/structure than the User class
			// expect(result).toBeInstanceOf(User);
			expect(Object.keys(result)).toStrictEqual(Object.keys(new User()));
		});

		it('should create different IDs', () => {
			const firstUser = usersService.create({ name: 'Alice' });
			const secondUser = usersService.create({ name: 'Bob' });

			expect(firstUser.id).not.toEqual(secondUser.id);
		});

		describe('tested validity of createUserDTO', () => {
			it('should throw an error if user name not valid', () => {
				expect(() => usersService.create({ name: '' })).toThrow('Invalid user name.');
				expect(() => usersService.create({ name: undefined as string })).toThrow('Invalid user name.');
			});
		});
	});

	describe('findAll', () => {
		it('should return an empty array if no element', () => {
			const result = usersService.findAll();
			expect(result).toEqual([]);
		});

		it('should return all users', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });

			const result = usersService.findAll();

			expect(result).toEqual([
				{ id: 1, name: 'Alice' },
				{ id: 2, name: 'Bob' },
			]);
		});
	});

	describe('findOne', () => {
		it('should return one existing user', () => {
			usersService.create({ name: 'Alice' });

			const result = usersService.findOne(1);
			expect(result).toEqual({ id: 1, name: 'Alice' });
		});

		it('should return a specific user, not the first nor the last', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });
			usersService.create({ name: 'Charles' });

			const result = usersService.findOne(2);
			expect(result).toEqual({ id: 2, name: 'Bob' });
		});

		it('should return the same user on multiple call', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });

			const firstResult = usersService.findOne(2);
			expect(firstResult).toEqual({ id: 2, name: 'Bob' });
			const secondResult = usersService.findOne(2);
			expect(secondResult).toEqual({ id: 2, name: 'Bob' });
		});

		describe('tested validity of id', () => {
			it("should throw an error if user doesn't exist", () => {
				expect(() => usersService.findOne(1)).toThrow('User not found.');
			});

			it('should throw an error if id not a valid id', () => {
				expect(() => usersService.findOne(-1)).toThrow('Id null or negative.');
			});

			it('should throw an error if id not a number', () => {
				expect(() => usersService.findOne('aaa')).toThrow('Invalid id.');
			});
		});
	});

	describe('update', () => {
		it('should update a valid User', () => {
			usersService.create({ name: 'Bob' });

			const result = usersService.update(1, { name: 'Vanessa' });
			expect(result).toEqual({ id: 1, name: 'Vanessa' });
		});

		it('should update a specific user', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });
			usersService.create({ name: 'Charles' });

			const result = usersService.update(2, { name: 'Vanessa' });
			expect(result).toEqual({ id: 2, name: 'Vanessa' });
		});

		describe('tested validity of inputs (id, updateUserDTO)', () => {
			it("should throw an error if user doesn't exist", () => {
				expect(() => usersService.update(1, { name: 'Vanessa' })).toThrow('User not found.');
			});

			it('should throw an error if id not a valid id', () => {
				expect(() => usersService.update(-1, { name: 'Vanessa' })).toThrow('Id null or negative.');
			});

			it('should throw an error if id not a number', () => {
				expect(() => usersService.update('aaa', { name: 'Vanessa' })).toThrow('Invalid id.');
			});

			it('should throw an error if user name not valid', () => {
				usersService.create({ name: 'Alice' });

				expect(() => usersService.update(1, { name: '' })).toThrow('Invalid user name.');
				expect(() => usersService.update(1, { name: undefined as string })).toThrow('Invalid user name.');
			});
		});
	});

	describe('remove', () => {
		it('should remove a User', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });
			usersService.remove(1);

			expect(usersService.findAll().length).toEqual(1);
		});

		it('should return removed User', () => {
			usersService.create({ name: 'Alice' });

			const result = usersService.remove(1);
			expect(result).toEqual({ id: 1, name: 'Alice' });
		});

		it('should remove a specific user', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob' });
			usersService.create({ name: 'Charles' });

			const result = usersService.remove(2);
			expect(result).toEqual({ id: 2, name: 'Bob' });
		});

		describe('tested validity of id', () => {
			it("should throw an error if user doesn't exist", () => {
				expect(() => usersService.remove(1)).toThrow('User not found.');
			});

			it('should throw an error if id not a valid id', () => {
				expect(() => usersService.remove(-1)).toThrow('Id null or negative.');
			});

			it('should throw an error if id not a number', () => {
				expect(() => usersService.remove('aaa')).toThrow('Invalid id.');
			});
		});
	});

	describe('findOneRoles', () => {
		it('should return roles of one existing user', () => {
			usersService.create({ name: 'Alice', roles: ['admin', 'user'] });

			const result = usersService.findOneRoles(1);
			expect(result).toEqual(['admin', 'user']);
		});

		it('should return roles for a specific user, not the first nor the last', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob', roles: ['admin', 'user'] });
			usersService.create({ name: 'Charles' });

			const result = usersService.findOneRoles(2);
			expect(result).toEqual(['admin', 'user']);
		});

		it('should return roles of the same user on multiple call', () => {
			usersService.create({ name: 'Alice' });
			usersService.create({ name: 'Bob', roles: ['admin', 'user'] });

			const firstResult = usersService.findOneRoles(2);
			expect(firstResult).toEqual(['admin', 'user']);
			const secondResult = usersService.findOneRoles(2);
			expect(secondResult).toEqual(['admin', 'user']);
		});

		describe('tested validity of input', () => {
			it("should throw an error if user doesn't exist", () => {
				expect(() => usersService.findOneRoles(1)).toThrow('User not found.');
			});

			it('should throw an error if id not a valid id', () => {
				expect(() => usersService.findOneRoles(-1)).toThrow('Id null or negative.');
			});

			it('should throw an error if id not a number', () => {
				expect(() => usersService.findOneRoles('aaa')).toThrow('Invalid id.');
			});
		});
	});
});
