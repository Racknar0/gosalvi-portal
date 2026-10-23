import PublicHeader from './components/PublicHeader/PublicHeader';
import PublicFooter from './components/PublicFooter/PublicFooter';

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      {children}
      <PublicFooter />
    </>
  );
}
