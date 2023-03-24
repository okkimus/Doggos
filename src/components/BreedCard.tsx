import { useLoaderData } from "react-router-dom";

interface BreedImage {
    imageSources: Array<string>,
    breed: string,
    variant: string
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
    const capitalizedVariant = variant[0].toUpperCase() + variant.substring(1)

    return {
        imageSources: data.filter(d => d.includes(variant)),
        breed: capitalizedBreed,
        variant: capitalizedVariant
    };
}

const BreedCard = () => {
    const { imageSources, breed, variant } = useLoaderData() as BreedImage;

    const randomIndex = Math.floor(Math.random() * imageSources.length)
    const selectedImg = imageSources[randomIndex]
    const fullBreed = variant ? variant + " " + breed : breed

    return (
        <section>
            <h1>{ fullBreed }</h1>
            <img src={selectedImg} alt="A dog"></img>
        </section>
    )
}

export default BreedCard