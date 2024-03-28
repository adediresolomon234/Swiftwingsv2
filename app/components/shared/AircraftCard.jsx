import Image from 'next/image';

const AircraftCard = ({ name, image, seat, kilometer, feet, icon, icon2, icon3 }) => {
    return (
        <div className="flex flex-col items-center justify-center pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
            <Image
                className="w-80 rounded-md h-43 object-cover"
                alt={name}
                src={`/images/${image}`}
                width={80}
                height={43}
                layout="responsive"
            />
            <div className="self-stretch relative leading-6 font-medium">
                {name}
            </div>
            <div className="self-stretch grid grid-cols-3 gap-4 py-0 px-1 text-left text-xs text-gray-800">
                <div className="flex items-center justify-start gap-2">
                    <svg className="text-xl mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d={icon} />
                    </svg>
                    <div className="relative leading-4.5 w-[32rem]">{seat}</div>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <svg className="text-xl mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d={icon2} />
                    </svg>
                    <div className="relative leading-4.5 w-[32rem]">{kilometer}</div>
                </div>
                <div className="flex items-center justify-start gap-2">
                    <svg className="text-xl mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d={icon3} />
                    </svg>
                    <div className="relative leading-4.5 w-[32rem]">{feet}</div>
                </div>
            </div>
        </div>
    );
};

export default AircraftCard;

