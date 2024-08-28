import { Clinic } from "@/app/api/v2/getClinics/route";
import { TestKit } from "@/app/api/v2/getTestKits/route";
import InputField from "@/components/general/input-field";
import { useCallback, useEffect, useRef, useState } from "react";
import TestKitItem from "./test-kit";

export default function NextStepsList() {
  const zipCodeInput = useRef<HTMLInputElement | null>(null);

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [testKits, setTestKits] = useState<TestKit[]>([]);

  const fetchClinics = useCallback(
    async (location: string) => {
      const params = new URLSearchParams({
        zipcode: location,
      });

      const res = await fetch("/api/v2/getClinics?" + params);
      const json = (await res.json()) as Clinic[];

      setClinics(json);
    },
    [setClinics],
  );

  const fetchTestKits = useCallback(async () => {
    const res = await fetch("/api/v2/getTestKits");
    const json = (await res.json()) as TestKit[];

    setTestKits(json);
  }, [setTestKits]);

  useEffect(() => {
    fetchTestKits();
  }, [fetchTestKits]);

  return (
    <div className="flex flex-col gap-10 pt-2.5">
      <form
        className="space-y-[13px]"
        onSubmit={(e) => {
          e.preventDefault();

          if (zipCodeInput && zipCodeInput.current?.value) {
            fetchClinics(zipCodeInput.current?.value);
          }
        }}
      >
        <h2 className="text-sm font-semibold text-secondary lg:text-base">
          Clinics
        </h2>

        <InputField
          ref={zipCodeInput}
          type="text"
          placeholder="Enter ZIP Code"
        />
      </form>

      <div className="flex flex-col gap-[13px]">
        <h2 className="text-sm font-semibold text-secondary lg:text-base">
          Testing
        </h2>

        {testKits.map((testKit, i) => (
          <TestKitItem testKit={testKit} key={i} />
        ))}
      </div>
    </div>
  );
}
