'use client';
import Button from "../Button";
import { useState } from 'react';
import { SWSuccessful, SWClose, SWMarkIcon } from "../svgs";
import "../../../styles.css"

function ProfileModal({ title, message, openModalLabel }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        label={openModalLabel}
        bgColor={"bg-swPrimary500"}
        textColor={"text-white"}
        onClick={() => setOpenModal(true)}
        endIcon={<SWMarkIcon className="text-xl" />}
      />
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="features-card overflow-hidden rounded-lg bg-white p-6 relative">
            <button onClick={() => setOpenModal(false)} className="absolute top-6 right-10 text-sm border-2 border-swGray200 text-swGray300  rounded-full p-1"><SWClose /></button>
            <div className="flex flex-col items-center justify-center p-8">
              <div className="text-center">
                <SWSuccessful className="mx-auto mb-2 h-40 w-60 text-swGray700" />
                <h3 className="mb-5 text-lg font-normal text-swGray700">
                  {title}
                </h3>
                <p className="mb-8 text-sm justify-center items-center text-swGray700">
                  {message}
                </p>
                <div className="flex justify-center gap-8 text-sm mb-8">
                  <Button
                    label="Done"
                    className={" w-full border border-swGray500 hover:bg-swPrimary500"}
                    textColor={"text-swPrimary500 hover:text-white"}
                    onClick={() => setOpenModal(false)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileModal;
