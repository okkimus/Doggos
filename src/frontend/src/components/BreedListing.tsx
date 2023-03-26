import React, { useState } from 'react';

interface Breed {
    breedName: string,
    baseBreed: string,
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
                        breeds.map(b =>
                            <tr className="odd:bg-gray-50 even:bg-gray-100 border-2">
                                <td className="border-2"><a href={`/breed/${b.breedName.split(" ").join("-")}`}>{b.breedName}</a></td>
                                <td>{b.variants.map(v =>
                                    <a href={`/breed/${v + "-" + b.baseBreed}`} className="hover:text-sky-300">{v} </a>
                                )}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </section>
    );
}

export default BreedListing;
