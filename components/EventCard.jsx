'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { getObject } from '@utils/preSignedUrl';
import { useEffect, useState } from 'react';


const EventCard = ({ post, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [image, setImage] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  useEffect(() => {
    if (post.img) {
      getObject(post.img)
        .then((url) => {
          setImage(url);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }
  }, []);

  return (

    <div className='prompt_card'>

      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={35}
            height={35}
            className="rounded-full object-contain"
          />
          <div className='flex flex-col'>
            Posted by<h3 className='inline font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        <Image
          src={`https://natura-images.s3.ap-south-1.amazonaws.com/uploades/${post.img}`}
          alt="user_image"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <p className='my-2 font-bold font-satoshi text-sm text-grey-700'>{`${post.name} | ${post.date}`}</p>
      <p className='my-2 font-bold font-satoshi text-sm text-grey-700'>Task: {post.task}</p>

      <div className='h-[165px] overflow-hidden'>
        <p className='my-2 font-satoshi text-sm text-grey-700'>
          Location: {`${post.street}, ${post.area}, ${post.city}, ${post.state}, ${post.country}`}
        </p>
        <p className='my-4 font-satoshi text-sm text-grey-700 h-[60px] overflow-hidden'>
          <span className="font-semibold">{post.creator.username} </span>
          <span className="overflow">{post.desc}</span>
        </p>
      </div>

      <button className='visit_map'> <span>VIEW ON MAP</span></button>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'
          onClick={handleEdit}>
          <p className='front-inter text-sm green_gradient cursor-pointer'
          >
            Edit
          </p>
          <p className='front-inter text-sm green_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default EventCard