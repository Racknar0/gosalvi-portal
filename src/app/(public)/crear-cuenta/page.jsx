import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { getCountries, getCountryCities } from '@/services/LocationCatalogService';
import { DEFAULT_LOCATION } from '@/helpers/locationDefaults';

export default function CreateAccountPage() {
  return <RegistrationForm countries={getCountries()} initialCities={getCountryCities(DEFAULT_LOCATION.countryCode)} />;
}
