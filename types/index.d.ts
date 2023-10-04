import * as Yup from 'Yup';

declare module 'yup' {
  interface StringSchema extends Yup.StringSchema {
    strongPassword(): StringSchema;
    birthday(): StringSchema;
    inn(): StringSchema;
    ogrn(): StringSchema;
    kpp(): StringSchema;
    firstname(): StringSchema;
    surname(): StringSchema;
    lastname(): StringSchema;
  }
}

declare global {
  interface IPagination {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  }
}
