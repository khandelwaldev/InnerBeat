import HeartFilledIcon from "$/components/icons/HeartFilledIcon"
import HistoryIcon from "$/components/icons/HistoryIcon"
import Link from "next/link"

const Library = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-6">Library</h1>
            <div className="flex items-center flex-wrap gap-8">
                <Link href={`/recent-played`}>
                    <div className="w-[100px] h-[100px]">
                        <i className="w-full h-full flex items-center justify-center">
                            <HistoryIcon size={75} color={'grey'} />
                        </i>
                    </div>
                    <h1 className="text-lg text-secondaryText max-w-[100px] line-clamp-1">Recently Played</h1>
                </Link>
                <Link href={`/favorite`}>
                <div className="w-[100px] h-[100px]">
                        <i className="w-full h-full flex items-center justify-center">
                            <HeartFilledIcon size={75} color={'grey'} />
                        </i>
                    </div>
                    <h1 className="text-lg text-secondaryText max-w-[100px] line-clamp-1">Favorites</h1>
                </Link>
            </div>
        </div>
    )
}

export default Library