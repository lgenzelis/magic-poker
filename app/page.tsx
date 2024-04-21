import z from "zod";

import { InputName } from "./login/LoginForm";
import styles from "./page.module.css";

const nameSchema = z.object({
  userName: z.string().min(2).max(20),
});

async function onSubmit(__prevState: unknown, formData: FormData) {
  "use server";
  console.log(">>>>> onSubmit called!", Object.fromEntries(formData));
  const zResult = nameSchema.safeParse(Object.fromEntries(formData));
  if (zResult.success) {
    const name = zResult.data.userName;
    console.log(`Hello, ${name}!`);
    return { success: "lala" };
  } else {
    return { errrrrr: zResult.error.flatten().fieldErrors };
  }
}

export default function Home() {
  console.log(">>>>> Home rendered!");

  return (
    <main className={styles.main}>
      <InputName onSubmit={onSubmit} />
    </main>
  );
}
