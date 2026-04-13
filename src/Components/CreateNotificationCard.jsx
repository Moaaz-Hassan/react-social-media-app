import { Link } from "react-router-dom";
import { timeAgo } from "../Services/timeFormat";
import { Button } from "@heroui/react";


function CreateNotificationCard({ notification }) {
    return (
        <div className={` p-4 rounded-xl border border-gray-300 flex justify-between items-start mt-2 ${!notification.isRead && " bg-blue-300/30"}`}>
            <div>
                <Link to={`/user-profile/${notification.actor._id}`} className="  flex items-center gap-2 w-fit">
                    <img className=" w-16 object-cover h-16 rounded-full " src={notification.actor.photo} alt="" />
                    <div>
                        <h2 className=" text-medium font-medium">{notification.actor.name}</h2>
                        <h2 className=" text-sm font-light text-gray-500">{timeAgo(notification.createdAt)}</h2>
                    </div>
                </Link>
                {/* the body here  */}

            </div>

            {!notification.isRead && <Button size="sm" color="primary" ><div className=" flex gap-0.5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
                Mark as read
            </div>
            </Button>}

        </div>
    )
}

export default CreateNotificationCard



// actor
// :
// {_id: '69dd46af40873fb7bd16e13f', name: 'hassanAbdElhamid', photo: 'https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png'}
// createdAt
// :
// "2026-04-13T20:34:11.046Z"
// entity
// :
// body
// :
// "test"
// commentsCount
// :
// 0
// id
// :
// "69dd3db340873fb7bd16d4b6"
// isShare
// :
// false
// likesCount
// :
// 0
// sharesCount
// :
// 0
// topComment
// :
// null
// user
// :
// "69dd27df40873fb7bd169e89"
// _id
// :
// "69dd3db340873fb7bd16d4b6"
// [[Prototype]]
// :
// Object
// entityId
// :
// "69dd3db340873fb7bd16d4b6"
// entityType
// :
// "post"
// isRead
// :
// false
// recipient
// :
// {_id: '69dd27df40873fb7bd169e89', name: 'Moaaz Hsssan', photo: 'https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.de…f468137ed5b-e0b67061f08d8c27c506655cf74d4497.webp'}
// type
// :
// "like_post"
// _id
// :
// "69dd534340873fb7bd16f6f9"