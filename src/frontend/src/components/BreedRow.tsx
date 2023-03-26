import Breed from "../types/Breed"

interface BreedRowProps {
    breed: Breed
}

const BreedRow = ({ breed }: BreedRowProps) => {

    return (
        <tr className="odd:bg-gray-50 even:bg-gray-100 border-2">
            <td className="border-2"><a href={`/breed/${breed.breedName.split(" ").join("-")}`}>{breed.breedName}</a></td>
            <td>{breed.variants.map((v, i) =>
                <a key={i} href={`/breed/${v + "-" + breed.baseBreed}`} className="hover:text-sky-300">{v} </a>
            )}</td>
        </tr>
    )
}

export default BreedRow