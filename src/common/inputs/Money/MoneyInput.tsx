import { TextField, InputAdornment } from "@material-ui/core"
import React from "react";

export default function MoneyInput(props: { value: number; onChange: any; name: string }) {

    const handleChange = (str: string) => {
        let r = parseFloat(str.replace(/[^\d]+/gi, '')) / 100;
        r = isNaN(r) ? 0 : r;
        let result = r.toLocaleString('pt-br', { style: "decimal", minimumFractionDigits: 2 });
        props.onChange(result);
    }

    return (
        < TextField
            id="outlined-basic" label={props.name} variant="outlined"
            value={props.value}
            onChange={(e) => handleChange(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
        />
    );
}   