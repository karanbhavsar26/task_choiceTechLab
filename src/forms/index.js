import { lazy, Suspense, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import StepProgress from "./components/stepComponent";

export default function Main() {
  const step = useSelector((state) => state?.forms?.step);

  const componentMapping = {
    0: lazy(() => import('./components/personalInformation')),
    1: lazy(() => import('./components/educationDetails')),
    2: lazy(() => import('./components/workExperience')),
    3: lazy(() => import('./components/skillAndCertification')),
    4: lazy(() => import('./components/additionDetails')),
    5: lazy(() => import('./components/review')),
    6: lazy(() => import('./components/finalSubmit'))
  };

  const LazyComponent = useMemo(() => componentMapping[step], [step]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Multi-step Form Application
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to complete your application.
        </p>

        <StepProgress />

        <Suspense fallback={<div className="min-h-[40vh]"></div>}>
          <motion.div
            className="container mx-auto px-4 my-4 lg:overflow-y-auto"
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LazyComponent />
          </motion.div>
        </Suspense>
      </div>
    </div>
  );
}
