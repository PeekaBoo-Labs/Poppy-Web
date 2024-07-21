"use client";

import { useState } from "react";
import Clinic from "@/components/endscreen/Clinic";
import TestKit from "@/components/endscreen/TestKit";
import ResultSidebar from "../sidebar";

const clinics = [
  {
    name: "SAY Detroit Family health Clinic",
    link: "http://www.saydetroitclinic.com/",
    logo_image:
      "https://cdn-saydetroit-org.b-cdn.net/wp-content/webp-express/webp-images/uploads/say-detroit-bubble-logo2.png.webp",
    images: [
      "https://lh3.googleusercontent.com/p/AF1QipORoGy7GYAxQ-JHjVqKLfZqssgPdeE-tIdk8mfX=s680-w680-h510",
      "https://lh3.googleusercontent.com/p/AF1QipNS-KX0mUOEsB6qLTJ21W3tA9bRYNCSjQzaEPnr=s680-w680-h510",
    ],
    services: [
      ["LGBTQ+ Friendly", "lgbtq"],
      ["Urban Area", "urban"],
      ["Medical Services", "medical"],
    ] as [string, string][], // Ensure type is [string, string][]
  },
  {
    name: "Wayne Health Detroit Canfield Health Center",
    link: "http://waynehealthcares.org/",
    logo_image:
      "https://d3ogvqw9m2inp7.cloudfront.net/assets/dynamic/assets/recruiters/images/1953449/logo.png",
    images: [
      "https://news.wayne.edu/storage/files/wayne-health-sign-5f6220791a8c9.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMDPTtScyKOkiZF2bR-fhJsqc4hwhda69ATg&s",
    ],
    services: [
      ["Appointment Booking", "appointment"],
      ["Youth Services", "youth"],
      ["Medical Services", "medical"],
    ] as [string, string][],
  },
  {
    name: "Detroit Community Health Connection",
    link: "http://dchcquality.org/",
    logo_image:
      "https://static.wixstatic.com/media/712c2d_0b9b4170a1e44fbdba55b2cef2938ff4~mv2.png/v1/fill/w_161,h_65,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/LOGO.png",
    images: [
      "https://s3-media2.fl.yelpcdn.com/bphoto/bEXVI9sNgeSi94cJhD316A/l.jpg",
      "https://static.wixstatic.com/media/712c2d_350a941300b543e88a2620dafbb4b236~mv2.png/v1/fill/w_320,h_151,al_c,lg_1,q_85,enc_auto/712c2d_350a941300b543e88a2620dafbb4b236~mv2.png",
    ],
    services: [
      ["LGBTQ+ Friendly", "lgbtq"],
      ["Urban Area", "urban"],
      ["Medical Services", "medical"],
    ] as [string, string][],
  },
  {
    name: "HUDA Clinic",
    link: "https://www.hudaclinic.org/",
    logo_image:
      "https://media.licdn.com/dms/image/C4E0BAQEafDBvc-CmGQ/company-logo_200_200/0/1630566206643/hudaclinic_logo?e=2147483647&v=beta&t=bzKg5jQNhgmQAfLVH8gLr2Xh-6kOVZmFO-TvZx71Whs",
    images: [
      "https://lh3.googleusercontent.com/p/AF1QipNomkZo6pcuqeFBi-67SznHu7iFqpBHhm_pDMNj=s680-w680-h510",
      "https://lh3.googleusercontent.com/p/AF1QipNpMgreI3rZ8bzAE_sRWZpW02YOE_oyzn5D4s6m=s680-w680-h510",
    ],
    services: [
      ["Appointment Booking", "appointment"],
      ["Youth Services", "youth"],
      ["Medical Services", "medical"],
    ] as [string, string][],
  },
];

const testKits = [
  {
    name: "DHD Free Home HIV Test Kit",
    resources: [
      ["Home Test Kit", "home"],
      ["Blood Test", "blood"],
      ["Discreet Packaging", "package"],
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link:
      "https://detroitmi.gov/departments/detroit-health-department/programs-and-services/hivsti-program/hivsti-prevention-program/order-free-home-hiv-test-kit",
    logo_image:
      "https://pbs.twimg.com/profile_images/1805224909729124352/HwIj4Rtl_400x400.jpg",
  },
  {
    name: "Detroit HIV and STI Testing",
    resources: [
      ["Instruction Manual", "desktop"],
      ["Support Contact", "rapid"],
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link:
      "https://miunified.org/Services/PreventionandTesting/Testing",
    logo_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiK3PBE3T7fWoAsa5EJ1k7rUHe23DnQcznw&s",
  },
  {
    name: "TBD Health At-Home Kits",
    resources: [
      ["Instruction Manual", "desktop"],
      ["At home", "rapid"],
    ] as [string, string][], // Ensure type is [string, string][]
    resource_link:
      "https://www.tbd.health/locations/sti-std-testing-screening-treatment-near-me/detroit-mi",
    logo_image:
      "https://www.tbd.health/_next/static/media/logoDark.1ea38712.svg",
  },
];

export default function ResultNextSteps() {
  return <NextSteps />;
}

function NextSteps({ clinicsReplace = clinics, testKitsReplace = testKits }) {
  const [showMoreClinics, setShowMoreClinics] = useState(false);
  const [showMoreTestKits, setShowMoreTestKits] = useState(false);

  const visibleClinics = showMoreClinics
    ? clinicsReplace
    : clinicsReplace.slice(0, 2);
  const visibleTestKits = showMoreTestKits
    ? testKitsReplace
    : testKitsReplace.slice(0, 2);

  return (
    <ResultSidebar slug="nextsteps">
      <section
        id="clinics"
        className="rounded-xl border border-[1] border-gray-300 p-6"
      >
        <span className="font-semibold">Find local clinics</span>
        <div className="flex flex-col gap-2">
          {visibleClinics.map((clinic) => {
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
        <hr className="m-6 border-t border-gray-300" />
        <div
          onClick={() => setShowMoreClinics(!showMoreClinics)}
          className="flex cursor-pointer justify-center rounded-lg py-1 align-middle text-gray-400"
        >
          {showMoreClinics ? "Show Less" : "Show More"}
        </div>
      </section>
      <section
        id="test-kits"
        className="mt-5 rounded-xl border border-[2] border-gray-300 p-5"
      >
        <span className="font-semibold">Relevant test kits</span>
        <div className="flex flex-col gap-1">
          {visibleTestKits.map((testKit) => {
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
        <hr className="border-gray-299 m-6 border-t" />
        <div
          onClick={() => setShowMoreTestKits(!showMoreTestKits)}
          className="py0 flex cursor-pointer justify-center rounded-lg align-middle text-gray-400"
        >
          {showMoreTestKits ? "Show Less" : "Show More"}
        </div>
      </section>
    </ResultSidebar>
  );
}
