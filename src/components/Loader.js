const Loader = () => {
    return (
        <div className="w-[100%] h-[70vh] flex items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="w-[50px] h-[50px] border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg text-secondaryText">Loading...</p>
            </div>
        </div>
    )
}

export default Loader