'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditEvent = () => {
  const router = useRouter();
  const  SearchParams = useSearchParams();
  const  eventId = SearchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] =useState({
    img: '',
    date: '',
    name: '',
    street: '',
    area: '',
    city: '',
    state: '',
    country: '',
    task: '',
    desc: '',
  });

  useEffect(() => {
    const getEventDetails = async() => {
        const response = await fetch (`/api/prompt/${eventId}`)
        const post= await response.json();

        setPost({
          img: post.img,
          date: post.date,
          name: post.name,
          street: post.street,
          area: post.area,
          city: post.city,
          state: post.state,
          country: post.country,
          task: post.task,
          desc: post.desc
        })
    }

        if(eventId) getEventDetails()
    }, [eventId])

  const UpdateEvent= async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!eventId) return alert('Event ID not found')

    try {
      const response = await fetch(`/api/prompt/${eventtId}`,
      {
        method: 'PATCH',
        body: JSON.stringify({
          img: post.img,
          date: post.date,
          name: post.name,
          street: post.street,
          area: post.area,
          city: post.city,
          state: post.state,
          country: post.country,
          task: post.task,
          desc: post.desc
        })
      })
      if(response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }finally {
      setSubmitting(false);
    }
  }
  
    return (
    <Form 
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={UpdateEvent}
    />
  )
}

export default EditEvent