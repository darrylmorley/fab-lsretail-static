const Banner = () => {
  return (
    <section className="w-full flex justify-center border-t-2 border-solid border-black">
      <div className="flex">
        <div className="w-1/2 flex items-center justify-center">
          <img src="banners/KeepItReal.png" alt="Keep it Real Logo" width="150" />
        </div>
        <div className="w-1/2 flex items-center justify-start">
          <img src="banners/3grip.png" alt="" />
        </div>
      </div>
    </section>
  )
}

export default Banner