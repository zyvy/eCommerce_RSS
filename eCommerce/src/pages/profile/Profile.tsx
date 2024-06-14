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
import styles from './Profile.module.css';
import { RegistrationService } from '../../services/RegistrationService.ts';
import { useAuth } from '../../context/AuthContext.tsx';
import { useUserPersonalData } from '../../context/UserPersonalDataContext.tsx';
import AddressTable from '../../components/address-table/AddressTable.tsx';
import { Address, useAddresses } from '../../context/AddressesContext.tsx';
import { AuthorizationService } from '../../services/AuthorizationService.ts';
import SuccessModal from '../../components/UI/success-modal/SuccessModal.tsx';
import ModalChangePassword from '../../components/UI/modal-change-password/ModalChangePassword.tsx';

function Profile() {
  const auth = useAuth();
  const { email, emailError, setAuth } = { ...auth };
  const [successUpdate, setSuccessUpdate] = useState(false);
  const userPersonalData = useUserPersonalData();
  const { firstName, firstNameError, lastName, lastNameError, dateOfBirth, dateOfBirthError } = { ...userPersonalData };
  const addressesState = useAddresses();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = async () => {
    setIsLoading(true);
    setIsEdit(false);
    const response = await RegistrationService.getCustomer();
    const { customer } = response;
    if (!customer) {
      return;
    }

    AuthorizationService.saveVersion(customer!.version);

    setAuth({ ...auth, email: customer.email, emailError: false });
    userPersonalData.setData({
      firstNameError: false,
      lastNameError: false,
      dateOfBirthError: false,
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
  }, [email, firstName, lastName, dateOfBirth, isLoading]);

  const handleSave = () => {
    if (!(emailError || firstNameError || lastNameError || dateOfBirthError)) {
      const updateCustomer = {
        email,
        firstName,
        lastName,
        dateOfBirth,
      };
      RegistrationService.updateCustomer(updateCustomer).then((response) => {
        if (!response.error) {
          setSuccessUpdate(true);
          setIsEdit(false);
        }
      });
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
          <InputFirstName />
          <InputEmail size="small" />
          <InputLastName />
          <InputDate />
        </div>
        <div style={{ visibility: isLoading ? 'hidden' : 'visible' }} className={styles.btnControls}>
          <Button color="success" disabled={!isEdit} className={styles.button} variant="outlined" onClick={handleSave}>
            Save
          </Button>
          <Button color="error" disabled={!isEdit} className={styles.button} variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
        <DividerWithText text="Addresses" />
        <AddressTable />

        <div className={styles.changePasswordContainer}>
          <ModalChangePassword />
        </div>

        {successUpdate && (
          <SuccessModal
            title=""
            handleClose={() => {
              setSuccessUpdate(true);
            }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
