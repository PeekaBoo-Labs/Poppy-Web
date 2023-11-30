import NavBar from '@/components/NavBar';
import ProgressBar from '@/components/ProgressBar';
import QuestionnairePage from '@/components/QuestionnairePage';
import QuestionnaireContextProvider from "@/contexts/questionnaire-context";
import Footer from '@/components/general/Footer';
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm';

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center bg-[#F7F7F7] text-[#262626]">
      <NavBar wide_mode={false}/>
      <div>
        <QuestionnaireContextProvider>
          <QuestionnaireForm />
        </QuestionnaireContextProvider>
      </div>
      <Footer />
    </div>
  );
}