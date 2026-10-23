import UsersHero from './components/UsersHero/UsersHero';
import UsersSteps from './components/UsersSteps/UsersSteps';
import UsersCategories from './components/UsersCategories/UsersCategories';
import KotySection from './components/KotySection/KotySection';
import UsersFaq from './components/UsersFaq/UsersFaq';

export default function UsersPage() {
  return (
    <main>
      <UsersHero />
      <UsersSteps />
      <UsersCategories />
      <UsersFaq />
      <KotySection />
    </main>
  );
}
