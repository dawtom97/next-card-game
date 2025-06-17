import { useDrop } from "react-dnd";
import { CardData } from "./Card";
import { useRef } from "react";

type DropZoneProps = {
  onCardDrop: (card: CardData) => void;
  onFailedDrop?: (card: CardData) => void;
  children?: React.ReactNode;
  slotLabel?: string;
  isOccupied?: boolean;
};

export default function DropZone({
  onCardDrop,
  onFailedDrop,
  children,
  slotLabel,
  isOccupied,
}: DropZoneProps) {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: "CARD",
    drop: (item: CardData) => {
      if (!isOccupied) {
        onCardDrop(item);
      } else {
        console.log("Slot zajęty — drop zablokowany");
        if (onFailedDrop) {
          onFailedDrop(item);
        }
      }
    },

    canDrop: () => !isOccupied,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  dropRef(ref);

  return (
    <div
      ref={ref}
      className={`min-h-[100px] flex flex-col items-center justify-center border-2 rounded p-4 transition-all
        ${isOver ? "bg-green-200" : "bg-gray-100"} ${
        canDrop ? "border-green-500" : "border-gray-400"
      }`}
    >
      <span className="text-sm text-gray-500 mb-2">{slotLabel}</span>
      {children || (
        <span className="text-xs text-gray-400">
          {isOccupied ? "Zajęte" : "Upuść tutaj"}
        </span>
      )}
    </div>
  );
}
