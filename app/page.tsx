import { kv } from "@vercel/kv";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

import { InputName } from "./login/LoginForm";
import styles from "./page.module.css";

interface User {
  id: string;
  name: string;
}

const nameSchema = z.object({
  userName: z.string().min(2).max(20),
});

async function onSubmit(__prevState: unknown, formData: FormData) {
  "use server";
  const users = (await kv.get<User[]>("users")) ?? [];
  console.log(">>>>> [onSubmit] users", users);

  console.log(">>>>> onSubmit called!", Object.fromEntries(formData));
  const zResult = nameSchema.safeParse(Object.fromEntries(formData));
  if (zResult.success) {
    const name = zResult.data.userName;
    console.log(`Hello, ${name}!`);
    await kv.set<User[]>("users", [...users, { id: uuidv4(), name }]);
    return { success: "lala" };
  } else {
    return { errrrrr: zResult.error.flatten().fieldErrors };
  }
}

const visitsKey = "visits";

let a = 0;

export default async function Home() {
  const visits = await kv.incr(visitsKey);
  console.log(">>>>> [Home] visits", visits);
  console.log(">>>>> [Home] a", a++);
  if (!visits) {
    const setRet = await kv.set(visitsKey, 1);
    console.log(">>>>> [Home] setRet", setRet);
    const visitsAfterSet = await kv.get<number>(visitsKey, );
    console.log(">>>>> [Home] visitsAfterSet", visitsAfterSet);
  } else {
    const setRetElse = await kv.set(visitsKey, visits + 1);
    console.log(">>>>> [Home] setRetElse", setRetElse);
    const visitsAfterSetElse = await kv.get<number>(visitsKey);
    console.log(">>>>> [Home] visitsAfterSet", visitsAfterSetElse);
  }

  return (
    <main className={styles.main}>
      <InputName onSubmit={onSubmit} />
      <hr />
      Current users: {visits}
      {/*<ol>*/}
      {/*{users.map(({ id, name }) => (*/}
      {/*  <li key={id}>{name}</li>*/}
      {/*))}*/}
      {/*</ol>*/}
    </main>
  );
}
