// import { type Config } from 'jest';

/** @type {import('jest').Config} */
const baseConfig = {
	moduleFileExtensions: ['ts', 'js', 'json'],
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	verbose: true,
	noStackTrace: true,
	silent: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testEnvironmentOptions: {
		localStorage: './.jest-localstorage',
	},
};

module.exports = baseConfig;
