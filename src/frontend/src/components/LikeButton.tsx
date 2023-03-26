import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonProps from "../types/ButtonProps"

const LikeButton = ({ trigger, disabled, count }: ButtonProps) => {
    return (
        <div>
            <button
                onClick={() => trigger()}
                className={`${disabled ? "bg-green-100" : "bg-green-300 hover:bg-green-500"} rounded-full w-10 h-10`}
                disabled={disabled}>
                <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <p className="text-gray-500">{count}</p>
        </div>
    )
}

export default LikeButton