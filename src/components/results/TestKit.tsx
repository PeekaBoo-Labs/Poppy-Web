import Image from "next/image";
type TestKitProps = {
  name: string;
  resources: Array<[desc: string, type: string]>; // Array of tuples with desc and type
  resource_link: string;
  logo_image: string;
};

const RESOURCE_ICONS: { [key: string]: string } = {
  "home": "/icons/health-labels/home.svg",
  "blood": "/icons/health-labels/blood.svg",
  "package": "/icons/health-labels/package.svg",
  "rapid": "/icons/health-labels/timer.svg",
  "desktop": "/icons/health-labels/desktop.svg",
  "cross":"/icons/health-labels/medicalCross.svg"
};

export default function TestKit({ name, resources, resource_link, logo_image }: TestKitProps) {
  return (
    <div className="test-kit-card mt-5 rounded-lg">
      <div className="test-kit-header">
        <a
          href={resource_link}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex items-center justify-between text-lg underline"
        >
          <div className="flex items-center gap-3">
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
      <div className="resources mt-3 flex flex-wrap gap-5">
        {resources.map(([desc, type], index) => (
          <div key={index} className="flex items-center gap-2 font-light text-gray-400">
            <img className="h-[22px] w-[22px]" src={RESOURCE_ICONS[type]} alt={desc} />
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
}
