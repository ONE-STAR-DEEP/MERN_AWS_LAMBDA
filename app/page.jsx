import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <section className="w-full h-[80vh] flex flex-col justify-center items-center">

      <h1 className='head_text text-center'>
        Join the Journey
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>Nature Lovers</span>
      </h1>
      <p className='desc text-center mb-8'>
        Natura is an open-platform for all the green volunteer across the world to
        discover, create and share their journey of green work
      </p>

      
    </section>

    <Feed />
  </section>
);

export default Home;