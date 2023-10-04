import * as yup from 'yup';
import validator from 'validator';

yup.addMethod(yup.string, 'strongPassword', function (errorMessage) {
  return this.test('strongPassword', errorMessage, function (value) {
    const { path, createError } = this;

    if (!value || (value && value?.length < 8)) {
      return createError({
        path,
        message: 'Длина пароля меньше 8-и символов',
      });
    }

    const isStrongPassword = validator.isStrongPassword(value, {
      minLength: 8,
      minNumbers: 2,
      minSymbols: 2,
    });

    if (!isStrongPassword) {
      return createError({
        path,
        message: 'Неверный формат пароля, минимум 8 символов, 2 специальных символа, 2 цифры',
      });
    }

    return true;
  });
});

yup.addMethod(yup.string, 'birthday', function (errorMessage) {
  return this.test('birthday', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue) {
      const isValidDate = validator.isDate(value, {
        format: 'DD.MM.YYYY',
        strictMode: true,
        delimiters: ['.'],
      });

      if (!isValidDate) {
        return createError({
          path,
          message: errorMessage ?? 'Неверный формат даты рождения',
        });
      }
    }

    return true;
  });
});

yup.addMethod(yup.string, 'inn', function () {
  return this.test('inn', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue && value.length !== 10) {
      return createError({
        path,
        message: 'Неверный формат ИНН, необходимо 10 цифр',
      });
    }

    return true;
  });
});

yup.addMethod(yup.string, 'ogrn', function () {
  return this.test('ogrn', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue && value.length !== 13) {
      return createError({
        path,
        message: 'Неверный формат ОГРН, необходимо 13 цифр',
      });
    }

    return true;
  });
});

yup.addMethod(yup.string, 'kpp', function () {
  return this.test('kpp', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue && value.length !== 9) {
      return createError({
        path,
        message: 'Неверный формат КПП, необходимо 9 цифр',
      });
    }

    return true;
  });
});

const MAX_FIRSTNAME_LENGTH = 32;

yup.addMethod(yup.string, 'firstname', function () {
  return this.test('firstname', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue) {
      const isAllowedLength = value.length > 0 && value.length <= MAX_FIRSTNAME_LENGTH;

      if (!isAllowedLength)
        return createError({
          path,
          message: `Минимум 1 символ и не более ${MAX_FIRSTNAME_LENGTH}`,
        });

      const hasAllowedChars = /^[а-яА-Я\s]+$/.test(value);

      if (!hasAllowedChars)
        return createError({
          path,
          message: 'Неверный формат имени, разрешена только кириллица',
        });
    }

    return true;
  });
});

const MAX_SURNAME_LENGTH = 32;

yup.addMethod(yup.string, 'surname', function () {
  return this.test('surname', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue) {
      const isAllowedLength = value.length > 0 && value.length <= MAX_SURNAME_LENGTH;

      if (!isAllowedLength)
        return createError({
          path,
          message: `Минимум 1 символ и не более ${MAX_SURNAME_LENGTH}`,
        });

      const hasAllowedChars = /^[а-яА-Я\s]+$/.test(value);

      if (!hasAllowedChars)
        return createError({
          path,
          message: 'Неверный формат отчества, разрешена только кириллица',
        });
    }

    return true;
  });
});

const MAX_LASTNAME_LENGTH = 48;

yup.addMethod(yup.string, 'lastname', function () {
  return this.test('firstname', function (value) {
    const { path, createError } = this;

    const hasValue = typeof value === 'string' && value.length > 0;

    if (hasValue) {
      const isAllowedLength = value.length > 0 && value.length <= MAX_LASTNAME_LENGTH;

      if (!isAllowedLength)
        return createError({
          path,
          message: `Минимум 1 символ и не более ${MAX_LASTNAME_LENGTH}`,
        });

      const hasAllowedChars = /^[а-яА-Я\s]+$/.test(value);

      if (!hasAllowedChars) {
        return createError({
          path,
          message: 'Неверный формат фамилии, разрешена только кириллица',
        });
      }
    }

    return true;
  });
});

export default defineNuxtPlugin(() => ({
  provide: {
    yup,
  },
}));
