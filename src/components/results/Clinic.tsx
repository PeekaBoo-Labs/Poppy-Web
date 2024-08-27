import Image from "next/image";

type ClinicProps = {
  name: string;
  link: string;
  logo_image: string;
  images: string[];
  services: Array<[desc: string, type: string]>; // Array of tuples with desc and type
};

const ICONS: { [key: string]: string } = {
  lgbtq: "/icons/health-labels/rainbow.svg",
  urban: "/icons/health-labels/building.svg",
  medical: "/icons/health-labels/medicalCross.svg",
  appointment: "/icons/health-labels/calendar.svg",
  youth: "/icons/health-labels/figure.svg",
  blood: "/icons/health-labels/blood.svg",
  click: "/icons/health-labels/click.svg",
  desktop: "/icons/health-labels/desktop.svg",
  glassplus: "/icons/health-labels/glassplus.svg",
  home: "/icons/health-labels/home.svg",
  package: "/icons/health-labels/package.svg",
  step2: "/icons/health-labels/step2.svg",
  testTube: "/icons/health-labels/testTube.svg",
  timer: "/icons/health-labels/timer.svg",
};

export default function Clinic({
  name,
  link,
  logo_image,
  images,
  services,
}: ClinicProps) {
  return (
    <div className="clinic-card mt-5 rounded-lg">
      <div className="clinic-header">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex items-center justify-between text-lg underline"
        >
          <div className="flex flex-row gap-3">
            <img
              src={logo_image}
              alt={`${name} Logo`}
              className="h-[30px] w-[30px] rounded-[50%]"
            />
            {name}
          </div>

          <Image
            width={18}
            height={18}
            src="/arrowUpRight.svg"
            alt="arrow link"
          />
        </a>
      </div>

      <div className="clinic-images flex flex-row gap-3 overflow-scroll">
        {images.map((image_url, index) => (
          <img
            src={image_url}
            key={index}
            className="h-[120px] w-[240px] rounded-lg"
            alt={`Clinic image ${index + 1}`}
          />
        ))}
      </div>

      <div className="clinic-services mt-3 flex flex-row flex-wrap gap-5">
        {services.map(([desc, type], index) => (
          <div
            key={index}
            className="flex flex-row gap-2 align-middle font-light text-gray-400"
          >
            <img className="h-[22px] w-[22px]" src={ICONS[type]} alt={desc} />
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
}
