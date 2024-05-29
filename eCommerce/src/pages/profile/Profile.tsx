import { useEffect } from 'react';
import DividerWithText from '../../components/UI/divider-with-text/DividerWithText.tsx';
import Footer from '../../components/UI/footer/Footer.tsx';
import Header from '../../components/UI/header/Header.tsx';
import InputDate from '../../components/UI/inputs/input-date/InputDate.tsx';
import InputEmail from '../../components/UI/inputs/input-email/InputEmail.tsx';
import InputFirstName from '../../components/UI/inputs/input-first-name/InputFirstName.tsx';
import InputLastName from '../../components/UI/inputs/input-last-name/InputLastName.tsx';
import InputPassword from '../../components/UI/inputs/input-password/InputPassword.tsx';
import styles from './Profile.module.css';
import { RegistrationService } from '../../services/RegistrationService.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useUserPersonalData } from '../../context/UserPersonalDataContext.tsx';
/* import { useUserPersonalData } from '../../context/UserPersonalDataContext.tsx';
import { useAddresses } from '../../context/AddressesContext.tsx';
 */
function Profile() {
  const auth = useAuth();
  // const { email, password, passwordError, emailError, setAuth } = { ...auth };
  const { setAuth } = { ...auth };
  const userPersonalData = useUserPersonalData();
  // const { firstName, firstNameError, lastName, lastNameError, dateOfBirth, dateOfBirthError } = { ...userPersonalData };
  const { setData } = { ...userPersonalData };
  // const addressesState = useAddresses();
  // const { setAddresses, currentAddressBilling, currentAddressShipping } = { ...addressesState };

  useEffect(() => {
    const loadUser = async () => {
      const response = await RegistrationService.getCustomer();
      const { customer } = response;
      if (!customer) {
        console.log('something error fetch getCustomer');
        return;
      }

      setAuth({ ...auth, email: customer.email, password: customer.password || '' });
      setData({
        ...userPersonalData,
        firstName: customer.firstName ?? '',
        lastName: customer.lastName ?? '',
        dateOfBirth: customer.dateOfBirth ?? '',
      });
    };
    loadUser();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.mainContainer}>
        <DividerWithText text="Personal data" />
        <div className={styles.personalData}>
          <InputEmail size="small" />
          <InputPassword size="small" />
          <InputFirstName />
          <InputLastName />
          <InputDate />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
