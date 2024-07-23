// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";

// import SubmitButton from "../SubmitButton";
// import { useState } from "react";
// import { UserFormValidation } from "@/lib/validation";
// import { create } from "domain";
// import { useRouter } from "next/navigation";
// import { createUser } from "@/lib/actions/patient.actions";
// import CustomFormField, {
//   FormFieldType,
// } from "@/components/ui/CustomFormField";

// // 1 form fields types
// // export enum FormFieldType {
// //   INPUT = "input",
// //   TEXTAREA = "textarea",
// //   PHONE_INPUT = "phoneInput",
// //   CHECKBOX = "checkbox",
// //   DATE_PICKER = "datePicker",
// //   SELECT = "select",
// //   SKELETON = "skeleton",
// // }
// // 2 zod validation with react-hook-form
// // const formSchema = z.object({
// //   username: z.string().min(2, {
// //     message: "Username must be at least 2 characters.",
// //   }),
// // });
// // moved the schema validataor to validation.ts ======>>>

// export function PatientForm() {
//   // button loading state
//   const [isLoading, setIsLoading] = useState(false);

//   // define the router
//   const router = useRouter();

//   // 1-  build a form with react-hook-form and zod
//   const form = useForm<z.infer<typeof UserFormValidation>>({
//     resolver: zodResolver(UserFormValidation),
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//     },
//   });

//   // 2- Define a submit handler.
//   async function onSubmit({
//     name,
//     email,
//     phone,
//   }: z.infer<typeof UserFormValidation>) {
//     setIsLoading(true);
//     try {
//       const userData = { name, email, phone };
//       const user = await createUser(userData);
//       if (user) router.push(`/patient/${user.$id}/register`);
//     } catch (error) {
//       console.error(error);
//     }

//     return (
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-6 flex-1"
//         >
//           <section className="mb-12 space-y-4">
//             <h1 className="header">Hi there 👋</h1>
//             <p className="text-dark-700">Schedule your first appointment.</p>
//           </section>
//           {/* main form section */}

//           {/* user name field */}
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="name"
//             label="Full name"
//             placeholder="John Doe"
//             iconSrc="/assets/icons/user.svg"
//             iconAlt="user"
//           />
//           {/* email */}
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.INPUT}
//             name="email"
//             label="Email"
//             placeholder="JohnDoe@gmail.com"
//             iconSrc="/assets/icons/email.svg"
//             iconAlt="email"
//           />
//           {/* phone */}
//           <CustomFormField
//             control={form.control}
//             fieldType={FormFieldType.PHONE_INPUT}
//             name="phone"
//             label="Phone number"
//             placeholder="(123) 456-7890"
//           />

//           <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//         </form>
//       </Form>
//     );
//   }
// }

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField, {
  FormFieldType,
} from "@/components/ui/CustomFormField";
import SubmitButton from "../SubmitButton";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = {
        name,
        email,
        phone,
      };

      const newUser = await createUser(userData);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Get started with appointments.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
