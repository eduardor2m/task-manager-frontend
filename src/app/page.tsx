'use client'
import styles from '@/styles/pages/SignUp.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

type IUser = {
  username: string
  email: string
  password: string
}

async function signUp(user: IUser) {
  try {
    const response = await fetch('http://localhost:9090/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      cache: 'no-cache',
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
    } else {
      console.log('Error:', response.status)
    }
  } catch (error) {
    console.log('Error:', error)
  }
}

export default async function SignUp() {
  const router = useRouter()

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.target as HTMLFormElement
    const username = target.username.value
    const email = target.email.value
    const password = target.password.value

    const newUser: IUser = {
      username,
      email,
      password,
    }

    await signUp(newUser)

    router.push('/signin')
  }

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={handleSignUp}>
        <h1 className={styles.title}>Task Manager</h1>
        <h3 className={styles.subtitle}>Crie sua conta</h3>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"
          name="username"
          required
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button className={styles.button} type="submit">
          Cadastrar
        </button>
        <Link href="/signin">
          <p className={styles.link}>
            Já possui uma conta?<span> Faça login</span>
          </p>
        </Link>
      </form>
    </main>
  )
}
