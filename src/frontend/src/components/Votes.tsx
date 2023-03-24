import { useState } from "react"

interface VotesProps {
    breedName: string
}

const Votes = (props: VotesProps) => {
    const [likes, setLikes] = useState<number | null>(null)
    const [voted, setVoted] = useState<boolean>(false)
    const url = `http://localhost:3001/votes/${props.breedName}`

    const fetchCount = async () => {
        const count = (await (await fetch(url)).json()).count
        setLikes(count)
    }

    fetchCount()

    const vote = async (like: boolean) => {
        setVoted(true)
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({ like }),
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    return (
        <div className="flex flex-col content-center items-center">
            <h3 className="text-3xl font-bold underline mb-10">Likes</h3>
            <p>{likes ?? ""}</p>
            <button onClick={() => vote(true)} >+1</button>
            <button onClick={() => vote(false)} >-1</button>
        </div>
    )
}

export default Votes