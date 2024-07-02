export default function TestKit({ name, resources, resource_link, logo_image }) {
    return (
      <div className="test-kit-card rounded-lg mt-5">
        <div className="test-kit-header">
          <a
            href={resource_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg underline mb-2 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
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
              className="h-[30px] w-[30px]"
            />
          </a>
        </div>
        <div className="resources flex flex-wrap gap-5 mt-3">
          {resources.map((resource, index) => (
            <div key={index} className="font-light text-gray-400 flex items-center gap-2">
              <img className="h-[22px] w-[22px]" src="github.svg" alt="Resource icon" />
              {resource}
            </div>
          ))}
        </div>
      </div>
    );
  }
  