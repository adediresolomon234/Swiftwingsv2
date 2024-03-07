import React from 'react';

const PhoneExt = () => {
    return (
        <div>
            <label for="hs-inline-leading-select-label" className="block font-medium text-swGray900 mb-2 text-lg">Phone number</label>
            <div className="relative">
                <input type="text" id="" name="inline-add-on" className="py-3 px-36 ps-20 block w-full rounded-lg text-sm bg-white border border-swGray100 hover:border-swPrimary500 overflow-hidden focus:outline-none cursor-pointer" placeholder="+234 (000) 000-0000" />
                <div className="absolute inset-y-0 start-0 flex items-center text-gray-500 ps-px">
                    <label for="hs-inline-leading-select-country" className="sr-only">Country extension</label>
                    <div className="select-container">
                        <select id="Phone extension" name="Phone extension" className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-1 text-gray-500 focus:outline-none cursor-pointer">
                            <option>+234</option>
                            <option>+1</option>
                            <option>+44</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default PhoneExt;
