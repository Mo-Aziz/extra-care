"use client";
import React from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Form } from "react-hook-form";

import Image from "next/image";

// react-phone-number input
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// 1 form types
interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

// 2 displaying all types of inputs using switch case

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { fieldType, placeholder, iconSrc, iconAlt, children } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              {...field}
              type="text"
              placeholder={placeholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    // case FormFieldType.TEXTAREA:
    //   return (
    //     <Input
    //       {...field}
    //       as="textarea"
    //       placeholder={placeholder}
    //       iconSrc={iconSrc}
    //       iconAlt={iconAlt}
    //       disabled={disabled}
    //     />
    //   );
    // case FormFieldType.PHONE_INPUT:
    //   return (
    //     <Input
    //       {...field}
    //       type="tel"
    //       placeholder={placeholder}
    //       iconSrc={iconSrc}
    //       iconAlt={iconAlt}
    //       disabled={disabled}
    //     />
    //   );
    // case FormFieldType.CHECKBOX:
    //   return (
    //     <Input
    //       {...field}
    //       type="checkbox"
    //       disabled={disabled}
    //       children={children}
    //     />
    //   );
    default:
      return <Input {...field} />;
  }
};

function CustomFormField(props: CustomFormFieldProps) {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
