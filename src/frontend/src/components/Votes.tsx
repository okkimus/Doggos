import { useState } from "react"
import config from "../config"
import useData from "../hooks/useData"
import DislikeButton from "./DislikeButton"
import LikeButton from "./LikeButton"

interface VotesProps {
    breedName: string
}

interface VotesResponse {
    breed: string,
    upVotes: number,
    downVotes: number
}

const Votes = (props: VotesProps) => {
    const [voted, setVoted] = useState<boolean>(false)
    const url = `${config.API_URL}/votes/${props.breedName}`

    const { data, refresh } = useData<VotesResponse>(url)

    const vote = async (like: boolean) => {
        setVoted(true)
        await fetch(url, {
            method: "POST",
            body: JSON.stringify({ like }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        refresh()
    }

    return (
        <div className="flex justify-around w-3/5">
            <LikeButton count={data?.upVotes} trigger={() => vote(true)} disabled={voted} />
            <DislikeButton count={data?.downVotes} trigger={() => vote(false)} disabled={voted} />
        </div>
    )
}

export default Votes