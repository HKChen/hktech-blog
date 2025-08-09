import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import type {Props} from '@theme/Navbar/Search';
import SearchButton from '@site/src/components/SearchButton';

import styles from './styles.module.css';

export default function NavbarSearch({className}: Props): ReactNode {
  return (
    <div className={clsx(className, styles.navbarSearchContainer)}>
      <SearchButton />
    </div>
  );
}
