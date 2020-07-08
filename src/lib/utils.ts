import { DevtoClient } from './devto-client';

if (!process.env.DEV_TO_TOKEN) {
  throw new Error('Environment variable DEV_TO_TOKEN not found');
}

export const client = new DevtoClient(process.env.DEV_TO_TOKEN);

export const sleep = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));
