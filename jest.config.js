// import { type Config } from 'jest';
// import baseConfig from './jest-base.config';
const baseConfig = require('./jest-base.config');

/** @type {import('jest').Config} */
const config = {
	...baseConfig,
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
};

module.exports = config;
