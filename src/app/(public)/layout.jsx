import PublicHeader from './components/PublicHeader/PublicHeader';

export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      {children}
    </>
  );
}
