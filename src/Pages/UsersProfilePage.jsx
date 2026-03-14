import { useParams } from "react-router-dom";

function UsersProfilePage() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default UsersProfilePage;
