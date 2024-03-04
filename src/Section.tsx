import { useState, useEffect, forwardRef } from "react";

const navs = ["home", "projects", "design", "contact"];

interface SectionProps {
    name: string;
    children: React.ReactNode;
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}

const Section = forwardRef<HTMLElement, SectionProps>(
    ({ name, children, setCurrentSection }, ref) => {

        const refObject = ref as React.RefObject<HTMLElement>;
        const [height, setHeight] = useState(refObject.current
            ? refObject.current.getBoundingClientRect().y
            : Number.MAX_VALUE);

        useEffect(() => {
            window.addEventListener("scroll", () => {
                setHeight(refObject.current ?
                    refObject.current.getBoundingClientRect().y : Number.MAX_VALUE);
                if (height < 200) setCurrentSection(navs.indexOf(name));
            });
        });

        return (
            <article id={name} ref={ref}>
                {children}
            </article>
        );
    });

export default Section;