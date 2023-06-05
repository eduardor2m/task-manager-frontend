'use client'

import styles from '@/styles/pages/SignUp.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type IUser = {
  username: string
  email: string
  password: string
}

export default function SignUp() {
  const [user, setUser] = useState<IUser>({} as IUser)
  const router = useRouter()

  function handlePage(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
    e.preventDefault()
    console.log(user)
    router.push('/tasks')
  }

  return (
    <main className={styles.container} onSubmit={handlePage}>
      <form className={styles.form}>
        <h1 className={styles.title}>Task Manager</h1>
        <h3 className={styles.subtitle}>Crie sua conta</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUser({
              ...user,
              username: e.target.value,
            })
          }}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setUser({
              ...user,
              email: e.target.value,
            })
          }}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({
              ...user,
              password: e.target.value,
            })
          }}
        />
        <input className={styles.button} type="submit" value="Cadastrar" />
        <Link href="/signin">
          <p className={styles.link}>
            Já possui uma conta?<span> Faça login</span>
          </p>
        </Link>
      </form>
    </main>
  )
}
