import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";

import state from '../store';
import { CustomButton } from "../components";

import { headContainerAnimation, headContentAnimation, headTextAnimation, slideAnimation} from '../config/motion';
    
const Home = () => {
    const snap = useSnapshot(state);
    return (
        <AnimatePresence>
            {snap.intro && (
                <motion.section className="home" {...slideAnimation('left')}>
                    <motion.header {...slideAnimation("down")}>
                        <img 
                            src='./logo-no-background.png'
                            alt="logo"
                            className="w-8 h-8 object-contain"
                        />
                    </motion.header>

                    <motion.div className="home-content" {...headContainerAnimation}>
                        <motion.div {...headTextAnimation}>
                            <h1 className="head-text">
                                GET <br className="xl:block hidden" /> CREATIVE.
                            </h1>
                        </motion.div>
                        <motion.div {...headContentAnimation} className="flex flex-col gap-5">
                            <p className="max-w-md font-normal text-gray-600 text-base">
                                Design your very own <strong>one-of-a-kind</strong> shirt with the brand new 3D 
                                customization tool. Let your imagination run wild and create a style 
                                that's uniquely yours.
                            </p>

                            <CustomButton 
                                type="filled"
                                title="Start Designing"
                                handleClick={() => state.intro = false}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </motion.div>
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default Home