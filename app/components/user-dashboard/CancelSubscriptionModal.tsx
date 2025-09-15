const CancelSubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-4 h-[154px] w-full max-w-[243px]"
      >
        <h2 className="text-[16px] font-medium text-center mb-1">
          Cancel Subscription
        </h2>
        <p className="mb-4 text-center text-xs text-gray-600">
          Are ou sure you want to cancel your current subscription?
        </p>
        <div className="flex justify-center items-center gap-2">
          <button
            // onClick={() => setCompState("view")}
            onClick={onClose}
            className="flex items-center justify-center h-[36px] w-[84px] rounded-full text-[14px] border border-swGray800 hover:bg-swPrimary100"
          >
            Cancel
          </button>
          <button
            // onClick={() => setCompState("view")}
            onClick={onConfirm}
            className="flex items-center justify-center h-[36px] w-[84px] rounded-full text-[14px] text-white bg-swError500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
export default CancelSubscriptionModal;
