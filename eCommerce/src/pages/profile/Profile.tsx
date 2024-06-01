import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
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
import AddressTable from '../../components/address-table/AddressTable.tsx';
import { Address, useAddresses } from '../../context/AddressesContext.tsx';

function Profile() {
  const auth = useAuth();
  const { email, password, passwordError, emailError, setAuth } = { ...auth };

  const userPersonalData = useUserPersonalData();
  const { firstName, firstNameError, lastName, lastNameError, dateOfBirth, dateOfBirthError } = { ...userPersonalData };
  const addressesState = useAddresses();
  const { addresses } = { ...addressesState };
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    setIsLoading(true);
    setIsEdit(false);
    const response = await RegistrationService.getCustomer();
    const { customer } = response;
    if (!customer) {
      console.log('something error fetch getCustomer');
      return;
    }

    setAuth({ ...auth, email: customer.email, password: customer.password || '' });
    userPersonalData.setData({
      ...userPersonalData,
      firstName: customer.firstName ?? '',
      lastName: customer.lastName ?? '',
      dateOfBirth: customer.dateOfBirth ?? '',
    });

    const newAddresses: Address[] = [];

    customer.addresses.forEach(({ country, city, streetName, postalCode, id }) => {
      newAddresses.push({
        country,
        city: city || '',
        street: streetName || '',
        postalCode: postalCode || '',
        default: id === customer.defaultBillingAddressId || id === customer.defaultShippingAddressId,
        shipping: !customer.billingAddressIds?.find((el) => el === id),
        billing: !customer.shippingAddressIds?.find((el) => el === id),
        key: uuidv4(),
        id,
      });
    });
    addressesState.setAddresses({ ...addressesState, addresses: [...newAddresses] });

    setTimeout(() => {
      setIsEdit(false);
      setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsEdit(true);
    }
  }, [email, password, firstName, lastName, dateOfBirth, isLoading, addresses]);

  /*   function resetAddressId(addresses: Address[]) {
    addresses.forEach((address) => {
      address.id = undefined;
    });
    return addresses;
  } */

  const handleSave = () => {
    if (!(passwordError || emailError || firstNameError || lastNameError || dateOfBirthError)) {
      /* const defaultShip = addresses.findIndex((address) => address.default && address.shipping);
      const defaultBill = addresses.findIndex((address) => address.default && address.billing);

      const customer: CustomerDraft = {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        addresses: [...resetAddressId(addresses)],
        billingAddresses: addresses.reduce((acc, address, i) => {
          if (address.billing) {
            acc.push(i);
          }
          return acc;
        }, [] as number[]),

        shippingAddresses: addresses.reduce((acc, address, i) => {
          if (address.shipping) {
            acc.push(i);
          }
          return acc;
        }, [] as number[]),
        ...(defaultBill >= 0 && { defaultBillingAddress: defaultBill }),
        ...(defaultShip >= 0 && { defaultShippingAddress: defaultShip }),
      }; */
      // RegistrationService.updateCustomer(customer);
    }
  };

  const handleCancel = () => {
    loadUser();
  };

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
        <DividerWithText text="Addresses" />
        <AddressTable />
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }} className={styles.btnControls}>
          <Button color="success" disabled={!isEdit} className={styles.button} variant="outlined" onClick={handleSave}>
            Save
          </Button>
          <Button color="error" disabled={!isEdit} className={styles.button} variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Profile;
