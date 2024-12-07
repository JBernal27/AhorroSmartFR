import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/global.context';
import { AuthService } from '../../../services/auth.service';
import { ISettings } from '../../../common/interfaces/settings.interface';
import { useForm, Controller } from 'react-hook-form';

const useSettingsForm = (initialSettings: ISettings) => {
  const context = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<ISettings>(initialSettings);

  const { control, handleSubmit, reset, watch } = useForm<ISettings>({
    defaultValues: initialSettings,
  });

  useEffect(() => {
    if (context?.settings) {
      reset(context.settings);
      setInitialValues(context.settings);
    }
  }, [context?.settings, reset]);

  const watchAllFields = watch();

  const hasImportantChanges = () => {
    return (
      initialValues.name !== watchAllFields.name ||
      initialValues.email !== watchAllFields.email
    );
  };

  const onSubmit = async (data: ISettings) => {
    if (hasImportantChanges()) {
      setIsLoading(true);
      try {
        console.log('Realizando petición para campos importantes:', data);
        await AuthService.updateUser(data);
        context?.setSettings(data);
      } catch (err) {
        console.error('Error actualizando campos:', err);
      } finally {
        setIsLoading(false);
      }
    } else {
      context?.setSettings(data);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset(initialValues);
    setIsEditing(false);
  };

  return {
    control,
    handleSubmit,
    isEditing,
    setIsEditing,
    isLoading,
    onSubmit,
    handleCancel,
  };
};

export default useSettingsForm;
