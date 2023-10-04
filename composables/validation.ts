import validator from 'validator';

export type ValidationSupportedType =
  | 'firstname'
  | 'lastname'
  | 'surname'
  | 'email'
  | 'phone'
  | 'birthday'
  | 'password'
  | 'required'
  | 'taxId';

export const useValidator = () => {
  const getExplanation = (type: ValidationSupportedType) => {
    switch (type) {
      case 'email':
        return 'Неверный формат адреса электронной почты';
      case 'birthday':
        return 'Неверный формат даты рождения';
      case 'firstname':
        return 'Неверный формат имени';
      case 'lastname':
        return 'Неверный формат фамилии';
      case 'surname':
        return 'Неверный формат отчества';
      case 'password':
        return 'Неверный формат пароля, минимум 8 символов, 2 числа и 2 специальных символа';
      case 'phone':
        return 'Неверный формат номера телефона';
      case 'required':
        return 'Обязательное поле для заполнения';
      case 'taxId':
        return 'Неверный формат ИНН, необходимо ровно 10 цифр';
    }
  };

  const check = (type: ValidationSupportedType, value: string) => {
    let isValidValue = false;

    switch (type) {
      case 'email':
        isValidValue = validator.isEmail(value);
        break;
      case 'phone':
        isValidValue = validator.isMobilePhone(value, 'ru-RU');
        break;
      case 'birthday':
        isValidValue = validator.isDate(value, {
          format: 'DD.MM.YYYY',
          strictMode: true,
          delimiters: ['.'],
        });
        break;
      case 'password':
        isValidValue = validator.isStrongPassword(value, {
          minNumbers: 2,
          minSymbols: 2,
        });
        break;
      case 'firstname':
        isValidValue = validator.isLength(value, {
          min: 2,
          max: 32,
        });
        break;
      case 'surname':
      case 'lastname':
        isValidValue = validator.isLength(value, {
          min: 2,
          max: 72,
        });
        break;
      case 'required':
        isValidValue = !validator.isEmpty(value, {
          ignore_whitespace: true,
        });
        break;
      case 'taxId':
        isValidValue = value.length === 10 && Number.isInteger(+value);
        break;
    }

    return isValidValue;
  };

  const isEmpty = (value: string) =>
    validator.isEmpty(value, {
      ignore_whitespace: true,
    });

  return { check, getExplanation, isEmpty };
};
