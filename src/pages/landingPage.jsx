
import Bio from '../sections/Bio'
import Intro from '../sections/Intro'
import Tech from '../sections/Tech'
import Experience from '../sections/Experience'
import Certificate from '../sections/Certificate'
import Footer from '../sections/Footer'
import Project from '../sections/Project'
import { FEATURE_FLAGS } from '../consts'


const LandingPageContainer = () => {
  return (
    <div>
      <Intro enable={ FEATURE_FLAGS.enableIntro } />
      <Bio enable={FEATURE_FLAGS.enableBio} />
      <Experience enable={FEATURE_FLAGS.enableExperience} />
      <Project />
      <Tech enable={FEATURE_FLAGS.enableTech} />
      <Certificate />
      <Footer enable={ FEATURE_FLAGS.enableFooter } />
    </div>
  );
}

export default LandingPageContainer;
