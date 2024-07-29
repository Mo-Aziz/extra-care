import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      {/* todo: OTP verification */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex=1 justify-between">
          <div className="flex gap-x-3 justify-left">
            <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="care extra logo"
              className="mb-12 h-10 w-fit"
            />
            <p className="text-xl font-bold">ExtraCare</p>
          </div>

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-10 py-12">© 2024 ExtraCare</p>
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment image"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
