import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import TVNoiseBackground from '@site/src/components/TVNoiseBackground';
import type {Props} from '@theme/Layout';

export default function Layout(props: Props): JSX.Element {
  return (
    <>
      <TVNoiseBackground />
      <OriginalLayout {...props} />
    </>
  );
}