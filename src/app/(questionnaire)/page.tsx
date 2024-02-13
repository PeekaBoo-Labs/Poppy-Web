import NavBar from '@/components/NavBar';
import Footer from '@/components/general/Footer';
import QuestionnaireForm from '@/app/(questionnaire)/questionnaire/QuestionnaireForm';
import QuestionnaireContextProvider from "@/contexts/questionnaire-context";

export default function Home() {

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#F1EFED]">
      <NavBar />
      <div className="flex-grow">
        <QuestionnaireContextProvider>
          <QuestionnaireForm />
        </QuestionnaireContextProvider>
      </div>
      <Footer />
    </div>
  );
}