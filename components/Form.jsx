import Image from '@node_modules/next/image';
import { deleteObject, getObject, putObject } from '@utils/preSignedUrl';
import { set } from 'mongoose';
import Link from 'next/link';
import { useState } from 'react';
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


const Form = ({
  type, post, setPost, submitting, handleSubmit
}) => {

  const [image, setImage] = useState("");
  const [fileName, setFileName] = useState("");

  const onDrop = useCallback( async acceptedFiles => {
    const file = acceptedFiles[0];
    const name = `image-${Date.now()}.jpeg`;

    setFileName(name);

    const url = await putObject(name);
    
    console.log("Signed PUT URL:", url);

      const upload = await fetch(url, {
        method: "PUT",
        headers: {
          'Content-Type': 'image/jpeg',
        },
        body: file,
      })

      console.log("Upload response:", upload);
      
      const getPublicUrl = await getObject(name) // use same name you uploaded
      console.log("Public GET URL:", getPublicUrl);
      setImage(getPublicUrl);
      setPost({ ...post, img: name });
      
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <section className='"w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Event
        </span></h1>
      <p className='desc text-left max-w-md'>
        {type} an amazing event and invite the world to join the journey with you.
      </p>

      <form onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>

        {
          image ?
            <div className='flex items-center justify-center'>
              <div className='fixed px-2 py-1 rounded-xl bg-red-700 text-white hover:cursor-pointer' onClick={() => deleteObject(fileName)}>Delete upload</div>
              <img
                src={image}
                height={200}
                width={500}
                alt="image"
                className='w-full h-60 object-cover rounded-lg'
              />
            </div>
            :

            <div {...getRootProps()} className='h-60 border-dashed border-2 border-gray-300 rounded-lg p-4 flex justify-center items-center flex-col gap-2 hover:cursor-pointer'>
              <input {...getInputProps()} />
              <p>Drag 'n' drop an image here, or click to select image</p>
            </div>
        }

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Date</span>
          <br></br>
          <input value={post.date}
            type="date"
            onChange={(e) => setPost({ ...post, date: e.target.value })}
            placeholder='DD/MM/YYYY'
            required
            className='form_datearea rounded-lg px-2 py-1 ' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Place Name</span>

          <input value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            placeholder='Eg. The National park...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Street Name/No</span>

          <input value={post.street}
            onChange={(e) => setPost({ ...post, street: e.target.value })}
            placeholder='Eg. Public street-4...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Area</span>

          <input value={post.area}
            onChange={(e) => setPost({ ...post, area: e.target.value })}
            placeholder='Eg. Osaka, Vasundhara...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            City</span>

          <input value={post.city}
            onChange={(e) => setPost({ ...post, city: e.target.value })}
            placeholder='Eg. New Delhi, Paris...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            State</span>

          <input value={post.state}
            onChange={(e) => setPost({ ...post, state: e.target.value })}
            placeholder='Eg. Pannsylvania, Mumbai...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Country</span>

          <input value={post.country}
            onChange={(e) => setPost({ ...post, country: e.target.value })}
            placeholder='Eg. India, Germany, Sweden,...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Task</span>

          <input value={post.task}
            onChange={(e) => setPost({ ...post, task: e.target.value })}
            placeholder='Eg. Cleaning, Plantation...'
            required
            className='form_input' />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Description (limit your words)</span>

          <textarea value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
            placeholder='Explain the task along with the geography of the area...'
            required
            className='form_textarea' />
        </label>
        <div className='font-medium text-left max-w'>
          <dl>
            <dt type="1">Note:</dt>
            <dd>1. Application will collect your live location.</dd>
            <dd>2. If the given request doesn't match with the location collected by the application you cannot create the event.</dd>
          </dl>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className='text-grey-500 text-sm'>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white' >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form