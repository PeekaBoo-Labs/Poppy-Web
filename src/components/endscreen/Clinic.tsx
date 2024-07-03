import Image from "next/image";

type ClinicProps = {
  name: string;
  link: string;
  logo_image: string;
  images: string[];
  services: Array<[desc: string, type: string]>; // Array of tuples with desc and type
};

const ICONS: { [key: string]: string } = {
    lgbtq: '/icons/rainbow.svg',
    urban: '/icons/building.svg',
    medical: '/icons/medicalCross.svg',
    appointment: '/icons/calendar.svg',
    youth: '/icons/figure.svg',
};

export default function Clinic({
  name,
  link,
  logo_image,
  images,
  services,
}: ClinicProps) {
  return (
    <div className="clinic-card rounded-lg mt-5">
      <div className="clinic-header">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg underline mb-2 flex items-center justify-between"
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

      <div className="clinic-images flex flex-row gap-3">
        {images.map((image_url, index) => (
          <img
            src={image_url}
            key={index}
            className="h-[120px] w-[240px] rounded-lg"
            alt={`Clinic image ${index + 1}`}
          />
        ))}
      </div>

      <div className="clinic-services flex flex-row flex-wrap gap-5 mt-3">
        {services.map(([desc, type], index) => (
          <div
            key={index}
            className="font-light text-gray-400 flex flex-row gap-2 align-middle"
          >
            <img className="h-[22px] w-[22px]" src={ICONS[type]} alt={desc} />
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
}
