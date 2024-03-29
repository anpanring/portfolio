import { useState, useRef } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import Section from './Section';

// import ImageGallery from "react-image-gallery";

import './styles/App.css';
// import projectData from '../data/projects.json';

type Image = {
    src: string;
    alt: string;
}

type Project = {
    name: string;
    type: "cs" | "design";
    id: string;
    description: string[];
    thumbnail?: Image;
    source?: string;
    link?: string;
    images?: Image[];
    tools?: string[];
}

const navs = ["home", "projects", "design"];

const Projects: Project[] = [
    {
        name: "Dejumbler",
        type: "cs",
        id: "dejumbler",
        description: ["Full-stack webapp I made to manage my lists of different type of media in one place.", "Currently, it allows users to create and organize lists of music, movies, and books."],
        thumbnail: { src: "dejumbler-text-logo.png", alt: "Dejumbler Logo" },
        source: "https://github.com/anpanring/dejumbler",
        link: "https://dejumbler.com/",
        images: [
            { src: "all-lists.png", alt: "All Lists Page" },
            { src: "mobile-view.png", alt: "Mobile View" },
            { src: "mobile-screen-recording.gif", alt: "Adding a book to a list" }
        ],
        tools: ["Javascript/Typescript", "Next.js", "MongoDB & Mongoose for DB", "GSAP for animations", "Spotify, TMDB, Open Library APIs for data"],
    },
    {
        name: "Chatterbox",
        type: "cs",
        id: "chatterbox",
        description: ["Implementation of a forward-secure, end-to-end encrypted messaging client inspired by the Signal protocol.", "Replicated Signal’s key agreement protocol (X3DH) to establish shared session key between two parties.", "Ensured resiliency and proper encryption/decryption of out-of-order messages with double ratchet"],
        thumbnail: { src: "go.png", alt: "Golang Logo" },
        images: [],
        tools: ["Go"]
    },
    {
        name: "Monopoly",
        type: "cs",
        id: "monopoly",
        description: ["A Monopoly game made with a group of friends for a class project.", "I was responsible for most of the front-end and game logic."],
        thumbnail: { src: "monopoly.jpg", alt: "Monopoly Board" },
        source: "https://github.com/anpanring/monopoly",
        images: [],
        tools: ["Java", "AWT & Swing for GUI"]
    },
    {
        name: "Portfolio",
        type: "cs",
        id: "portfolio",
        description: ["This website! Coded from scratch with responsive performance in mind."],
        thumbnail: { src: "spider-man.jpg", alt: "Spidermen pointing at each other" },
        source: "https://github.com/anpanring/portfolio",
        link: "https://anpanring.github.io/portfolio/",
        images: [],
        tools: ["Typescript", "React", "Vite", "Github Actions for automating deployment"]
    },
    {
        name: "Skint App Concept",
        type: "design",
        id: "skint",
        description: ["The Skint is a website and newsletter dedicated to sharing the best free or cheap events in New York City.", "To practice my UI/UX skills, I designed an unofficial app concept for the organization."],
        thumbnail: { src: "skint-logo.png", alt: "Skint Logo" },
        images: [
            { src: "Skint-Launch.png", alt: "Skint Launch Screen" },
            { src: "Skint-Feed.png", alt: "Skint Event Feed" },
            { src: "Skint-Event.png", alt: "Skint Event Page" }
        ],
        tools: ["Figma"],
    },
    {
        name: "Chord Magazine",
        type: "design",
        id: "chord",
        description: ["A concept for an electronic music magazine.", "Edited found images and designed layout and typography in InDesign."],
        thumbnail: { src: "chord-magazine-page-1.png", alt: "Magazine Cover" },
        images: [
            { src: "chord-magazine-page-1.png", alt: "Cover Page" },
            { src: "chord-magazine-page-2.png", alt: "Page 2" },
            { src: "chord-magazine-page-3.png", alt: "Page 3" },
            { src: "chord-magazine-page-4.png", alt: "Page 4" },
            { src: "chord-magazine-page-5.png", alt: "Page 5" }],
        tools: ["Adobe InDesign", "Adobe Illustrator"],
    },
    {
        name: "Custom Font",
        type: "design",
        id: "font",
        description: ["A custom, blocky font I designed for a class project.", "I wanted to create a font with as few lines as possible while still being legible."],
        thumbnail: { src: "font-thumbnail.png", alt: "Custom Font Thumbnail" },
        images: [{ src: "jackD_font.png", alt: "Custom Font" }],
        tools: ["Glyphs Mini", "Adobe Illustrator"],
    },
]

function Image({currentProjectId, image}: {currentProjectId: string, image: Image}) {
    // const [fullscreen, setFullscreen] = useState<boolean>(false);

    return (
        // <div onClick={() => setFullscreen(!fullscreen)} className={fullscreen ? "fullscreen" : ""}>
        <div>
            <img src={`design/${currentProjectId.toLowerCase()}/${image.src}`} alt={image.alt} className="project-image" />
            <p>{image.alt}</p>
        </div>
    )
}

function App() {
    const [currentProject, setCurrentProject] = useState<Project | null>(null);
    const [currentSection, setCurrentSection] = useState(0);
    // const [currentImage, setCurrentImage] = useState<Image | null>(null);

    const navRef = useRef<HTMLElement>(null);
    const homeRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const designRef = useRef<HTMLElement>(null);
    // const contactRef = useRef<HTMLElement>(null);

    // const currNav = useContext(NavContext);

    useGSAP(() => {
        gsap.from(".project-description", {
            y: "-20",
            opacity: 0,
            duration: 0.3,
        });
    }, [currentProject]);

    useGSAP(() => {
        gsap.fromTo("#projects", {
            y: 10,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            scrollTrigger: {
                trigger: "#projects",
                toggleActions: "play none none none",
            }
        });

        gsap.fromTo("#design", {
            y: 10,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            duration: 0.1,
            scrollTrigger: {
                trigger: "#design",
                toggleActions: "play none none none",
            }
        });
    });

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
            <nav ref={navRef}>
                <ul className="navbar">
                    {/* {navs.map((nav) => {
                        return <li>
                            <a
                                id={`${nav}-link`} href={`#${nav}`}
                                className={navs[currentSection] == nav ? 'selected' : ''}
                            >
                                {nav == "home" ? "Jack Dempsey" : nav.charAt(0).toUpperCase() + nav.slice(1)}
                            </a>
                        </li>
                    })} */}
                    {/* <li>{currentSection}</li> */}
                    <li className="left-nav">
                        <a id="home-link" href="#home" className={navs[currentSection] == "home" ? 'selected' : ''}>
                            <span>Jack Dempsey</span>
                        </a>
                    </li>
                    <li className="center-nav">
                        <a id="projects-link" href="#projects" className={navs[currentSection] == "projects" ? 'selected' : ''}>
                            <span>Projects</span>
                        </a>
                    </li>
                    <li className="right-nav">
                        <a id="design-link" href="#design" className={navs[currentSection] == "design" ? 'selected' : ''}>
                            <span>Design</span>
                        </a>
                    </li>
                    {/* <li><a id="contact-link" href="#contact">About</a></li> */}
                </ul>
            </nav>

            <div className="content">
                <Section name="home" ref={homeRef} setCurrentSection={setCurrentSection}>
                    <div className="profile-text">
                        <p>Hi, I'm Jack! I'm currently a senior at NYU studying Computer Science, with minors in Psychology and Studio Art.
                            I will be graduating in May 2024 and am currently searching for software engineering opportunities.
                        </p>
                        <p>I love learning and currently have interests in front-end development, computer security, and graphic design.</p>
                        <p>In my personal time, I enjoy playing soccer, listening to music, and skateboarding.</p>
                        <p>Contacts:&nbsp;
                            <a className="contact-link" href="https://www.linkedin.com/in/jack-i-dempsey/" target="_blank">LinkedIn</a>,&nbsp;
                            <a className="contact-link" href="https://github.com/anpanring" target="_blank">Github</a>,&nbsp;
                            <a className="contact-link" href="mailto:jdempsey2024@gmail.com" target="_blank">Email</a>,&nbsp;
                            <a className="contact-link" href="https://drive.google.com/file/d/1ryhkUWJUDHuiPR6aCyXLIfDjthUAyVLG/view?usp=sharing" target="_blank">Resume</a>.
                        </p>
                    </div>
                </Section>

                <div className="non-home-content">
                    <Section name="projects" ref={projectsRef} setCurrentSection={setCurrentSection}>
                        {/* <h1>Projects</h1> */}
                        <p className="section-description">Some of the computer science-related projects I've worked on in my personal time and in school.</p>
                        <div className="project-container">
                            {Projects.map((project: Project) => {
                                if (project.type === "cs") {
                                    return (
                                        <div>
                                            <div
                                                className={`project-thumbnail ${currentProject == project ? "selected-project" : ""}`}
                                                onClick={() => setCurrentProject(currentProject == project ? null : project)}>

                                                <div className="project-thumb-image" style={{
                                                    backgroundImage: `url(projects/${project.id.toLowerCase()}/${project.thumbnail?.src})`,
                                                    backgroundSize: "cover",
                                                }}></div>

                                                <div className="project-thumb-text">{project.name}</div>
                                            </div>
                                            {currentProject == project &&
                                                <div className="project-description">
                                                    {/* <h1>{currentProject.name}</h1> */}
                                                    <div className="project-description-container flex-row">
                                                        <div className="project-text">
                                                            <p>
                                                                {currentProject.link && <a href={currentProject.link} className="project-link" target="_blank">Live Deployment</a>}
                                                                {currentProject.link && currentProject.source && <span>,&nbsp;</span>}
                                                                {currentProject.source && <a href={currentProject.source} className="project-link" target="_blank">Source</a>}
                                                            </p>
                                                            {currentProject.description.map((paragraph) => {
                                                                return <p>{paragraph}</p>
                                                            })}

                                                            <div className="project-tools">
                                                                <p><u>Languages/Tools Used:</u></p>
                                                                {currentProject.tools?.map((tool) => {
                                                                    return <p>- {tool}</p>
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="project-images-container">
                                                            {currentProject.images?.map((image) => {
                                                                return <div>
                                                                    <img src={`projects/${currentProject.id.toLowerCase()}/${image.src}`} alt={image.alt} className="project-image" />
                                                                    <p>{image.alt}</p>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </Section>

                    <Section name="design" ref={designRef} setCurrentSection={setCurrentSection}>
                        {/* <h1>Design</h1> */}
                        <p className="section-description">Along with coding I am very interested in design, especially when it comes to combining it with software.</p>
                        <div className="project-container">
                            {Projects.map((project: Project) => {
                                if (project.type === "design") return (
                                    <div>
                                        <div
                                            className={`project-thumbnail ${currentProject == project ? "selected-project" : ""}`}
                                            onClick={() => setCurrentProject(currentProject == project ? null : project)}>
                                            <div className="project-thumb-image" style={{
                                                backgroundImage: `url(design/${project.id.toLowerCase()}/${project.thumbnail?.src})`,
                                                backgroundSize: "cover",
                                            }}></div>
                                            <div className="project-thumb-text">{project.name}</div>
                                        </div>
                                        {currentProject == project &&
                                            <div className="project-description">
                                                {/* <h1>{currentProject.name}</h1> */}
                                                <div className="project-description-container flex-row">
                                                    <div className="project-text">
                                                        {currentProject.source && <a href={currentProject.source} target="_blank">Source</a>}
                                                        {currentProject.link && <a href={currentProject.link} target="_blank">Link</a>}
                                                        {currentProject.description.map((paragraph) => {
                                                            return <p>{paragraph}</p>
                                                        })}

                                                        <div className="project-tools">
                                                            <p><u>Tools Used:</u></p>
                                                            {currentProject.tools?.map((tool) => {
                                                                return <p>- {tool}</p>
                                                            })}
                                                        </div>
                                                    </div>
                                                    <div className="project-images-container">
                                                        {currentProject.images?.map((image) => {
                                                            return (
                                                                // <Image currentProjectId={currentProject.id} image={image} />
                                                                <div>
                                                                    <img src={`design/${currentProject.id.toLowerCase()}/${image.src}`} alt={image.alt} className="project-image" />
                                                                    <p>{image.alt}</p>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </Section>
                </div>
            </div>

            <footer>
                <img src="spinnylogo.gif" alt="loading" className="spinny-logo" />
                <p className="footer-text">Jack Dempsey, last edited 3/3/2024</p>
            </footer>
        </div>
    )
}

export default App;
