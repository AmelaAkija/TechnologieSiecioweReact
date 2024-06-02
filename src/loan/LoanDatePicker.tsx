import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import { enUS, Locale, pl } from 'date-fns/locale';

// Register the locales you need
registerLocale('en-US', enUS);
registerLocale('pl', pl);

interface LoanDatePickerProps {
  loanDateStart: Date | null;
  handleChange: (date: Date | null) => void;
  locale: Locale;
}

const LoanDatePicker: React.FC<LoanDatePickerProps> = ({
  loanDateStart,
  handleChange,
  locale,
}) => {
  return (
    <DatePicker
      selected={loanDateStart}
      onChange={handleChange}
      locale={locale}
      dateFormat="yyyy/MM/dd"
      placeholderText="Select a date"
      className="loanDateStart-input"
    />
  );
};

export default LoanDatePicker;
export {};
