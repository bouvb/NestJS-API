import { Config } from 'jest';

const config: Config = {
	moduleFileExtensions: ['ts', 'js', 'json'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testEnvironmentOptions: {
		localStorage: './.jest-localstorage',
	},
};

export default config;
