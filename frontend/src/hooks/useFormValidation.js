import { useState, useEffect } from 'react';

function useFormValidation() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
      });
    const [isTouched, setIsTouched] = useState(false);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = evt => {
        const { name, value } = evt.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
          }));
        setIsTouched(true);
        };

        const validationRules = {
            name: value => { 
                if (!value) {
                    return "Поле обязательно для заполнения";
                  }
                if (!/^[a-zA-Zа-яА-Я\s-]+$/.test(value)) {
                    return "Имя должно содержать только латинские или кириллические символы, пробелы или дефисы";
                }
                return null;
            },
            email: value => { 
                if (!value) {
                    return "Поле обязательно для заполнения";
                  }
                if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
                    return "Введите действительный адрес электронной почты";
                }
                return null;
            },
            password: value => { 
                if (!value) {
                    return "Поле обязательно для заполнения";
                  }
                if (!(value.length >= 6)) {
                    return "Пароль должен содержать не менее 6 символов";
                }
                return null;
            },
          };

       useEffect(() => {
        if(isTouched) {
            const newErrors = Object.entries(inputs).reduce((acc, [name, value]) => {
                const errorMessage = validationRules[name] ? validationRules[name](value) : null;
                return {
                ...acc,
                [name]: errorMessage,
                };
            }, {});
            
            setErrors(newErrors);
            setIsValid(!Object.values(newErrors).some(Boolean));
        }
        }, [inputs, isTouched]);

        return { inputs, handleInputChange, errors, isValid };
    }


export default useFormValidation;