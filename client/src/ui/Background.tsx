import { FC, ReactElement } from "react";
import { motion } from "framer-motion";

interface BackgroundInterface {
    children: ReactElement;
    initial?: object,
    animate?: object,
    transition?: object,
    color?: string;
    backgroundImage?: string;
    width?: number | string;
    height?: number | string;
    style?: object;
    className?: string;
}

const Background: FC<BackgroundInterface> = ({
    children,
    initial,
    animate,
    transition,
    color,
    backgroundImage,
    width = 0,
    height = 0,
    className,
}) => {
    return (
        <motion.div
            initial={initial}
            animate={animate}
            transition={transition}
            className={className}
            style={{
                background: color,
                backgroundImage: backgroundImage
                    ? `url(${backgroundImage})`
                    : "none",
                width,
                height,
            }}
        >
            {children}
        </motion.div>
    );
};

export default Background;
