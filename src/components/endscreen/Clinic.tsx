export default function Clinic({ name, link, logo_image, images, services }) {
  return (
    <div className="clinic-card borderrounded-lg mt-5">
      <div className="clinic-header">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg underline mb-2 flex items-center flex flex-row justify-between"
        >
          <div className="flex flex-row gap-3">
            <img
              src={logo_image}
              alt={`${name} Logo`}
              className="h-[30px] w-[30px] rounded-[50%]"
            />
            {name}
          </div>
          <img
            src={logo_image}
            alt={`${name} Logo`}
            width={40}
            height={40}
            className="h-[30px] w-[30px]"
          />
        </a>
      </div>

      <div className="clinic-images flex flex-row gap-3">
        {images.map((image_url, index) => {
          return (
            <img
              src={image_url}
              key={index}
              className="h-[120px] w-[240px] rounded-lg"
            ></img>
          );
        })}
      </div>

      <div className="clinic-services flex flex-row flex-wrap gap-5 mt-3 ">
        {services.map((service, index) => {
          return (
          <div key={index} className="font-light text-gray-400 flex flex-row gap-2 align-middle"><img className='h-[22px] w-[22px]' src='github.svg'></img>{service}</div>
            )
        })}
      </div>
    </div>
  );
}
