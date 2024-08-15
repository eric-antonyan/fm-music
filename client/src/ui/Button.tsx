import { FC } from "react";

interface ButtonInterface {
    children: string
}

const Button: FC<ButtonInterface> = ({children}) => {
    return (
        <div className="font-normal flex flex-row items-center gap-4 text-white cursor-pointer p-1 px-2 rounded-[.4rem] transition-all ease-in-out 100 hover:bg-red-600">
            {children}
        </div>
    )
}

export default Button