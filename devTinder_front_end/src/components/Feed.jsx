import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utils/feedSlice'
import FeedUser from '../pages/FeedUser'

const Feed = () => {

  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch();
  const getFeed = async () => {

    try {
      const res = await axios.get(BASE_URL + "request/feed", { withCredentials: true })
      dispatch(addFeed(res?.data?.data));

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFeed()
  }, [])


  if (!feed) return;

  return (
    <div>
      {feed[0] && <div className="flex flex-wrap gap-4 justify-center">
        <FeedUser key={feed[0]._id} user={feed[0]} />
      </div>}
    </div>
  )
}

export default Feed

// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { BASE_URL } from '../../utils/constants'

// const Feed = () => {

//   const getFeed = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "request/feed", { withCredentials: true });
//       console.log(res?.data?.data);

//     } catch (error) {
//       console.log(error);

//     }
//   }

//   useEffect(() => {
//     getFeed()
//   }, [])

//   return (
//     <div>Feed</div>
//   )
// }

// export default Feed