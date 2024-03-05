
'use client';

import { Modal, Select } from 'flowbite-react';
import Button from "../../components/Button";
import { useState } from 'react';
import { SWSuccessful } from "../../components/svgs";
import "../../../styles.css"



function ModalPopup() {
  const [openModal, setOpenModal] = useState(false);
  const [modalPlacement, setModalPlacement] = useState('center')

  return (
    <>
      <Button label="Complete" bgColor={"bg-swPrimary500"} textColor={"text-white"} onClick={() => setOpenModal(true)} />
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="features-card overflow-hidden">
            <Modal
              show={openModal}
              position={modalPlacement}
              onClose={() => setOpenModal(false)}
              className="mt-32 items-center justify-center"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-center">
                    <SWSuccessful className="mx-auto mb-2 h-32 w-40 text-swGray700" />
                    <h3 className="mb-5 text-lg font-normal text-swGray700">
                      Booking Completed
                    </h3>
                    <p className="mb-8 text-sm justify-center items-center text-swGray700">
                      You can check out your booking status in your profile or wait for our mail.
                    </p>
                    <div className="flex justify-center gap-8 text-sm mb-8">
                      <Button
                        label="Go home"
                        className={"border border-swGray500 hover:bg-swPrimary500"}
                        textColor={"text-swPrimary500 hover:text-white"}
                        onClick={() => setOpenModal(false)}
                      />
                      <Button
                        label="View Profile"
                        bgColor={"bg-swPrimary500"}
                        textColor={"text-white"}
                        onClick={() => setOpenModal(false)}
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>

        </div>
      )}

    </>
  );
}
export default ModalPopup;