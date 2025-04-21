export type ValidatorFn = (value: string) => string | null;

export const required = (fieldName: string): ValidatorFn => {
  return (value) => {
    if (!value || value.trim() === '') {
      return `${fieldName} wajib diisi`;
    }
    return null;
  };
};

export const minLength = (fieldName: string, length: number): ValidatorFn => {
  return (value) => {
    if (value.length < length) {
      return `${fieldName} minimal ${length} digit`;
    }
    return null;
  };
};

export const maxLength = (fieldName: string, length: number): ValidatorFn => {
  return (value) => {
    if (value.length > length) {
      return `${fieldName} maksimal ${length} digit`;
    }
    return null;
  };
};

export const exactLength = (fieldName: string, length: number): ValidatorFn => {
  return (value) => {
    if (value.length !== length) {
      return `${fieldName} harus berjumlah ${length} digit`;
    }
    return null;
  };
};

export const matchRegex = (
  fieldName: string,
  pattern: RegExp,
  errorMsg: string
): ValidatorFn => {
  return (value) => {
    if (!pattern.test(value)) {
      return `${fieldName} ${errorMsg}`;
    }
    return null;
  };
};

export const composeValidators =
  (...validators: ValidatorFn[]): ValidatorFn =>
  (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };

export const minAge = (fieldName: string, minYears: number): ValidatorFn => {
  return (value) => {
    const birthDate = new Date(value);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      return `${fieldName} tidak valid`;
    }

    const age =
      today.getFullYear() -
      birthDate.getFullYear() -
      (today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
        ? 1
        : 0);

    if (age < minYears) {
      return `${fieldName} minimal berusia ${minYears} tahun`;
    }

    return null;
  };
};