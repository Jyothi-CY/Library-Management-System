import { CardBody, CardContainer, CardItem } from "./ui/3d-card.jsx"
import { Link } from "react-router-dom";


export default function Trending()  {
    return (
        <><center>
            <div>
                &nbsp;
            </div>
            <div>
                <span className="text-5xl text-white py-10 font-bold font-serif"><i>TRENDING</i></span>
            </div>
            <section className="grid grid-cols-3">
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh]">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Fantasy
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Get yourself to explore the world of FaNtAsY
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/Fantasy.jpg" className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    <Link to="books/fantasy">Get it now →</Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh] ">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Crime
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Wanna test your deductive skills? Go for it now!
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/Crime.jpg" className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    href="https://twitter.com/mannupaaji"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    <Link to="books/crime">Get it now →</Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh] ">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Sci-Fi
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                For those who love the blend of fiction and science
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/SciFi.jpg" className="h-70 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    href="https://twitter.com/mannupaaji"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    <Link to='/books/scifi'> Get it now →
                                    </Link>
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh] h-[50vh]">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Science
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Physics, Chemistry & Biology
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/Science.png" className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    href="https://twitter.com/mannupaaji"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Get it now →
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh] h-[50vh]">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Mathematics
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                Expolre the world of Mathematics 
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/Mathematics.png" className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    href="https://twitter.com/mannupaaji"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Get it now →
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col-span-1">
                    <CardContainer className="inter-var w-[50vh] h-[50vh]">
                        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                            <CardItem
                                translateZ="50"
                                className="text-xl font-bold text-neutral-600 dark:text-white"
                            >
                                Technology
                            </CardItem>
                            <CardItem
                                as="p"
                                translateZ="60"
                                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                            >
                                DevOps & Pentesting
                            </CardItem>
                            <CardItem translateZ="100" className="w-full mt-4">
                                <img src="/img/Technology.png" className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"></img>
                            </CardItem>
                            <div className="flex justify-between items-center mt-20">
                                <CardItem>
                                    &nbsp;
                                </CardItem>
                                <CardItem
                                    translateZ={20}
                                    as="button"
                                    href="https://twitter.com/mannupaaji"
                                    target="__blank"
                                    className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                                >
                                    Get it now →
                                </CardItem>
                            </div>
                        </CardBody>
                    </CardContainer>
                </div>
                <div>
                    &nbsp;
                </div>
            </section>
        </center>
        </>
    )
}
