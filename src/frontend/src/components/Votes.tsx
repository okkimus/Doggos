import { useCallback, useEffect, useState } from "react"
import config from "../config"
import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"

interface VotesProps {
    breedName: string
}

const Votes = (props: VotesProps) => {
    const [likes, setLikes] = useState<number | null>(null)
    const [dislikes, setDislikes] = useState<number | null>(null)
    const [voted, setVoted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const url = `${config.API_URL}/votes/${props.breedName}`

    const fetchCount = useCallback(async () => {
        const res = (await (await fetch(url)).json())
        setLikes(res.upVotes)
        setDislikes(res.downVotes)
        setLoading(false)
    }, [url])

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
        fetchCount()
    }

    return (
        <div className="flex justify-around w-3/5">
            <LikeButton count={likes} trigger={() => vote(true)} disabled={voted} />
            <DislikeButton count={dislikes} trigger={() => vote(false)} disabled={voted} />
        </div>
    )
}

export default Votes