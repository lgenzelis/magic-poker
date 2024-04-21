"use client";

import { useFormState } from "react-dom";

import styles from "./LoginForm.module.scss";

function InputName({ onSubmit }: { onSubmit: (prevState: unknown, formData: FormData) => unknown }) {
  const [state, formAction] = useFormState(onSubmit, null);

  console.log(">>>>> InputName rendered!", state);

  return (
    <form action={formAction} className={styles.wrapper}>
      <label>Enter your name</label>
      <input type="text" name="userName" className={styles.input} />
      <button className={styles.getIn}>Get in!</button>
    </form>
  );
}

export { InputName };
