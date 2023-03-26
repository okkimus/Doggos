import React, { useState } from 'react';
import Breed from '../types/Breed';
import BreedRow from './BreedRow';

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
                    baseBreed: bk,
                    variants: variants.filter(variant => variant !== v)
                }))
            } else {
                breedList.push({
                    breedName: bk,
                    baseBreed: bk,
                    variants: []
                })
            }
        })
        setBreeds(breedList.sort((a, b) => a.breedName > b.breedName ? 1 : -1))
    }

    return (
        <section>
            <button className="btn-primary mb-5" onClick={fetchBreeds}>Fetch dem doggo breeds!</button>
            <table className={`table-auto ${breeds.length === 0 ? "hidden" : ""}`}>
                <thead className='text-lg md:text-xl text-gray-700 uppercase bg-sky-100 border-2'>
                    <tr>
                        <th>Breeds</th>
                        <th>Variants</th>
                    </tr>
                </thead>
                <tbody className='text-md md:text-xl text-gray-700 uppercase'>
                    { !breeds ?
                        <tr><td>Empty</td><td></td></tr> :
                        breeds.map((b, i) => <BreedRow breed={b} key={i} />)
                    }
                </tbody>
            </table>
        </section>
    );
}

export default BreedListing;
