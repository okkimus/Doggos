import { useLoaderData } from "react-router-dom";

export async function breedImageLoader({ params }: any) {
    const url = `https://dog.ceo/api/breed/${params.breedName}/images`
    const res = await fetch(url);
    const json = await res.json()
    const data: Array<string> = json.message
    return data;
}

const BreedCard = () => {
    const data = useLoaderData() as Array<string>;

    const randomIndex = Math.floor(Math.random() * data.length)
    const selectedImg = data[randomIndex]

    return (
        <section>
            <h1>Lö breed</h1>
            <img src={selectedImg} alt="A dog"></img>
        </section>
    )
}

export default BreedCard