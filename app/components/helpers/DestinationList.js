import { useState } from 'react';


const destinations = [
    { name: 'Abijan', country: 'Côte d’Ivoire', image: '/images/Destination.png' },
    { name: 'BARCELONIA', country: 'Spain', image: '/images/Destination2.png' },
    { name: 'China', country: 'Hong-kong', image: '/images/Destination23.png' },

];

const DestinationList = () => {
    const [selectedLetter, setSelectedLetter] = useState(null);

    const scrollToDestination = (letter) => {
        setSelectedLetter(letter);
        const element = document.getElementById(letter);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-8">
            <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    {Array.from({ length: 26 }, (_, i) => String.fromCharCode('A'.charCodeAt(0) + i)).map((letter) => (
                        <p key={letter} onClick={() => scrollToDestination(letter)} className="cursor-pointer">
                            {letter}
                        </p>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="md:flex-grow">
                    {destinations.map((destination) => (
                        <div key={destination.name} id={destination.name[0].toUpperCase()} className="flex flex-col items-center">
                            <img src={destination.image} alt={destination.name} />
                            <div className="mt-2"> {/* Add margin-top for spacing between image and text */}
                                <p>{destination.name}</p>
                                <p>{destination.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


        </div>

    );
}
export default DestinationList;