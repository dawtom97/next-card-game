"use client";
"use client";
import { useRef } from 'react';
import { useDrag } from 'react-dnd';

export type CardData = {
  id: string;
  label: string;
};

export default function Card({ id, label }: CardData) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'CARD',
    item: { id, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const ref = useRef<HTMLDivElement>(null);
  dragRef(ref);

  return (
    <div
      ref={ref}
      className={`p-2 border rounded bg-red-500 shadow cursor-move w-24 text-center ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {label}
    </div>
  );
}

