import React, { useState } from 'react';

interface Breed {
    breedName: string,
    variants: Array<string>
}

const BreedListing = () => {
    const [breeds, setBreeds] = useState<Breed[]>([])

    const fetchBreeds = async () => {
        const res = await fetch("https://dog.ceo/api/breeds/list/all")
        const json = await res.json()
        const data = json.message

        const breedKeys = Object.keys(data)
        const breedList = new Array<Breed>();
        breedKeys.forEach(bk => {
            const variants = data[bk] as Array<string>

            if (variants.length > 0) {
                variants.forEach(v => breedList.push({
                    breedName: v + " " + bk,
                    variants: variants.filter(variant => variant !== v)
                }))
            } else {
                breedList.push({
                    breedName: bk,
                    variants: []
                })
            }
        })
        setBreeds(breedList.sort((a, b) => a.breedName > b.breedName ? 1 : -1))
    }



    return (
        <section>
            <button onClick={fetchBreeds}>Fetch dem doggo breeds!</button>
                <table>
                    <thead>
                        <tr>
                            <th>Breeds</th>
                            <th>Variants</th>
                        </tr>
                    </thead>
                    <tbody>
                        { !breeds ?
                            <tr>Empty</tr> :
                            breeds.map(b =>
                            <tr>
                                <td>{b.breedName}</td>
                                <td>{b.variants.join(", ")}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
        </section>
    );
}

export default BreedListing;
