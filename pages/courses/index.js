import {useCallback, useEffect, useState} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {Nav} from "../../components/Overlay";

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {


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

    let courses = [
        {image: "/1.jpg", link: "https://www.coursera.org/account/accomplishments/verify/Z7XK9ED5476B", text: "Front-End Web Development with React by HongKong University"},
        {image: "/2.jpg", link: "https://www.coursera.org/account/accomplishments/verify/REPWWJE7NTGY", text: "Front-End JavaScript Frameworks: Angular by HongKong University"},
        {image: "/3.jpg", link: "https://www.coursera.org/account/accomplishments/verify/XWP7KQRT875Y", text: "Crash Course on Python by Google"},
        {image: "/4.jpg", link: "https://www.coursera.org/account/accomplishments/verify/WKY7KRBNZFXB", text: "Learning How to Learn: Powerful mental tools to help you master tough subjects"}]

    const sectionsContainer = useCallback(node => {
        if (node !== null && !isMobile) {

            gsap.to(node.childNodes, {
                xPercent: -100 * (node.childNodes.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: node,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (node.childNodes.length - 1),
                    end: () => "+=" + node.offsetWidth
                }
            });
        }
    }, []);

    const sectionsTextContainer = useCallback(node => {

        if (node !== null && isMobile) {
            const timelineIn = gsap.timeline({
                delay: 0.5
            })
            timelineIn.set(node, {
                autoAlpha: 1
            })

            const lines = node.childNodes;

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
    }, [isMobile]);


    if(isMobile == null) return null;

    if(isMobile){
        return (
            <><Nav />
            <div style={{height: "100%"}}>
                <div style={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                    opacity: 0,
                    alignItems: "center"}}
                     ref={sectionsTextContainer}>
                {
                    courses.map(({image, link, text}) => (
                        <div style={{width: "80%", textAlign: "center"}} key={text}>
                            <h2 style={{
                                color: '#F9F1E7',
                            }}>{text}</h2>
                            <a href={link}>View Certificate</a>
                        </div>
                    ))
                }
                </div>
            </div>
            </>
        )

    }
    if(!isMobile) {
        return (
            <>
                <Nav />
            <div>
                <div style={{display: "flex",
                    flexWrap: "nowrap",
                    width: "300%",
                    gap: "10vw",
                    height: "100vh"}} ref={sectionsContainer}>

                    { courses.map(({image, link, text}) => (
                        <a key={text} target="_blank" href={link} style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }} rel="noreferrer">
                            <img style={{
                                width: "800px",
                                height: "600px",
                                objectFit: "cover",
                            }} src={image}/>
                        </a> )
                    )
                    }
                </div>
            </div>
            </>
        );
    }
    return null;
};

export default Courses;