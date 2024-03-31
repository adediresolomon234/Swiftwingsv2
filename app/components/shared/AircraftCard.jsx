import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from '@mdi/js';

const AircraftCard = ({ aircraft }) => {
    const { name, images, seat, kilometer, feet } = aircraft;

    return (
        <div className="flex flex-col items-center justify-center pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
            <div className="relative h-full">
                {images && images.length > 0 ? (
                    <img
                        className="w-100 rounded-md h-full object-cover"
                        alt={`Image of ${name}`}
                        src={images[0].media.path}
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="self-stretch relative leading-6 font-medium">{name}</div>
            <div className="self-stretch flex justify-center gap-4 py-0 px-1 text-center text-xl text-gray-800">
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiCarSeat} />
                    </svg>
                    <div className="relative leading-4.5 text=[5px]">{seat}</div>
                </div>
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiSpeedometer} />
                    </svg>
                    <div className="relative leading-4. text=[5px]">{kilometer}</div>
                </div>
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiArrowLeftRight} />
                    </svg>
                    <div className="relative leading-4.5 text=[5px]">{feet}</div>
                </div>
            </div>
        </div>
    );
};

export default AircraftCard;
