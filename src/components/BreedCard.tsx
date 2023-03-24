import { useLoaderData } from "react-router-dom";

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
        <section className="flex flex-col content-center items-center">
            <h1 className="text-3xl font-bold underline mb-10">{ fullBreed }</h1>
            <img src={selectedImg} alt="A dog" className="w-3/5"></img>
            { !exactImagesFound ? <div className="text-red-600">No {fullBreed} found, showing random variant</div> : ""}
        </section>
    )
}

export default BreedCard