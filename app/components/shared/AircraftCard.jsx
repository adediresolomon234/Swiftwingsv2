import { mdiCarSeat, mdiSpeedometer, mdiArrowLeftRight } from '@mdi/js';
import { useRouter } from "next/navigation";

const AircraftCard = ({ aircraft }) => {
    const { model, image, speed, feet, features } = aircraft;
    const router = useRouter();

    const handleCardClick = () => {
        const query = new URLSearchParams({
            image: image ? encodeURIComponent(image) : '',
            range: feet ? encodeURIComponent(feet) : '',
            seat: features.no_of_seats ? encodeURIComponent(features.no_of_seats) : '',
            speed: speed ? encodeURIComponent(speed) : '',
            name: features.manufacturer ? encodeURIComponent(features.manufacturer) : '',
            model: model ? encodeURIComponent(model) : '',
            luggage_capacity: features.luggage_capacity ? encodeURIComponent(features.luggage_capacity) : '',
            interior_height: features.interior_height ? encodeURIComponent(features.interior_height) : '',
            interior_width: features.interior_width ? encodeURIComponent(features.interior_width) : '',
            overview_summary: features.overview_summary ? encodeURIComponent(features.overview_summary) : '',
            image_url: features.image_url ? encodeURIComponent(features.image_url) : '',
            image_url_2: features.image_url_2 ? encodeURIComponent(features.image_url_2) : '',
            image_url_3: features.image_url_3 ? encodeURIComponent(features.image_url_3) : '',
            image_url_4: features.image_url_4 ? encodeURIComponent(features.image_url_4) : ''
        });

        router.push(`/fleet-specification?${query.toString()}`);
    };


    return (
        <div className="flex flex-col items-center justify-center pt-2 px-2 pb-[width] box-border gap-2 text-center text-base text-black font-body-xs-regular">
            <div className="relative h-full" onClick={handleCardClick}>
                {image ? (
                    <img
                        className="w-full rounded-xl h-full object-cover"
                        src={image}
                        alt={`Image of ${model}`}
                        width={300}
                        height={200}
                    />
                ) : (
                    <p>No image available</p>
                )}
            </div>
            <div className="self-stretch relative leading-6 font-medium mt-3 text-xl mb-3">{features.manufacturer}</div>
            <div className="self-stretch flex justify-center gap-4 py-0 px-1 text-center text-sm text-gray-800">
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiCarSeat} />
                    </svg>
                    <div className="relative leading-4.5 ml-3 ">{features.no_of_seats}</div>
                </div>
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiSpeedometer} />
                    </svg>
                    <div className="relative leading-4 ml-3">{speed}</div>
                </div>
                <div className="flex items-center">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiArrowLeftRight} />
                    </svg>
                    <div className="relative leading-4.5 ml-3 ">{feet}</div>
                </div>
            </div>
        </div>
    );
};

export default AircraftCard;
