import { useState, useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import './App.css';

const navs = ["home", "projects", "design", "contact"];

interface SectionProps {
    name: string;
    children: React.ReactNode;
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ name, children, setCurrentSection }, ref) => {
    const refObject = ref as React.RefObject<HTMLElement>;
    const [height, setHeight] = useState(refObject.current ? refObject.current.getBoundingClientRect().y : Number.MAX_VALUE);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setHeight(refObject.current ?
                refObject.current.getBoundingClientRect().y : 0);
            if(height < 70) setCurrentSection(navs.indexOf(name));
        });
    }, [height]);

    return (
        <article id={name} ref={ref}>
            {children}
        </article>
    );
});

function App() {
    const [currentProject, setCurrentProject] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    const navRef = useRef<HTMLElement>(null);
    const homeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const designRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // const currNav = useContext(NavContext);

    // const [projectsHeight, setProjectsHeight] = useState(projectsRef.current ? projectsRef.current.getBoundingClientRect().y : Number.MAX_VALUE);

    useGSAP(() => {
        gsap.from(".project-description", {
            y: "-20",
            opacity: 0,
            duration: 0.1,
        });
    }, [currentProject]);

    // useEffect(() => {
    //     const options = {
    //         root: navRef.current,
    //         threshold: 1,
    //     };

    //     const callback = (entries: IntersectionObserverEntry[]) => {
    //         console.log(entries[0].target.id);
    //         // entries.forEach(entry => {
    //         //     if (entry.isIntersecting) {
    //         //         console.log(entry.target.id);
    //         //         console.log(currentSection);
    //         //         setCurrentSection(currentSection + 1);
    //         //     }
    //         // })
    //     }

    //     const observer = new IntersectionObserver(callback, options);
    //     if (homeRef.current && projectsRef.current && designRef.current && contactRef.current) {
    //         observer.observe(homeRef.current);
    //         observer.observe(projectsRef.current);
    //         observer.observe(designRef.current);
    //         observer.observe(contactRef.current);
    //     }

    //     window.addEventListener("scroll", function () {
    //         setProjectsHeight(projectsRef.current ? projectsRef.current.getBoundingClientRect().y : 0);
    //     });

    //     // if intersecting > 50%, increment current section
    // }, []);

    // useGSAP(() => {
    //     const el = projects.current;
    //     gsap.from(el,
    //         {
    //             y: -20,
    //             duration: 0.3,
    //             scrollTrigger: {
    //                 trigger: el,
    //                 toggleActions: "restart none none none",
    //             }
    //         });
    // })

    // useEffect(() => {
    //     window.addEventListener("scroll", function () {
    //         const elementTarget = document.getElementById("projects");
    //         if (elementTarget && window.scrollY > (elementTarget.offsetTop + elementTarget.offsetHeight)) {
    //             alert("You've scrolled past the second div");
    //         }
    //     });
    // });

    return (
        <div id="container">
            {/* <NavContext.Provider> */}
            <nav ref={navRef}>
                <ul className="navbar">
                    {navs.map((nav) => {
                        return <li>
                            <a
                                id={`${nav}-link`} href={`#${nav}`}
                                className={navs[currentSection] == nav ? 'selected' : ''}
                            >
                                {nav == "home" ? "Jack Dempsey" : nav.charAt(0).toUpperCase() + nav.slice(1)}
                            </a>
                        </li>
                    })}
                    <li>{currentSection}</li>
                    {/* <li><a id="home-link" href="#home" className={``}>Jack Dempsey</a></li>
                    <li><a id="projects-link" href="#projects">Projects</a></li>
                    <li><a id="design-link" href="#design">Design</a></li>
                    <li><a id="contact-link" href="#contact">About</a></li> */}
                </ul>
            </nav>

            <div className="content">
                <Section name="home" ref={homeRef} setCurrentSection={setCurrentSection}>
                    <h1>Welcome</h1>
                    <p>Hi, I'm Jack. I'm currently a senior at NYU studying Computer Science w/ minors in Psychology and Studio Art.</p>
                    <p></p>
                </Section>

                <Section name="projects" ref={projectsRef} setCurrentSection={setCurrentSection}>
                    <h1>Projects</h1>
                    <div className="project-container">
                        <div className="project" onClick={() => setCurrentProject(1)}>
                            <p>Project 1</p>
                        </div>
                        <div className="project" onClick={() => setCurrentProject(2)}>
                            <p>Project 2</p>
                        </div>
                        <div className="project" onClick={() => setCurrentProject(3)}>
                            <p>Project 3</p>
                        </div>
                    </div>
                    {currentProject > 0 &&
                        <div className="project-description">
                            <p>{currentProject}</p>
                        </div>}
                </Section>

                <Section name="design" ref={designRef} setCurrentSection={setCurrentSection}>
                    <h1>Design</h1>
                    <div className="project-container">
                        <div className="project"></div>
                        <div className="project"></div>
                        <div className="project"></div>
                    </div>
                    {currentProject > 0 &&
                        <div className="project-description">
                            <p>{currentProject}</p>
                        </div>}
                </Section>

                <Section name="contact" ref={contactRef} setCurrentSection={setCurrentSection}>
                    <h1>Contact</h1>
                    <div className="contacts">
                        <a className="contact-link" href="https://www.linkedin.com/in/jack-i-dempsey/" target="_blank">LinkedIn</a>
                        <a className="contact-link" href="https://github.com/anpanring" target="_blank">Github</a>
                        <a className="contact-link" href="mailto:jdempsey2024@gmail.com" target="_blank">Email</a>
                        <a className="contact-link" href="https://drive.google.com/file/d/1ryhkUWJUDHuiPR6aCyXLIfDjthUAyVLG/view?usp=sharing" target="_blank">Resume</a>
                    </div>
                </Section>
            </div>

            <footer>
                <hr />
                <p className="footer-text">Jack Dempsey, last edited 2/29/2024</p>
            </footer>
            {/* </NavContext.Provider> */}
        </div>
    )
}

export default App
