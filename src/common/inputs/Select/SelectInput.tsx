import { InputLabel, Select, FormControl } from "@material-ui/core"
import React from "react";
import ISelectInput from "./ISelectInput";


export default function SelectInput(props: { value: any, options: ISelectInput[], onChange: any, name: string }) {
    async function handleChange(e) {
        props.onChange(e.target.value);
    }
    return (
        <FormControl variant="outlined" >
            <InputLabel htmlFor="outlined-age-native-simple">{props.name}</InputLabel>
            <Select
                native
                value={props.value}
                onChange={handleChange}
                inputProps={{
                    name: props.name,
                    id: "outlined-age-native-simple"
                }}
            >
                {props.options.map(e => <option value={e.value}>{e.label}</option>)}
            </Select>
        </FormControl>
    );

};