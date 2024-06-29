'use server';

import { kv } from '@vercel/kv';

export async function incrementCount() {
  const redisCounter = await kv.get<number>("redisCounter");
  console.log('>>>>> [incrementCount] redisCounter - prev', redisCounter);
  const incResult = await kv.incr("redisCounter");
  console.log('>>>>> [incrementCount] redisCounter - after', incResult);
  return incResult;
}
