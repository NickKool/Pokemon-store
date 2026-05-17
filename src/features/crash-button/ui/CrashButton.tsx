import { useState } from 'react';
import { Button } from '@/shared/ui';

export function CrashButton() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('Error Boundary works (test)');
  }

  return <Button onClick={() => setShouldCrash(true)}>Error Boundary</Button>;
}
