import { faThumbsDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ButtonProps from "../types/ButtonProps"

const DislikeButton = ({ trigger, disabled, count }: ButtonProps) => {
    return (
        <div>
            <button
                onClick={() => trigger()}
                className={`${disabled ? "bg-red-100" : "bg-red-300 hover:bg-red-500"} rounded-full w-10 h-10`}
                disabled={disabled}>
                <FontAwesomeIcon icon={faThumbsDown} />
            </button>
            <p>{count}</p>
        </div>
    )
}

export default DislikeButton