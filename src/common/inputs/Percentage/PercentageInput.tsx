import { TextField, InputAdornment } from "@material-ui/core"
import React, { useEffect } from "react";

export default function PercentageInput(props: { value: number; onChange: any; name: string }) {

    const handleChange = (str: string) => {
        if (!isNaN(Number(str)))
            str = Number(str).toFixed(2);

        if (!str.includes(",") && !str.includes(".")) {
            str += ",00";
        }
        let r = parseFloat(str.replace(/[^\d]+/gi, '')) / 100;
        let result = r.toLocaleString('pt-br', { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 });
        props.onChange(result);
    }

    useEffect(() => {
        handleChange(props.value.toString());
    }, [props.value]);


    return (
        < TextField
            id="outlined-basic" label={props.name} variant="outlined"
            value={props.value}
            onChange={(e) => handleChange(e.target.value)}
            InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
        />
    );
}   