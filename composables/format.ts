import { DateTime } from 'luxon';

export enum BookingStatuses {
  New = 'Ожидание',
  Live = 'Проживают',
  Confirmed = 'Забронировано',
  Canceled = 'Отмененные',
  Completed = 'Завершенные',
  Unknown = 'Неизвестный статус',
}

const PluralizeCases = [2, 0, 1, 1, 1, 2];

const CurrencyFormatter = new Intl.NumberFormat('ru', {
  currency: 'RUB',
  style: 'currency',
  currencyDisplay: 'symbol',
  maximumFractionDigits: 0,
});

export const useFormat = () => {
  const makeFullname = (firstname?: string, surname?: string, lastname?: string) => {
    const fullname: string[] = [];

    if (firstname && firstname.length > 0) {
      fullname.push(firstname);
    }

    if (surname && surname.length > 0) {
      fullname.push(surname);
    }

    if (lastname && lastname.length > 0) {
      fullname.push(lastname);
    }

    return fullname.join(' ');
  };

  const formatPhone = (phone?: string) => {
    return phone ? phone.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/g, '+$1 ($2) $3-$4-$5') : null;
  };

  const formatDate = (date: string, format = 'dd.MM.yyyy HH:mm') => {
    return DateTime.fromSQL(date).setLocale('ru').toFormat(format);
  };

  const isoToSqlFormat = (isoDate: string): string => {
    const dt = DateTime.fromISO(isoDate);
    return dt.toFormat('yyyy-MM-dd HH:mm:ss');
  };

  const calculateClientCommission = (sum: number, commission: number) => sum * (1 + commission / 100);

  const calculateCommissionAmount = (sum: number, commission: number) => Math.round(sum * (commission / 100));

  const getIntervalDaysCount = (startDate: Date, endDate: Date) => {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) return null;

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const formatDateShort = (date: Date): string => {
    const dt = DateTime.fromJSDate(date).setLocale('ru-RU');
    const month = dt.toFormat('LLL').replace('.', ''); // Удаляем точку
    return `${dt.toFormat('d')} ${month}, ${dt.toFormat('EEE')}`;
  };

  const formatJSDate = (date: Date, format = 'dd.MM.yyyy HH:mm') =>
    DateTime.fromJSDate(date).setLocale('ru-RU').toFormat(format);

  const formattedDateRange = (dateIn: string, dateOut: string, format = 'dd.MM.yy') => {
    const dateInFormatted = formatDate(dateIn, format);
    const dateOutFormatted = formatDate(dateOut, format);
    return `${dateInFormatted} - ${dateOutFormatted}`;
  };

  const formatISODate = (date: string, format = 'dd.MM.yyyy HH:mm') =>
    DateTime.fromISO(date).setLocale('ru-RU').toFormat(format);

  const pluralize = (number: number, forms: string[]) => {
    const formIndex = number % 100 > 4 && number % 100 < 20 ? 2 : PluralizeCases[Math.min(number % 10, 5)];
    const form = forms[formIndex];

    return `${number} ${form}`;
  };

  const formatCurrency = (value: number | string) => CurrencyFormatter.format(+value);

  return {
    makeFullname,
    formatPhone,
    formatDate,
    formatJSDate,
    formatISODate,
    formatCurrency,
    pluralize,
    formattedDateRange,
    isoToSqlFormat,
    calculateClientCommission,
    calculateCommissionAmount,
    getIntervalDaysCount,
    formatDateShort,
  };
};
