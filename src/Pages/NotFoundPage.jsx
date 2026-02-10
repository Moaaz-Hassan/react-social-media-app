import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className=' flex items-center flex-col justify-center h-96'>
      <h2 className=' text-2xl md:text-3xl text-gray-900 font-bold'>Page not found</h2>
      <Link className=' text-blue-700 text-xl font-semibold mt-2' to={"/"}>Go back home →</Link>
    </div>
  )
}

export default NotFoundPage