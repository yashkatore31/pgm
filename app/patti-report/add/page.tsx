"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Trader = {
    id: number;
    name: string;
};

type FlowerEntry = {
    flowerName: string;
    carets: number;
    qtyPerCaret: number;
    rate: number;
};

export default function AddPattiReportPage() {
    const router = useRouter();
    const [traders, setTraders] = useState<Trader[]>([]);
    const [traderId, setTraderId] = useState<number | null>(null);
    const [date, setDate] = useState("");
    const [cooliePerCaret, setCooliePerCaret] = useState(0);
    const [motorRent, setMotorRent] = useState(0);
    const [jagaBhade, setJagaBhade] = useState(0);
    const [postage, setPostage] = useState(0);
    const [commissionRate, setCommissionRate] = useState(0);
    const [flowers, setFlowers] = useState<FlowerEntry[]>([
        { flowerName: "", carets: 0, qtyPerCaret: 0, rate: 0 },
    ]);

    useEffect(() => {
        async function fetchTraders() {
            const res = await fetch("/api/trader");
            const data = await res.json();
            setTraders(data);
        }

        fetchTraders();
    }, []);

    const handleFlowerChange = (
        index: number,
        field: keyof FlowerEntry,
        value: string
    ) => {
        const newFlowers = [...flowers];

        newFlowers[index] = {
            ...newFlowers[index],
            [field]: field === "flowerName" ? value : parseFloat(value) || 0,
        };

        setFlowers(newFlowers);
    };


    const handleAddFlower = () => {
        setFlowers([...flowers, { flowerName: "", carets: 0, qtyPerCaret: 0, rate: 0 }]);
    };

    const handleRemoveFlower = (index: number) => {
        const newFlowers = flowers.filter((_, i) => i !== index);
        setFlowers(newFlowers);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const report = {
            traderId,
            date,
            cooliePerCaret,
            motorRent,
            jagaBhade,
            postage,
            commissionRate,
            flowers,
        };

        const res = await fetch("/api/patti-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(report),
        });

        if (res.ok) {
            router.push("/patti-report");
        } else {
            alert("Failed to add report");
        }
    };

    const getInputValue = (val: number) => (val === 0 ? "" : val);

    return (
        <div className="min-h-screen bg-white px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Patti Report</h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 border border-gray-300 rounded-lg p-6 shadow-sm bg-white"
                >

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Trader</label>
                        <select
                            className="input"
                            value={traderId ?? ""}
                            onChange={(e) => setTraderId(parseInt(e.target.value))}
                            required
                        >
                            <option value="">Select Trader</option>
                            {traders.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            className="input"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Coolie / Caret</label>
                            <input
                                className="input"
                                type="number"
                                value={getInputValue(cooliePerCaret)}
                                onChange={(e) => setCooliePerCaret(parseFloat(e.target.value) || 0)}
                                step="any"
                                min="0"
                                
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Motor Rent</label>
                            <input
                                className="input"
                                type="number"
                                value={getInputValue(motorRent)}
                                onChange={(e) => setMotorRent(parseFloat(e.target.value) || 0)}
                                step="any"
                                min="0"
                                
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Jaga Bhade</label>
                            <input
                                className="input"
                                type="number"
                                value={getInputValue(jagaBhade)}
                                onChange={(e) => setJagaBhade(parseFloat(e.target.value) || 0)}
                                step="any"
                                min="0"
                                
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Postage</label>
                            <input
                                className="input"
                                type="number"
                                value={getInputValue(postage)}
                                onChange={(e) => setPostage(parseFloat(e.target.value) || 0)}
                                step="any"
                                min="0"
                                
                            />
                        </div>

                        <div className="space-y-1 sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Commission Rate (%)</label>
                            <input
                                className="input"
                                type="number"
                                value={getInputValue(commissionRate)}
                                onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                                step="any"
                                min="0"
                                
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-700 mt-6">Flowers</h2>
                    {flowers.map((f, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50 rounded border border-gray-300 p-3 mb-3"
                        >
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Flower Name</label>
                                <input
                                    className="input"
                                    placeholder="Flower Name"
                                    value={f.flowerName}
                                    onChange={(e) => handleFlowerChange(idx, "flowerName", e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Carets</label>
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Carets"
                                    value={getInputValue(f.carets)}
                                    onChange={(e) => handleFlowerChange(idx, "carets", e.target.value)}
                                    min="0"
                                    step="any"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">kg/caret</label>
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="kg per Caret"
                                    value={getInputValue(f.qtyPerCaret)}
                                    onChange={(e) => handleFlowerChange(idx, "qtyPerCaret", e.target.value)}
                                    min="0"
                                    step="any"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700">Rate per kg</label>
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="Rate"
                                    value={getInputValue(f.rate)}
                                    onChange={(e) => handleFlowerChange(idx, "rate", e.target.value)}
                                    min="0"
                                    step="any"
                                    required
                                />
                            </div>

                            {flowers.length > 1 && (
                                <button
                                    type="button"
                                    className="text-red-500 text-sm hover:underline sm:col-span-2"
                                    onClick={() => handleRemoveFlower(idx)}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="flex justify-between items-center pt-4">
                        <button
                            type="button"
                            onClick={handleAddFlower}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            + Add another flower
                        </button>

                        <button
                            type="submit"
                            className="bg-gradient-to-r from-orange-500 via-pink-600 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90"
                        >
                            Save Report
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
