'use client';

import {useState} from 'react'
import {useSession} from 'next-auth/react';
import {useRouter} from 'next/navigation';

import Form from '@components/Form';

const CreateEvent = () => {
  const router = useRouter();
  const { data: session } = useSession();
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
  
  const CreateEvent= async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/prompt/new',
      {
        method: 'POST',
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
          desc: post.desc,
          userId: session?.user.id,
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
        handleSubmit={CreateEvent}
    />
  )
}

export default CreateEvent