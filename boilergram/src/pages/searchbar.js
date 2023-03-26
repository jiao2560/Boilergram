import { useEffect, useState } from "react";
var data = require("../lib/MOCK_DATA.json");
import "./app.css";


export default function searchbar() {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        console.log("search ", searchTerm);
    }

    return (
        <div className="App">
            <h1>Search</h1>

            <div className="search-container">
                <div className="search-inner">
                    <input type="text" value={value} onChange={onChange} />
                    <button onClick={() => onSearch (value)}> Search </button>
                </div>

            </div>
        </div>
    );

}

