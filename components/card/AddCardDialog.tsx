import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { useState } from "react"
import { toast } from "sonner"
import { useCreateCardMutation } from "@/redux/services/cards"




type FormData = {
    cardName: string;
    description: string;
    power: number;
    fraction: string;
    type: string;
    row: string[];
    ability: string;
    imgPath: string;
};



export function AddCardDialog() {

    const [formData, setFormData] = useState<FormData>({
        cardName: "",
        description: "",
        power: 0,
        fraction: "",
        type: "",
        row: [],
        ability: "",
        imgPath: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: name === "power" ? Number(value) : value
    }));
}

    const onValueChange = (value: string, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const [createCard] = useCreateCardMutation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if(!formData.cardName || !formData.description || formData.power < 0 || !formData.fraction || !formData.type || formData.row.length === 0 || !formData.ability) {
            toast.error("All fields are required")
            return;
        }

        if (formData.power < 0 || formData.power > 15) {
            toast.error("Power must be between 0 and 15")
            return;
        }

        try{
            await createCard(formData).unwrap()
            toast.success("Card created successfully")
            setFormData({
                cardName: "",
                description: "",
                power: 0,
                fraction: "",
                type: "",
                row: [],
                ability: "",
                imgPath: ""
            })
        } catch (err) {
            toast.error("Failed to create card")
            console.log(err)
        }

        console.log("Form submitted with data:", formData)

    }

    return (
        <Dialog>
            
                <DialogTrigger asChild>
                    <Button variant="outline">Add card</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Add New card</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Card Name</Label>
                            <Input id="name" name="cardName" placeholder="Geralt of Rivia" value={formData.cardName} onChange={handleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" placeholder="A legendary witcher with unmatched swordsmanship." value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="power">Power</Label>
                            <Input id="power" name="power" type="number" value={formData.power} onChange={handleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="fraction">Fraction</Label>
                            <Select value={formData.fraction} onValueChange={(value) => onValueChange(value, 'fraction')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select fraction" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="NorthernRealms">Northern Realms</SelectItem>
                                    <SelectItem value="Nilfgaard">Nilfgaard</SelectItem>
                                    <SelectItem value="Monsters">Monsters</SelectItem>
                                    <SelectItem value="Skellige">Skellige</SelectItem>
                                    <SelectItem value="Scoiatael">Scoia&#39;tael</SelectItem>
                                    <SelectItem value="Neutral">Neutral</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="type">Type</Label>
                            <Select value={formData.type} onValueChange={(value) => onValueChange(value, 'type')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Unit">Unit</SelectItem>
                                    <SelectItem value="Hero">Hero</SelectItem>
                                    <SelectItem value="Special">Special</SelectItem>
                                    <SelectItem value="Leader">Leader</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="row">Row</Label>
                            <ToggleGroup variant="outline" type="multiple" value={formData.row} onValueChange={(value) => setFormData(prev => ({ ...prev, row: value }))}>
                                <ToggleGroupItem value="Melee">
                                    Melee
                                </ToggleGroupItem>
                                <ToggleGroupItem value="Ranged">
                                    Ranged
                                </ToggleGroupItem>
                                <ToggleGroupItem value="Skellige">
                                    Skellige
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="ability">Ability</Label>
                            <Select value={formData.ability} onValueChange={(value) => onValueChange(value, 'ability')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select ability" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="None">None</SelectItem>
                                    <SelectItem value="Scorch">Scorch</SelectItem>
                                    <SelectItem value="Spy">Spy</SelectItem>
                                    <SelectItem value="Medic">Medic</SelectItem>
                                    <SelectItem value="MoraleBoost">Morale Boost</SelectItem>
                                    <SelectItem value="Agile">Agile</SelectItem>
                                    <SelectItem value="Horn">Horn</SelectItem>
                                    <SelectItem value="TightBond">Tight Bond</SelectItem>
                                    <SelectItem value="Muster">Muster</SelectItem>
                                    <SelectItem value="Weather-frost">Weather Frost</SelectItem>
                                    <SelectItem value="WeatherRain">Weather Rain</SelectItem>
                                    <SelectItem value="WeatherFog">Weather Fog</SelectItem>
                                    <SelectItem value="ClearWeather">Clear Weather</SelectItem>
                                    <SelectItem value="Hero">Hero</SelectItem>
                                    <SelectItem value="SummonAvenger">Summon Avenger</SelectItem>
                                    <SelectItem value="Decoy">Decoy</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="img-path">Image Path</Label>
                            <Input id="img-path" name="imgPath" value={formData.imgPath} onChange={handleChange} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                    </form>
                </DialogContent>
            
        </Dialog>
    )
}
