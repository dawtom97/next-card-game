import { useState } from 'react';
import Card, { CardData } from './Card';
import DropZone from './DropZone';

export default function Table() {
  const [handCards, setHandCards] = useState<CardData[]>([
    { id: '1', label: 'Karta 1' },
    { id: '2', label: 'Karta 2' },
  ]);

  const [slots, setSlots] = useState<(CardData | null)[]>([null, null, null, null]);

  const handleDrop = (index: number, card: CardData) => {
    setSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = card;
      return newSlots;
    });

    setHandCards((prev) => prev.filter((c) => c.id !== card.id));
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        {handCards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">
        {slots.map((card, i) => (
          <DropZone
            key={i}
            onCardDrop={(card) => handleDrop(i, card)}
            slotLabel={`Slot ${i + 1}`}
          >
            {card && <Card {...card} />}
          </DropZone>
        ))}
      </div>
    </div>
  );
}
