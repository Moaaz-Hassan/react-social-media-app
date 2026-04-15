import { Button } from '@heroui/react';
import { useState } from 'react';
import CreateNotificationCard from '../Components/CreateNotificationCard';
import { GetNotifications } from '../Services/NotificationServices';
import { useInView } from "react-intersection-observer";
import { useEffect } from 'react';
import CommentLoadingScrean from '../Components/CommentLoadingScrean';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MarkAllAsRead } from '../Services/NotificationServices';
import { Spinner } from "@heroui/react";
import { queryClient } from '../App';


function NotificationPage() {
  const [selsectUnRead, setselsectUnRead] = useState(true);
  const { ref, inView } = useInView({
    rootMargin: "100px",
  });


  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getNotification", selsectUnRead],
    queryFn: ({ pageParam }) =>
      GetNotifications({ pageParam, unread: !selsectUnRead }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.pagination.nextPage ?? undefined,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);


  const [loding, setLoding] = useState(false)

  async function marAsRead() {
    setLoding(true)
    const { data } = await MarkAllAsRead()
    if (data.modifiedCount) {
      await queryClient.invalidateQueries(["getNotification", true])

    }
    setLoding(false)

  }


  return (
    <div className=' bg-white rounded-xl  shadow-2xl mt-4'>
      <header className='p-4 border-b border-b-gray-500/50'>
        <div className=' flex items-center justify-between'>
          <h2 className=' text-xl md:text-2xl font-medium md:font-bold'>Notifications</h2>
          <Button disabled={!selsectUnRead} onPress={marAsRead}  className="border border-blue-500 w-44" color={selsectUnRead ? `primary` : "white"} size='md'>
            {loding ?
              <Spinner color="white" size="sm" /> : <div className=' flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                Mark UnRead as read
              </div>}
          </Button>

        </div>
        <h2 className=' text-gray-500 text-sm font-light mt-2'>Realtime updates for likes, comments, shares, and follows.</h2>
        <div className=' flex gap-2 mt-3'>
          <Button onPress={() => setselsectUnRead(true)} className="border border-blue-500" color={selsectUnRead ? `primary` : "white"} size='sm'>UnRead</Button>
          <Button onPress={() => setselsectUnRead(false)} className="border border-blue-500" color={!selsectUnRead ? `primary` : "white"} size='sm'>Seen</Button>
        </div>

      </header>
      <div className='p-4 '>
        {data?.pages[0].data.notifications.length === 0 ? <p className=' my-2 text-center font-bold text-sm text-gray-700'>{selsectUnRead ? "No unRead notifications yet" : "No seen notifications yet"}</p> :

          data?.pages?.map((page) =>
            page.data.notifications.map(
              (notification) =>
                notification && (
                  <CreateNotificationCard key={notification._id} notification={notification} />
                ),
            ),
          )}


        <div ref={ref} className="mt-4">
          {isFetching &&
            <>
              <CommentLoadingScrean />
            </>
          }
        </div>
      </div>

    </div>
  )
}

export default NotificationPage