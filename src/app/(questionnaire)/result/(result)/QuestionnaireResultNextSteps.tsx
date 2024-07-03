import { useState } from 'react';
import Clinic from "@/components/endscreen/Clinic";
import TestKit from "@/components/endscreen/TestKit";

const clinics = [
  {
    name: "Health Clinic A",
    link: "http://healthclinica.com",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg",
    images: [
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
    ],
    services: [
      ["LGBTQ+ Friendly", "lgbtq"],
      ["Urban Area", "urban"],
      ["Medical Services", "medical"]
    ] as [string, string][] // Ensure type is [string, string][]
  },
  {
    name: "Wellness Center B",
    link: "http://wellnesscenterb.com",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg",
    images: [
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
    ],
    services: [
      ["Appointment Booking", "appointment"],
      ["Youth Services", "youth"],
      ["Medical Services", "medical"]
    ] as [string, string][]
  },
  {
    name: "Health Clinic C",
    link: "http://healthclinicb.com",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg",
    images: [
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
    ],
    services: [
      ["LGBTQ+ Friendly", "lgbtq"],
      ["Urban Area", "urban"],
      ["Medical Services", "medical"]
    ] as [string, string][]
  },
  {
    name: "Wellness Center D",
    link: "http://wellnesscenterd.com",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg",
    images: [
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg",
      "https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg"
    ],
    services: [
      ["Appointment Booking", "appointment"],
      ["Youth Services", "youth"],
      ["Medical Services", "medical"]
    ] as [string, string][]
  }
];

const testKits = [
  {
    name: "COVID-19 Test Kit",
    resources: [
      ["Home Test Kit", "home"],
      ["Blood Test", "blood"],
      ["Discreet Packaging", "package"]
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link: "http://covid19testkit.com/resources",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg"
  },
  {
    name: "Diabetes Test Kit",
    resources: [
      ["Instruction Manual", "desktop"],
      ["Support Contact", "rapid"]
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link: "http://diabetestestkit.com/resources",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg"
  },
  {
    name: "Cholesterol Test Kit",
    resources: [
      ["Home Test Kit", "home"],
      ["Rapid Results", "rapid"],
      ["Blood Test", "blood"]
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link: "http://cholesteroltestkit.com/resources",
    logo_image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Ucirvinemedicalcenter.jpg"
  }
];

export default function QuestionnaireResultNextSteps({ clinicsReplace = clinics, testKitsReplace = testKits }) {
  const [showMoreClinics, setShowMoreClinics] = useState(false);
  const [showMoreTestKits, setShowMoreTestKits] = useState(false);

  const visibleClinics = showMoreClinics ? clinicsReplace : clinicsReplace.slice(0, 2);
  const visibleTestKits = showMoreTestKits ? testKitsReplace : testKitsReplace.slice(0, 2);

  return (
    <>
      <section id='clinics' className="border border-[1] border-gray-300 rounded-xl p-6">
        <span className="font-semibold">Find local clinics</span>
        <div className="flex flex-col gap-2">
          {visibleClinics.map(clinic => {
            return (
              <Clinic
                key={clinic.name}
                name={clinic.name}
                link={clinic.link}
                logo_image={clinic.logo_image}
                images={clinic.images}
                services={clinic.services}
              />
            );
          })}
        </div>
        <hr className="border-t border-gray-300 m-6" />
        <div
          onClick={() => setShowMoreClinics(!showMoreClinics)}
          className="py-1 cursor-pointer text-gray-400 rounded-lg flex align-middle justify-center"
        >
          {showMoreClinics ? "Show Less" : "Show More"}
        </div>
      </section>
      <section id='test-kits' className="border border-[1] border-gray-300 rounded-xl p-5 mt-5">
        <span className="font-semibold">Relevant test kits</span>
        <div className="flex flex-col gap-2">
          {visibleTestKits.map(testKit => {
            return (
              <TestKit
                key={testKit.name}
                name={testKit.name}
                resources={testKit.resources}
                resource_link={testKit.resource_link}
                logo_image={testKit.logo_image}
              />
            );
          })}
        </div>
        <hr className="border-t border-gray-300 m-6" />
        <div
          onClick={() => setShowMoreTestKits(!showMoreTestKits)}
          className="py-1 cursor-pointer text-gray-400 rounded-lg flex align-middle justify-center"
        >
          {showMoreTestKits ? "Show Less" : "Show More"}
        </div>
      </section>
    </>
  );
}
