import Link from 'next/link';
import Image from 'next/image';

import logo from 'public/logo.webp';

import styles from './Header.module.sass';

const Header = (): JSX.Element => (
  <header className={styles.Header}>
    <Link href="/">
      <a title="home" className={styles.Link}>
        <Image src={logo} alt="logo" />
      </a>
    </Link>
  </header>
);

export default Header;
