import { gsap } from "gsap"
import {useCallback, useEffect, useState} from "react"
import Link from 'next/link'
import styles from '../styles/Overlay.module.css'

export function Nav() {

    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        const mediaQueryForMobilePortrait = matchMedia('(max-width: 768px)');
        const mediaQueryForMobileLandscape = matchMedia(
            '(max-width: 812px) and (orientation: landscape)',
        );
        const mobile =
            mediaQueryForMobilePortrait.matches ||
            mediaQueryForMobileLandscape.matches;
        setIsMobile(mobile);
    },[])

    const navAnimate = useCallback(node => {
        if (node !== null) {
            const timelineIn = gsap.timeline({
                delay: 1
            })

            timelineIn.fromTo(node, {
                opacity: 0,
            }, {
                delay: 0.2,
                duration: 1.5,
                opacity: 1,
                ease: 'expo.out',
            }, 0)
        }
    }, [])

    return (
        <nav className={styles.navbar} ref={navAnimate}>
            <Link href={"/"}>
                {
                    isMobile == null ? <a></a> :
                    isMobile ?
                        ( <a className={styles.navitem}>Abhishek</a>
                    ) : (
                        <a className={styles.banner}>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                            <div className={styles.panel}/>
                        </a>
                    )
                }

            </Link>
            <ul className={styles.navitems}>
                <li>
                    {/*<Link href={"/courses"}>*/}
                    {/*    <a className={styles.navitem}>Certifications</a>*/}
                    {/*</Link>*/}
                    <a className={styles.navitem}>About</a>
                </li>
                <li>
                    {/*<a className={styles.navitem} target="_blank" href="https://github.com/Aviisek" rel="noreferrer">Github</a>*/}
                    <a className={styles.navitem}>Github</a>
                </li>
                <li>
                    {/*<a className={styles.navitem} target="_blank" href="https://www.linkedin.com/in/abhishek-k-513149124/"*/}
                    {/*   rel="noreferrer">LinkedIn*/}
                    {/*</a>*/}
                    <a className={styles.navitem}>Linkedin</a>
                </li>
            </ul>
        </nav>
    )
}

export function Overlay() {

    const tech = ["Java,", "Kotlin,", "ReactJs,", "NextJs,", "Golang,", "Database,", "Docker,", "Kubernetes"]

    function calculate (spans) {
        const lines = []
        let words = []

        let position = spans[0].offsetTop

        spans.forEach((span, index) => {
            if (span.offsetTop === position) {
                words.push(span)
            }

            if (span.offsetTop !== position) {
                lines.push(words)

                words = []
                words.push(span)

                position = span.offsetTop
            }

            if (index + 1 === spans.length) {
                lines.push(words)
            }
        })

        return lines
    }

    function createIntroMarkup(introText) {
        const htmlText = introText.split(" ").map((word, index) => {

            if(word === "\n") return ("<br>")
            if(tech.includes(word)) {
                return (`<span style="display: inline-block">
                            <span style="
                                    display: inline-block;
                                    font-style: italic;
                                    color: #F9F1E7;
                                    text-shadow: 2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5, 2px 2px 2px rgba(249,241,231,0);">
                            ${word} 
                            </span>&nbsp;</span>`)
            }
            return (`<span style="display: inline-block"><span style="display: inline-block">${word}&nbsp;</span></span>`)}
        );
        return htmlText.join('');
    }

    const intro = useCallback(node => {
        if (node !== null) {
            const timelineIn = gsap.timeline({
                delay: 1
            })
            timelineIn.set(node, {
                autoAlpha: 1
            })

            let lines = calculate(node.childNodes);
            lines.forEach((line, index) => {
                timelineIn.fromTo(line, {
                    y: '100%',
                    opacity: 0,
                }, {
                    delay: index * 0.2,
                    duration: 1.5,
                    opacity: 1,
                    ease: 'expo.out',
                    y: '0%'
                }, 0)
            })
        }
    }, []);
    return (
        <div className={styles.wrapper}>
            <div ref={intro} className={styles.summary}  dangerouslySetInnerHTML={{
                __html: createIntroMarkup("Hello There! 👋 I am Abhishek. \n \n " +
                    "I am experienced Full stack software engineer and have worked on " +
                    "Reliable, Scalable and Maintainable applications. \n " +
                    "I have developed both server side applications " +
                    "as well as client facing applications. \n " +
                    "I have experience working with Java, Kotlin, ReactJs, NextJs, Golang, Database, Docker, " +
                    "Kubernetes and everything related to the Internet. ")
            }}>
            </div>

        </div>
    )
}