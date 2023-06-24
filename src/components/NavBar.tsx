import styles from '@/styles/components/NavBar.module.scss'
import Image from 'next/image'

export const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo" width={100} height={50} />
      </div>
    </nav>
  )
}
