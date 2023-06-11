'use client'

import styles from '@/styles/pages/SignIn.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type IUser = {
  email: string
  password: string
}

async function signIn(user: IUser) {
  try {
    const response = await fetch('http://localhost:9090/api/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      cache: 'no-cache',
    })

    if (response.ok) {
      const data = await response.json()
      // save token in local storage
      localStorage.setItem('token', data)
      console.log(data)
    } else {
      console.log('Error:', response.status)
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

export default async function SignIn() {
  const router = useRouter()

  async function handleSignIn(
    e: React.MouseEvent<HTMLFormElement, MouseEvent>,
  ) {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const email = target.email.value
    const password = target.password.value

    const newUser: IUser = {
      email,
      password,
    }

    await signIn(newUser)

    router.push('/tasks')
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
