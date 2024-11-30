'use client';
import { cn } from '@/lib/utils';
import { parse } from 'path';
import React, { useEffect, useState } from 'react';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';

import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
  prefix: '',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2, // how many digits allowed after the decimal
  integerLimit: 14, // limit length of integer numbers
  allowNegative: false,
  allowLeadingZeroes: false
};

interface CurrencyInputProps extends Omit<MaskedInputProps, 'mask'> {
  maskOptions?: any;
  className?: string;
  onNumberChange?: (value: number | null) => void;
}

export const CurrencyInput = (props: CurrencyInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (props.value !== null && props.value !== undefined) {
      setInputValue(props.value.toString());
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const onlyDigitsAndDecimals = e.target.value.replace(/[^0-9.]/g, '');
    let numberValue: null | number = parseFloat(onlyDigitsAndDecimals);

    if (e.target.value === '' || isNaN(numberValue)) {
      numberValue = null;
    }

    if (props.onNumberChange) {
      props.onNumberChange(numberValue);
    }
  };
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...props.maskOptions
  });
  return (
    <MaskedInput
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.className
      )}
      mask={currencyMask}
      {...props}
      value={inputValue}
      onChange={handleChange}
    />
  );
};
