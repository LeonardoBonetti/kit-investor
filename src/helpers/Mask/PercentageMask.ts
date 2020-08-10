export function PercentageMask(value: number | string) {
    let amount: number;

    if (value === undefined || value === null) {
        return "Sem valor";
    } else {
        if (typeof value !== "number") {
            amount = parseFloat(value);
            if (Number.isNaN(amount)) {
                return "Sem valor";
            }
        } else {
            amount = value;
        }
    }

    return amount.toLocaleString("pt-BR", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4
    })
}