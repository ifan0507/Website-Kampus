import React, { useState, useEffect } from "react";

const App = () => {
    const [visits, setVisits] = useState(0);

    // Loading from localStorage
    useEffect(() => {
        const storedVisits = Number(localStorage.getItem("visitCounter")) || 0;
        setVisits(storedVisits + 1);
    }, []);

    // Saving in localStorage
    useEffect(() => {
        localStorage.setItem("visitCounter", visits);
    }, [visits]);

    return <p>{visits}</p>;
}

export default App;