import MerchantsHero from './components/MerchantsHero/MerchantsHero';
import MerchantsBenefits from './components/MerchantsBenefits/MerchantsBenefits';
import MerchantsSteps from './components/MerchantsSteps/MerchantsSteps';
import MerchantsFaq from './components/MerchantsFaq/MerchantsFaq';
import MerchantsCustomerBanner from './components/MerchantsCustomerBanner/MerchantsCustomerBanner';
import './page.scss';

export default function MerchantsPage() {
  return (
    <main className="merchants-page">
      <MerchantsHero />
      <MerchantsBenefits />
      <MerchantsSteps />
      <MerchantsFaq />
      <MerchantsCustomerBanner />
    </main>
  );
}
