import { ToggelFollow } from "../Services/FriendsServices"
import { useState } from "react"
import { Spinner } from "@heroui/react"
import { queryClient } from "../App";
import { Link } from "react-router-dom";



function CreateUserCard({ user }) {
    const [loding, seLoding] = useState(false)

    async function Follow() {
        seLoding(true)
        const respons = await ToggelFollow(user._id)
        if (respons.success) {
            await queryClient.invalidateQueries(["SuggestionsFriends"])
        }

        seLoding(false)
    }

    return (
        <div className=" p-4 rounded-xl border border-gray-300 flex justify-between items-start">
            <div>
                <Link to={`/user-profile/${user._id}`} className="  flex items-center gap-2 w-fit">
                    <img className=" w-16 object-cover h-16 rounded-full " src={user.photo} alt="" />
                    <div>
                        <h2 className=" text-medium font-medium">{user.name}</h2>
                        <h2 className=" text-sm font-light">@{user.username}</h2>
                    </div>
                </Link>
                <h2 className=" mt-3 text-xs text-gray-800 bg-gray-200 p-1 rounded-xl w-fit">{user.followersCount} followers</h2>
            </div>

            <button disabled={loding} onClick={Follow} className=" text-blue-600 text-sm font-medium flex items-center gap-1 bg-blue-200/60 p-1 rounded-xl cursor-pointer active:text-blue-800 active:bg-blue-200">
                {loding ? < Spinner size="sm" /> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                </svg>}
                Follow
            </button>

        </div>
    )
}

export default CreateUserCard
