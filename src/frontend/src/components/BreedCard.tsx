import { useLoaderData } from "react-router-dom";
import Votes from "./Votes";

interface BreedImage {
    imageSources: Array<string>,
    breed: string,
    variant: string,
    exactImagesFound: boolean
}

export async function breedImageLoader({ params }: any): Promise<BreedImage> {
    const splitBreed = params.breedName.split("-")
    const baseBreed: string = splitBreed.length > 1 ? splitBreed[1] : params.breedName
    const variant = splitBreed.length > 1 ? splitBreed[0] : ""
    const url = `https://dog.ceo/api/breed/${baseBreed}/images`
    const res = await fetch(url);
    const json = await res.json()
    const data: Array<string> = json.message

    const capitalizedBreed = baseBreed[0].toUpperCase() + baseBreed.substring(1)
    const capitalizedVariant = !!variant ? variant[0].toUpperCase() + variant.substring(1) : ""
    const filteredSources = data.filter(d => d.includes(variant))
    const exactImagesFound = filteredSources.length > 0

    return {
        imageSources: exactImagesFound ? filteredSources : data,
        breed: capitalizedBreed,
        variant: capitalizedVariant,
        exactImagesFound: exactImagesFound
    };
}

const BreedCard = () => {
    const { imageSources, breed, variant, exactImagesFound } = useLoaderData() as BreedImage;

    const randomIndex = Math.floor(Math.random() * imageSources.length)
    const selectedImg = imageSources[randomIndex]
    const fullBreed = variant ? variant + " " + breed : breed

    return (
        <section className="flex flex-col content-center items-center mt-5">
            <div className="w-full lg:w-4/5 flex flex-col content-center items-center">
                <img src={selectedImg} alt="A dog" className="max-w-full"></img>
            </div>
            <h1 className="text-3xl">{ fullBreed }</h1>
            { !exactImagesFound ? <div className="text-red-600">No {fullBreed} found, showing random variant</div> : ""}
            <div className="mt-5 w-full flex flex-col content-center items-center">
                <Votes breedName={fullBreed} />
            </div>
        </section>
    )
}

export default BreedCard