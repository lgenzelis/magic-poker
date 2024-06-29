// import { unstable_noStore as noStore } from "next/cache";
import { kv } from "@vercel/kv";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

// import { InputName } from "./login/LoginForm";
import styles from "./page.module.css";
import { Visitors } from '@/app/Visitors';

interface User {
  id: string;
  name: string;
}

// const nameSchema = z.object({
//   userName: z.string().min(2).max(20),
// });

// async function onSubmit(__prevState: unknown, formData: FormData) {
//   "use server";
//   const users = (await kv.get<User[]>("users")) ?? [];
//   console.log(">>>>> [onSubmit] users", users);
//
//   console.log(">>>>> onSubmit called!", Object.fromEntries(formData));
//   const zResult = nameSchema.safeParse(Object.fromEntries(formData));
//   if (zResult.success) {
//     const name = zResult.data.userName;
//     console.log(`Hello, ${name}!`);
//     await kv.set<User[]>("users", [...users, { id: uuidv4(), name }]);
//     return { success: "lala" };
//   } else {
//     return { errrrrr: zResult.error.flatten().fieldErrors };
//   }
// }


export const dynamic = 'force-dynamic';
export const revalidate = 0;

// async function CurrentUsers() {
//   noStore();
//   const users = (await kv.get<User[]>("users")) ?? [];
//
//   return (
//     <div>
//       Current users
//       <ol>
//         {users.map(({ id, name }) => (
//           <li key={id}>{name}</li>
//         ))}
//       </ol>
//     </div>
//   );
// }

export default async function Home() {
  const redisCounter = await kv.get<number>("redisCounter");
  console.log(">>>>> [Home] redisCounter", redisCounter);

  return (
    <main className={styles.main}>
      <i>root</i> redisCounter: {JSON.stringify(redisCounter)}
      <Visitors />
      {/*<InputName onSubmit={onSubmit} />*/}
      {/*<CurrentUsers />*/}
    </main>
  );
}
