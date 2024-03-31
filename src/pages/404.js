import Link from "next/link"

const Error404 = () => {
    return (
        <div className="w-full h-[70vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-3">error 404</h1>
                <h1 className="text-base text-secondaryText font-medium">We're sorry, but the page you're trying to access hasn't been created yet. Please check back later or explore other parts of our site. Thank you for your patience!</h1>
                <div className="flex flex-col sm:flex-row items-center gap-6 mt-5">
                <Link href={`/`}
            className="w-[240px] sm:w-[140px] h-[40px] border border-hoverBg flex items-center justify-center rounded-xl hover:bg-hoverBg"
          >
            Go Home
          </Link>
                <Link href={`/search`}
            className="w-[240px] h-[40px] border border-hoverBg flex items-center justify-center rounded-xl"
          >
            Search your favorite song
          </Link>
                </div>
            </div>
        </div>
    )
}

export default Error404