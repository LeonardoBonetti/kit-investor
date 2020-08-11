import { TextField, InputAdornment, InputLabel, Select, FormControl, createStyles, makeStyles, Theme } from "@material-ui/core"
import React, { useState } from "react";
import classes from "*.module.css";
import ISelectInput from "./ISelectInput";


export default function SelectInput(props: { value: any, options: ISelectInput[], onChange: any }) {
    async function handleChange(e) {
        props.onChange(e.target.value);
    }
    return (
        <FormControl variant="outlined" >
            <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel>
            <Select
                native
                value={props.value}
                onChange={handleChange}
                inputProps={{
                    name: "age",
                    id: "filled-age-native-simple"
                }}
            >
                {props.options.map(e => <option value={e.label}>{e.label}</option>)}
            </Select>
        </FormControl>
    );

};