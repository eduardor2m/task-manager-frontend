'use client'

import { useUser } from '@/hooks/useUser'
import styles from '@/styles/pages/SignIn.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type IUser = {
  email: string
  password: string
}

export default function SignIn() {
  const router = useRouter()
  const { signin } = useUser()

  async function handleSignIn(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const email = target.email.value
    const password = target.password.value

    const user: IUser = {
      email,
      password,
    }

    try {
      await signin(user.email, user.password)
      router.push('/tasks')
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSignIn}>
        <h1 className={styles.title}>Task Manager</h1>
        <h3 className={styles.subtitle}>Faça login para acessar sua conta</h3>
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          name="email"
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
        />
        <input className={styles.button} type="submit" value="Entrar" />
        <Link href="/">
          <p className={styles.link}>
            Não possui uma conta?<span> Cadastre-se</span>
          </p>
        </Link>
      </form>
    </main>
  )
}
