import Post from "./postCard"
import data from "./posts-data"

export interface IPost {
  id: number
  firstName: string
  lastName: string
  writeup: string
  image: string
  avatar: string
}

const postsList: IPost[] = data;

function posts() {
  return (
    <div className="flex justify-center items-center my-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {postsList.map((post) => <Post post={post} key={post.id}/>)}
      </div>
    </div>
  )
}

export default posts