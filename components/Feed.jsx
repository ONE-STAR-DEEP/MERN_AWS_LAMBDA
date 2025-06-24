'use client';

import {useState, useEffect } from 'react'
import EventCard from './EventCard';

const EventCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
      {data.map((post) => (
        <EventCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className='flex flex-col items-center'>
      <h1 className='text-left head_text -mt-8'>
        <span className='text-left'>Recent Posts...</span>
      </h1>
      <EventCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed