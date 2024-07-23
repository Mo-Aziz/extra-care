import { RegisterForm } from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <div className="flex gap-x-6 justify-left">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="care extra logo"
              className="mb-12 h-10 w-fit"
            />
            <p className="text-4xl font-bold">ExtraCare</p>
          </div>

          <RegisterForm user={user} />
          {/* footer */}

          <p className="copy-right py-12">© 2024 ExtraCare</p>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register image"
        className="side-img max-w-[390px]"
      />
    </div>
  );
};
export default Register;
