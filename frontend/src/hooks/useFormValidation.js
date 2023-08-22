import { useCallback, useState } from "react";
import { REGEX_EMAIL_PATTERN } from './../utils/constants';

export function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (evt) => {

    const target = evt.target;
    const name = target.name;
    const value = target.value;

    if (name === 'email') {  
      if (!value.match(REGEX_EMAIL_PATTERN)) {
        setValues({...values, [name]: value});
        setErrors({ ...errors, [name]: 'Пожалуйста, введите корректный адрес электронной почты.' });
        setIsValid(false);
      }
      else {
        setValues({...values, [name]: value});
        setErrors({ ...errors, [name]: '' }); // Очищаем сообщение об ошибке
        setIsValid(target.closest('form').checkValidity()); // Проверяем валидность всей формы
      }
    }
    else {
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: target.validationMessage });
      setIsValid(target.closest("form").checkValidity());
    }

    evt.preventDefault();
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleInputChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormValidation;