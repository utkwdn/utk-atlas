import Header from './Header';
import Footer from './Footer';
import { ReactNode } from 'react';
import { useState, useEffect } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const [dynamicSrc, setDynamicSrc] = useState<string>('');

  useEffect(() => {
    // Check if url param 'dmc' is set and save to dynamicSrc if so
    const searchParams = new URLSearchParams(document.location.search);
    const srcParam = searchParams.get('dmc');
    if (srcParam) {
      setDynamicSrc(srcParam);
    }
  }, []);

  return (
    <>
      <Header dynamicSrc={dynamicSrc} />
      <main>{children}</main>
      <Footer dynamicSrc={dynamicSrc} />
    </>
  );
}
