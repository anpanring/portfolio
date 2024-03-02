import { useState, useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Section from './Section';

import './styles/App.css';
// import projectData from '../data/projects.json';

type Project = {
    name: string;
    id: number;
    description: string;
    source?: string;
    link?: string;
    images?: string[];
    tools?: string[];
}

const navs = ["home", "projects", "design", "contact"];

const Projects: Project[] = [
    {
        name: "Dejumbler",
        id: 0,
        description: "Full-stack webapp I made to manage my lists of different type of media in one place. Currently, it allows users to create and organize lists of music, movies, and books.",
        source: "https://github.com/anpanring/dejumbler",
        link: "https://dejumbler.com/",
        images: ["dejumbler-text-logo.png", "all-lists.png", "mobile-view.png"],
        tools: ["Javascript", "Typescript", "Next.js", "MongoDB", "Mongoose", "GSAP"],
    },
    {
        name: "Chatterbox",
        id: 1,
        description: "Implementation of a forward-secure, end-to-end encrypted messaging client inspired by Signal protocol.",
        images: ["go.png"],
        tools: ["Go"]
    },
    {
        name: "Monopoly",
        id: 2,
        description: "A Monopoly game made with a group of friends for a class project. I was responsible for the front-end and game logic.",
        images: ["monopoly.jpg"],
        tools: ["Java", "Swing", "Maven"]
    },
    {
        name: "Portfolio",
        id: 3,
        description: "This website!",
        source: "https://github.com/anpanring/portfolio",
        images: ["spider-man.jpg"],
        tools: ["Typescript", "React", "Vite"]
    },
    {
        name: "Skint App",
        id: 4,
        description: "Beep bop",
    },
    {
        name: "Magazine",
        id: 5,
        description: "Beep bop",
    },
    {
        name: "Custom Font",
        id: 6,
        description: "Beep bop",
    },
]

function App() {
    const [currentProject, setCurrentProject] = useState(-1);
    const [currentSection, setCurrentSection] = useState(0);

    const navRef = useRef<HTMLElement>(null);
    const homeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const designRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // const currNav = useContext(NavContext);

    useGSAP(() => {
        gsap.from(".project-description", {
            y: "-20",
            opacity: 0,
            duration: 0.5,
        });

        // return () => {
        //     gsap.to(".project-description", {
        //         y: "-20",
        //         opacity: 0,
        //         duration: 0.1,
        //     });
        // }
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
                    {/* <li>{currentSection}</li> */}
                    {/* <li><a id="home-link" href="#home" className={``}>Jack Dempsey</a></li>
                    <li><a id="projects-link" href="#projects">Projects</a></li>
                    <li><a id="design-link" href="#design">Design</a></li>
                    <li><a id="contact-link" href="#contact">About</a></li> */}
                </ul>
            </nav>

            <div className="content">
                <Section name="home" ref={homeRef} setCurrentSection={setCurrentSection}>
                    {/* <h1>Welcome</h1> */}
                    <p>Hi, I'm Jack! I'm currently a senior at NYU studying Computer Science, with minors in Psychology and Studio Art.
                        I will be graduating in May 2024 and am currently searching for software engineering opportunities.
                    </p>
                    <p>I love learning and currently have interests in front-end development, computer security, and graphic design.</p>
                </Section>

                <Section name="projects" ref={projectsRef} setCurrentSection={setCurrentSection}>
                    <h1>Projects</h1>
                    <p>Some of the computer science-related projects I've worked on in my personal time and in school.</p>
                    <div className="project-container">
                        {Projects.map((project: Project) => {
                            if (project.id < 4) {
                                return (
                                    <div>
                                        <div
                                            className={`project ${currentProject == project.id ? "selected-project" : ""}`}
                                            onClick={() => setCurrentProject(currentProject == project.id ? -1 : project.id)}>
                                            <div className='block' style={{
                                                backgroundImage: `url(projects/${project.name.toLowerCase()}/${project.images?.[0]})`,
                                                backgroundSize: "cover",
                                            }}></div>
                                            <div className='text'>{project.name}</div>
                                        </div>
                                        {currentProject == project.id &&
                                            <div className="project-description">
                                                <h1>{Projects[currentProject]?.name}</h1>
                                                {Projects[currentProject].source && <a href={Projects[currentProject].source} target="_blank">Source</a>}
                                                {Projects[currentProject].link && <a href={Projects[currentProject].link} target="_blank">Link</a>}
                                                <p>{Projects[currentProject]?.description}</p>
                                                <p>Languages/Tools Used:</p>
                                                <ul>
                                                    {Projects[currentProject].tools?.map((tool) => {
                                                        return <li>{tool}</li>
                                                    })}
                                                </ul>

                                                {/* {Projects[currentProject].images?.map((image) => {
                                                return <img src={`projects/${Projects[currentProject]?.name.toLowerCase()}/${image}`} alt={image} className="project-imaged" />
                                            })} */}
                                            </div>}
                                    </div>
                                );
                            }
                        })}
                    </div>
                </Section>

                <Section name="design" ref={designRef} setCurrentSection={setCurrentSection}>
                    <h1>Design</h1>
                    <div className="project-container">
                        {Projects.map((project: Project) => {
                            if (project.id > 3) return (
                                <div>
                                    <div
                                        className={`project ${currentProject == project.id ? "selected-project" : ""}`}
                                        onClick={() => setCurrentProject(currentProject == project.id ? -1 : project.id)}>
                                        <div className='block' style={{
                                            backgroundImage: `url(projects/${project.name.toLowerCase()}/${project.images?.[0]})`,
                                            backgroundSize: "cover",
                                        }}></div>
                                        <div className='text'>{project.name}</div>
                                    </div>
                                    {currentProject == project.id &&
                                        <div className="project-description">
                                            <h1>{Projects[currentProject]?.name}</h1>
                                            {Projects[currentProject].source && <a href={Projects[currentProject].source} target="_blank">Source</a>}
                                            {Projects[currentProject].link && <a href={Projects[currentProject].link} target="_blank">Link</a>}
                                            <p>{Projects[currentProject]?.description}</p>
                                            <p>Languages/Tools Used:</p>
                                            <ul>
                                                {Projects[currentProject].tools?.map((tool) => {
                                                    return <li>{tool}</li>
                                                })}
                                            </ul>

                                            {/* {Projects[currentProject].images?.map((image) => {
                                                return <img src={`projects/${Projects[currentProject]?.name.toLowerCase()}/${image}`} alt={image} className="project-imaged" />
                                            })} */}
                                        </div>}
                                </div>
                            );
                        })}
                    </div>
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

export default App;
