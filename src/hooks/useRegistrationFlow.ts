import { useState } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { AffiliateFormData, CompanionData } from '../types/registration';
import { createUser } from '../services/supabase/users';
import { createCompanion } from '../services/supabase/companions';

export const useRegistrationFlow = (navigate: NavigateFunction) => {
  const [step, setStep] = useState(1);
  const [mainUser, setMainUser] = useState<AffiliateFormData>({
    name: '',
    email: '',
    phone: '',
    dni: ''
  });

  const handleMainUserSubmit = (userData: AffiliateFormData) => {
    setMainUser(userData);
    setStep(2);
  };

  const handleSkipCompanions = async () => {
    try {
      await createUser(mainUser);
      navigate('/signin');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleCompanionsSubmit = async (companions: CompanionData[]) => {
    try {
      const user = await createUser(mainUser);
      if (!user) throw new Error('Failed to create user');

      await Promise.all(
        companions.map(companion =>
          createCompanion({
            ...companion,
            user_id: user.id,
            age: parseInt(companion.age)
          })
        )
      );

      navigate('/signin');
    } catch (error) {
      console.error('Error registering user and companions:', error);
    }
  };

  return {
    step,
    mainUser,
    handleMainUserSubmit,
    handleCompanionsSubmit,
    handleSkipCompanions
  };
};