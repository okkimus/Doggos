import React, { useState } from 'react';

const BreedListing = () => {
    const [breeds, setBreeds] = useState(null)
    const [breedNames, setBreedNames] = useState<string[]>([])

    const fetchBreeds = async () => {
        const res = await fetch("https://dog.ceo/api/breeds/list/all")
        const json = await res.json()
        const data = json.message
        setBreeds(data)
        setBreedNames(Object.keys(data))
    }



    return (
        <section>
            <button onClick={fetchBreeds}>Fetch dem doggo breeds!</button>
            { !breeds ?
                <div>No data</div> :
                breedNames.map(bn => <div>{bn}</div>)
            }
        </section>
    );
}

export default BreedListing;
