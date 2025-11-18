// import { type Config } from 'jest';
// import baseConfig from './jest-base.config';
const baseConfig = require('../jest-base.config');

/** @type {import('jest').Config} */
const e2eConfig = {
	...baseConfig,
	rootDir: '.',
	testRegex: '.e2e-spec.ts$',
};

module.exports = e2eConfig;
