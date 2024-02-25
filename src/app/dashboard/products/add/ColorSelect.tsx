"use client"

import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import _ from "lodash";
import { getColors } from '@/api/lanieApi';

const debouncedLoadValue = _.debounce((inputValue, callback) => {
    getColors(inputValue).then(response => {
        callback(response?.data);
    })
        .catch(error => {
            console.error(error);
        });
}, 400)

const ColorSelect = ({ field }: { field: any }) => {

    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (value: any) => {
        setSelectedValue(value);
    }
    const loadOptions = (inputValue: string, callback: any) => {
        debouncedLoadValue(inputValue, callback)
    };

    return (
        <AsyncSelect
            isMulti
            cacheOptions
            defaultOptions
            value={selectedValue}
            getOptionLabel={(e: any) => e?.name}
            getOptionValue={(e: any) => e?._id}
            loadOptions={loadOptions}
            placeholder="Search ..."
            noOptionsMessage={() => "Color not found"}
            onChange={handleChange}
            isClearable={true}
            {...field}
        />
    )
}

export default ColorSelect