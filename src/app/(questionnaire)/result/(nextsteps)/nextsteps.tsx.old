"use client";

import { useState } from "react";
import Clinic from "@/components/results/Clinic";
import TestKit from "@/components/results/TestKit";
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
  name: "CVS STD Test Kit",
  resources: [
    ["Home Test Kit", "home"],
    ["Blood Test", "blood"],
    ["Test kit delivery", "package"]
  ] as [string, string][], // Ensure type is [string, string][]
  resource_link:
    "https://www.cvs.com/shop/home-health-care/home-tests/std-hiv-tests",
  logo_image:
    "https://i.pinimg.com/originals/63/9f/a2/639fa28a10efe65bae2015516662dce6.png",
},
{
  name: "Lemonaid Online STD Test Kit",
  resources: [
    ["Home Test Kit", "home"],
    ["Quick Testing", "rapid"],
    ["Online Appointment", "desktop"]
  ] as [string, string][], // Ensure type is [string, string][]
  resource_link:
    "https://www.lemonaidhealth.com/services/std-testing",
  logo_image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEX////8/fnE4aGJwy+OxTzk8tXt9uKSx0Wx14D98fbokrG42YvibJrTAFvdW43++PvaLnjWAGbVDWb65e3xtc30+u7xudDOOWyUyEjq9N2Qek5/w0DtpMBJpyJntzgzpQiqxZCVxXqKx0jHcoRzjT3BT2f0y9rrm7q+m7L0AAAAw0lEQVR4AZWSBRLDMAwEFUaDXAoz/P+HVWEoIxc2nJtN7BvDnzhgx/X8wJaFfuTHcCRJ04QuGYUZHMmFkCRGUeSHx0xpNHjiRTLRiPOFE4mrMJi73HCIBA3eChJLYJCIVc2KRCNubVfwIpyw6tuIRBbZ9n1tq27o+34EnstE4az40PXbfsETLxZF16+isYhRvSBKXoyiaUWDCRMGHpXzLJ8zfd8LzoLKB4bQDagkY3QCFiQasdnCXfA/fS8WIRVYSeBH7jvOC4D1RnUzAAAAAElFTkSuQmCC",
},
{
  name: "TBD Health STI/STD Convenient Test Kit",
  resources: [
    ["Home Test Kit", "home"],
    ["Test Kit Subscription", "package"],
    ["Message Clinicians", "desktop"],
  ] as [string, string][], // Ensure type is [string, string][]
  resource_link:
    "https://www.tbd.health/locations/sti-std-testing-screening-treatment-near-me/",
  logo_image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABfVBMVEVHcEyycmZxkRRefguqXVCxYVHvopXTfHHrmIzpta764dLPZ03jk4quXFNzlxnq0a4/UgpTZRWifHEmNQDxlXMoQwB4VEXzyKfBamXAZFSxWE3pmHvwqJr9q4hcigBvkBpObgBqjA34vp5GYgr86NP3u5t4VkkAAAAdMgBwbWBWNSb71bf6hEn+n2P9mlf1fkL9lFHBQiLnaDXZYDD6oVv+rGfZQynjTS3yZTbxdD37jEvtVzLofED3cEH8jVH9lV3+p2DHOCPqbznRUifISSTPWzL0k1G2OiP4eUn7v5nQOSLhYTLxjEyqNBv/pGr9pXHaVyrvhUbga1jORR/gcDqwUkaxSDf9smv1pH5niAbufF3aZjf6qmS+NiGzQS3of2/3jWZVdgD/u4qVnnL+sH3/t3+3r5POZFndVUG9VkrARjXCUS7ubVPtZEH3gVruiXH/1rQyUgCqoYjgiYHoVz3IUj/2qZPkZENgeTFDZgDRSDfXfHRYZg+lfFd0lTy2gp4XAAAALHRSTlMAP0+4VovJwfsZC+Bn7YPm8JJ4bv3pzvOaydFakObaqeJ0YDsyxG4wvu+unkCG/fsAAAH+SURBVCiRjdJXe9owFAZgE6CUNHs03W26h/coNsvGeFEwZkNYYROgAUKzOn97JSBP05KLfnfSK+mRjg6C/Hdsdxfnltae2u2bLxDEuYBrByD1rycnu28cr5Htt7sbz+z7V7j5A8hlc9KZNLfev5t0Op3mZf1gaa7bGz8LjUaj3W5H9gqtVrsRGa//qs/V/Tgu4pjEcZwkWSSGYZbVGjefTG353BKDQRJnJQksELE4YNEau6d4q1BDUdRL4oDz+bhmxTExKLbWp4ee14aGYcyUy3MxDCJai7wE+KgwDMAAJdlyntOSEI1h4QM8dVQM8DwfIOBeNs+xMobhQdTY2QN4e/T52OfjeQEqW+bYKI5DrEUgHkKcqYaXyywTJEkvahQjy1M89fg8PloWkjGNZXEG9Xq9hDDH1KkHJErLfqCaphLgZRDhhQ5TRxATM43FBgJBEMJx8RXAlS+po48giQRDZ/z+pH/AA5MvRs9hFeaYDieYEtAMxQuCTF/sTMu38r377RMIVCbjVylapulo6uHsV1zdsxBEJRwGewdpQEzJdfXdrm4/BKIoYZUpmekoo6p3/nSKq9evVEIUBVQ10+HB2TVDkHu9qk5VKEVRqibV793/u8sc2VxV1ymKMvVc1vlvD7ofQK7oZm7Vtti8iGM1m9PN7NYNBGNzOh3Xx78BPT2InauZDZQAAAAASUVORK5CYII=",
},
{
  name: "Nurx STD Test Kit",
  resources: [
    ["Home Test Kit", "home"],
    ["Insurance Coverage", "cross"],
    ["Message Clinicians", "desktop"],
  ] as [string, string][], // Ensure type is [string, string][]
  resource_link:
    "https://www.nurx.com/sti-testing/",
  logo_image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAAnElEQVR4Ae3NERDDMABA0a/TSj1SyV2lmLtiaRKMTCaBeCRavwuE6oFYqBqa69zdBt2mg2mffvj8dlo0dEp1IEdjrWFUcL0csTTJkNIILrTbfQuXyrJxyFNliEmC9RVEQcfMJ3be9e/YfKgKHuEbBVXGOIHz+zRvGhey4JgWwVyiSZDVDjaIjMziGQHWHtaIr8UQQQU/gdPNc/rLCwt+M3hAXM57AAAAAElFTkSuQmCC",
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
      <span className="m-4 rounded-lg border border-border p-2 text-center md:m-0">
        🚧 Hang tight! This page is currently under construction.{" "}
      </span>

      <section
        id="clinics"
        className="m-4 rounded-xl border border-[1] border-gray-300 p-6 md:m-0"
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
        className="m-4 mt-5 rounded-xl border border-[2] border-gray-300 p-5 md:m-0"
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
