import Link from 'next/link'

import styles from './Footer.module.scss'

const Footer = (): JSX.Element => (
  <footer className={styles.footer}>
    <span className={styles.span}>
      <Link href='/' className='flex'>
        <p className='mr-1'>© 2023 </p>
        <p className='hover:underline'>TretStudio™</p>
        <p> . All Rights Reserved.</p>
      </Link>
    </span>
    <ul className={styles.ul}>
      <li>
        <Link href='/' className={styles.li}>
          About
        </Link>
      </li>
      <li>
        <Link href='/' className={styles.li}>
          Privacy Policy
        </Link>
      </li>
      <li>
        <Link href='/' className={styles.li}>
          Licensing
        </Link>
      </li>
      <li>
        <Link href='/' className={styles.li}>
          Contact
        </Link>
      </li>
    </ul>
  </footer>
)

export default Footer
