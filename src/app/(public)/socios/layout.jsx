import './layout.scss';

export default function PartnersLayout({ children }) {
  return (
    <div className="partner-portal">
      <main className="partner-portal__main">{children}</main>
    </div>
  );
}
