import { useState } from "react"

const Votes = () => {
    const [likes, setLikes] = useState<number | null>(null)
    const [voted, setVoted] = useState<boolean>(false)
    const url = "http://localhost:3001/votes/breed"

    const fetchCount = async () => {
        const count = (await (await fetch(url)).json()).count
        setLikes(count)
    }

    fetchCount()

    const vote = async () => {
        setVoted(true)
        await fetch(url, { method: "POST" })
    }

    return (
        <div className="flex flex-col content-center items-center">
            <h3 className="text-3xl font-bold underline mb-10">Likes</h3>
            <p>{likes ?? ""}</p>
            <button onClick={vote} disabled={voted}>+1</button>
        </div>
    )
}

export default Votes