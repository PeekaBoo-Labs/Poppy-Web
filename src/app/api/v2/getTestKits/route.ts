import { verify } from "@/lib/entropy-src";

export type TestKit = {
  name: string;
  resources: [string, string][];
  resource_link: string;
  logo_image: string;
};

const test_kit_providers: TestKit[] = [
  {
    name: "CVS STD Test Kit",
    resources: [
      ["Home Test Kit", "home"],
      ["Blood Test", "blood"],
    ],
    resource_link:
      "https://www.cvs.com/shop/home-health-care/home-tests/std-hiv-tests",
    logo_image:
      "https://i.pinimg.com/originals/63/9f/a2/639fa28a10efe65bae2015516662dce6.png",
  },
  {
    name: "Lemonaid Online STD Test Kit",
    resources: [["Home Test Kit", "home"]],
    resource_link: "https://www.lemonaidhealth.com/services/std-testing",
    logo_image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEX////8/fnE4aGJwy+OxTzk8tXt9uKSx0Wx14D98fbokrG42YvibJrTAFvdW43++PvaLnjWAGbVDWb65e3xtc30+u7xudDOOWyUyEjq9N2Qek5/w0DtpMBJpyJntzgzpQiqxZCVxXqKx0jHcoRzjT3BT2f0y9rrm7q+m7L0AAAAw0lEQVR4AZWSBRLDMAwEFUaDXAoz/P+HVWEoIxc2nJtN7BvDnzhgx/X8wJaFfuTHcCRJ04QuGYUZHMmFkCRGUeSHx0xpNHjiRTLRiPOFE4mrMJi73HCIBA3eChJLYJCIVc2KRCNubVfwIpyw6tuIRBbZ9n1tq27o+34EnstE4az40PXbfsETLxZF16+isYhRvSBKXoyiaUWDCRMGHpXzLJ8zfd8LzoLKB4bQDagkY3QCFiQasdnCXfA/fS8WIRVYSeBH7jvOC4D1RnUzAAAAAElFTkSuQmCC",
  },
  {
    name: "TBD Health STI/STD Convenient Test Kit",
    resources: [["Home Test Kit", "home"]],
    resource_link:
      "https://www.tbd.health/locations/sti-std-testing-screening-treatment-near-me/",
    logo_image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABfVBMVEVHcEyycmZxkRRefguqXVCxYVHvopXTfHHrmIzpta764dLPZ03jk4quXFNzlxnq0a4/UgpTZRWifHEmNQDxlXMoQwB4VEXzyKfBamXAZFSxWE3pmHvwqJr9q4hcigBvkBpObgBqjA34vp5GYgr86NP3u5t4VkkAAAAdMgBwbWBWNSb71bf6hEn+n2P9mlf1fkL9lFHBQiLnaDXZYDD6oVv+rGfZQynjTS3yZTbxdD37jEvtVzLofED3cEH8jVH9lV3+p2DHOCPqbznRUifISSTPWzL0k1G2OiP4eUn7v5nQOSLhYTLxjEyqNBv/pGr9pXHaVyrvhUbga1jORR/gcDqwUkaxSDf9smv1pH5niAbufF3aZjf6qmS+NiGzQS3of2/3jWZVdgD/u4qVnnL+sH3/t3+3r5POZFndVUG9VkrARjXCUS7ubVPtZEH3gVruiXH/1rQyUgCqoYjgiYHoVz3IUj/2qZPkZENgeTFDZgDRSDfXfHRYZg+lfFd0lTy2gp4XAAAALHRSTlMAP0+4VovJwfsZC+Bn7YPm8JJ4bv3pzvOaydFakObaqeJ0YDsyxG4wvu+unkCG/fsAAAH+SURBVCiRjdJXe9owFAZgE6CUNHs03W26h/coNsvGeFEwZkNYYROgAUKzOn97JSBP05KLfnfSK+mRjg6C/Hdsdxfnltae2u2bLxDEuYBrByD1rycnu28cr5Htt7sbz+z7V7j5A8hlc9KZNLfev5t0Op3mZf1gaa7bGz8LjUaj3W5H9gqtVrsRGa//qs/V/Tgu4pjEcZwkWSSGYZbVGjefTG353BKDQRJnJQksELE4YNEau6d4q1BDUdRL4oDz+bhmxTExKLbWp4ee14aGYcyUy3MxDCJai7wE+KgwDMAAJdlyntOSEI1h4QM8dVQM8DwfIOBeNs+xMobhQdTY2QN4e/T52OfjeQEqW+bYKI5DrEUgHkKcqYaXyywTJEkvahQjy1M89fg8PloWkjGNZXEG9Xq9hDDH1KkHJErLfqCaphLgZRDhhQ5TRxATM43FBgJBEMJx8RXAlS+po48giQRDZ/z+pH/AA5MvRs9hFeaYDieYEtAMxQuCTF/sTMu38r377RMIVCbjVylapulo6uHsV1zdsxBEJRwGewdpQEzJdfXdrm4/BKIoYZUpmekoo6p3/nSKq9evVEIUBVQ10+HB2TVDkHu9qk5VKEVRqibV793/u8sc2VxV1ymKMvVc1vlvD7ofQK7oZm7Vtti8iGM1m9PN7NYNBGNzOh3Xx78BPT2InauZDZQAAAAASUVORK5CYII=",
  },
  {
    name: "Nurx STD Test Kit",
    resources: [["Home Test Kit", "home"]],
    resource_link: "https://www.nurx.com/sti-testing/",
    logo_image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAAnElEQVR4Ae3NERDDMABA0a/TSj1SyV2lmLtiaRKMTCaBeCRavwuE6oFYqBqa69zdBt2mg2mffvj8dlo0dEp1IEdjrWFUcL0csTTJkNIILrTbfQuXyrJxyFNliEmC9RVEQcfMJ3be9e/YfKgKHuEbBVXGOIHz+zRvGhey4JgWwVyiSZDVDjaIjMziGQHWHtaIr8UQQQU/gdPNc/rLCwt+M3hAXM57AAAAAElFTkSuQmCC",
  },
];
// hard coded values with reliable locations to purchase STI kits
export async function GET(request: Request) {

  if (!verify("test-kits", request.headers.get("Entropy"))) {
    return new Response("Um what happened...", { status: 500 });
  }

  return new Response(JSON.stringify(test_kit_providers), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://screening.poppyml.com",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      NOTE: "This is just a MVP, please don't abuse this API or I'll have to lock it up :(",
    },
  });
}

