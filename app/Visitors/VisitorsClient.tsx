"use client";

import { useRouter } from "next/navigation";

import { incrementCount } from "./incrementCount";

export function VisitorsClient({
  redisCounter,
}: {
  redisCounter: number | null;
}) {
  const router = useRouter();
  console.log(">>>>> Rendering VisitorsClient", redisCounter);

  const onClick = () => {
    incrementCount()
      .then((updatedRedisCounter) => {
        console.log(
          ">>>>> [VisitorsClient - incrementCount] updatedRedisCounter",
          updatedRedisCounter,
        );
      })
      .catch((err) => {
        console.error(">>>>> [VisitorsClient - incrementCount] error", err);
      }).finally(() => router.refresh());
  };

  return (
    <>
      <h2>VisitorsClient - redisCounter: {redisCounter}</h2>
      <input type="text" placeholder="Enter your name" />
      <button onClick={onClick}>Increment redisCounter</button>
    </>
  );
}
