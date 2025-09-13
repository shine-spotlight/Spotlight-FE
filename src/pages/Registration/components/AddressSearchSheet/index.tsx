import DaumPostcode from "react-daum-postcode";
import BottomSheet from "@components/BottomSheet";

type AddressSearchSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (data: { zonecode: string; address: string }) => void;
};

export default function AddressSearchSheet({
  isOpen,
  onClose,
  onSelect,
}: AddressSearchSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="공간 검색"
      maxHeight={0.9}
    >
      <div data-nodrag>
        <DaumPostcode
          onComplete={(d) => {
            onSelect({
              zonecode: d.zonecode,
              address: d.roadAddress || d.jibunAddress,
            });
          }}
          autoClose
          style={{ width: "100%", height: 420 }}
        />
      </div>
    </BottomSheet>
  );
}
