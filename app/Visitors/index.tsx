// import { useState } from 'react';
import { kv } from '@vercel/kv';
import { VisitorsClient } from '@/app/Visitors/VisitorsClient';

async function Visitors() {
  const redisCounter = await kv.get<number>("redisCounter");

  return (
    <div>
      <h1>Visitors: {redisCounter}</h1>
      <VisitorsClient redisCounter={redisCounter} />
    </div>
  );
}

export { Visitors };
