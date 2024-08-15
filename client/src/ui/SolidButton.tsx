import { FC } from "react";

interface SolidButtonInterface {
    children: string
}

const SolidButton: FC<SolidButtonInterface> = ({children}) => {
    return (
        <div className="hidden lg:flex text-sm bg-white px-5 p-[10px] rounded-[.4rem] text-red-700 font-bold cursor-pointer lg:text-[1rem] transition-all ease-in 200 hover:text-red-500 hover:scale-[103%]">
            {children}
        </div>
    )
}

export default SolidButton