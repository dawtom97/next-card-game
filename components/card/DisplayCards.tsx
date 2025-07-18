import { useGetAllCardsQuery } from "@/redux/services/cards";
import Image from "next/image";

export function DisplayCards() {
    const { data: cards, isLoading } = useGetAllCardsQuery({});

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card-grid display flex flex-wrap gap-6 justify-center">
    {cards.map((card) => (
        <div key={card.id} className="card-item w-80 h-[28rem] bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-xl rounded-xl overflow-hidden border border-zinc-300 transition-transform ">
            <div className="w-full h-64 relative">
                
                <Image
                    src={card.imgPath}
                    alt={card.cardName}
                    fill
                    className="object-cover object-center"
                />
            </div>

            <div className="p-4 flex flex-col h-[calc(100%-12rem)] justify-between">
                <div className="space-y-1 text-zinc-800">
                    <h3 className="text-xl font-bold text-center">{card.cardName}</h3>
                    <p className="text-sm text-zinc-600 italic text-center">{card.description}</p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-zinc-700">
                    <div><span className="font-semibold">Power:</span> {card.power}</div>
                    <div><span className="font-semibold">Type:</span> {card.type}</div>
                    <div><span className="font-semibold">Fraction:</span> {card.fraction}</div>
                    <div><span className="font-semibold">Row:</span> {card.row.join(', ')}</div>
                </div>

                <div className="mt-4 p-2 bg-zinc-300 text-zinc-800 text-xs rounded-md text-center">
                    <span className="font-semibold">Ability:</span> {card.ability || "None"}
                </div>
            </div>
        </div>
    ))}
</div>

    );
}   