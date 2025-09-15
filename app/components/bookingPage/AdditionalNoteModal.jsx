import { IoClose } from "react-icons/io5";
import Button from "../Button";
import { useState } from "react";

const AdditionalNoteModal = ({
  open,
  onClose,
  // additionalNote,
  setAdditionalNote,
}) => {
  const [note, setNote] = useState("");

  const handleAddnote = () => {
    setAdditionalNote(note);
    onClose(false);
  };

  if (!open) return null;
  return (
    <main className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-25 flex justify-center items-center p-5 z-50">
      <div className="max-w-xl w-full rounded-xl bg-white p-5">
        <IoClose
          size={20}
          onClick={() => {
            onClose(false);
          }}
          className="ml-auto cursor-pointer"
        />

        <div>
          <p>Additional Note</p>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
            className="border border-swGray200 mt-2 hover:border-swPrimary500 focus:outline-none w-full p-2 text-sm"
          />

          <div className="ml-auto mt-3">
            <Button
              label={"Add note"}
              bgColor={"bg-swPrimary500 hover:bg-swPrimary600"}
              className="text-white text-center"
              onClick={handleAddnote}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdditionalNoteModal;
