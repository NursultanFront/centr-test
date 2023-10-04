import { ValidationSupportedType } from './validation';

interface IFormFieldList {
  [field: string]: string;
}

interface ICustomValidation {
  state: IFormFieldList;
  value: string | boolean | number;
  setError: (text: string) => {};
}

type FormCustomFormat = (payload: ICustomValidation) => boolean;
type FormFormat = ValidationSupportedType | FormCustomFormat;

interface IForm {
  [field: string]: FormFormat[];
}

interface IFormFieldError {
  [field: string]: string;
}

const useError = () => {
  const fieldErrorList = reactive<IFormFieldError>({});

  const setError = (field: string, text: string) => (fieldErrorList[field] = text);
  const flushError = (field: string) => delete fieldErrorList[field];

  return { errors: fieldErrorList, setError, flushError };
};

/**
 * @deprecated Avoid use this, use vee-validate instead
 * @param formFieldList
 * @returns
 */
export const useForm = (formFieldList: IForm) => {
  const createFormFields = () => {
    const fields = Object.keys(formFieldList);

    const form: IFormFieldList = {};

    fields.forEach((field) => (form[field] = ''));

    return form;
  };

  // if user doesn't write something in a form, this value will be false
  const isTouched = ref(false);

  // TODO: add autocomplete with form fields for better development experience
  const form = reactive<IFormFieldList>(createFormFields());

  const { errors, setError, flushError } = useError();
  const { check, getExplanation } = useValidator();

  const validate = (validator: FormFormat, field: string, value: string): boolean => {
    try {
      let isValid = false;

      if (typeof validator === 'function') {
        isValid = validator({
          state: form,
          value,
          setError: (text) => setError(field, text),
        });
      } else {
        isValid = check(validator, value);

        if (!isValid) {
          const explanation = getExplanation(validator);

          throw new FormValidationError(explanation);
        }
      }

      // remove error for this field
      if (errors[field]) {
        flushError(field);
      }

      return isValid;
    } catch (error) {
      if (error instanceof FormValidationError) {
        setError(field, error.message);
      }

      return false;
    }
  };

  const isFilled = computed(() => {
    const requiredFieldList = Object.keys(formFieldList).filter((field) => formFieldList[field].includes('required'));

    const hasEmptyRequiredField = requiredFieldList.find((field) => form[field].length === 0);

    return !hasEmptyRequiredField;
  });

  const canSubmit = computed(() => isTouched.value && isFilled.value && Object.keys(errors).length === 0);

  watch(
    () => ({ ...form }),
    (newFormData, oldFormData) => {
      const isUserTouchedForm = isTouched.value;

      if (!isUserTouchedForm) {
        isTouched.value = true;
      }

      const differedFields: string[] = [];

      Object.keys(newFormData).forEach((field) => {
        const isValueChanged = newFormData[field] !== oldFormData[field];

        if (isValueChanged) {
          differedFields.push(field);
        }
      });

      differedFields.forEach((field) => {
        const validators = formFieldList[field];

        // try validator
        validators.forEach((validator: FormFormat) => validate(validator, field, newFormData[field]));
      });
    },
  );

  return { errors, form, isTouched, isFilled, canSubmit };
};

export class FormValidationError extends Error {
  constructor(text: string) {
    super();

    this.name = 'FormValidationError';
    this.message = text;
  }
}
