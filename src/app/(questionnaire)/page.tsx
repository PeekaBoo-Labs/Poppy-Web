import NavBar from '@/components/NavBar';
import Footer from '@/components/general/Footer';
import QuestionnaireForm from '@/components/questionnaire/QuestionnaireForm';
import QuestionnaireContextProvider from "@/contexts/questionnaire-context";

export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center bg-[#F7F7F7]">
      <NavBar />
      <div>
        <QuestionnaireContextProvider>
          <QuestionnaireForm />
        </QuestionnaireContextProvider>
      </div>
      <Footer />
    </div>
  );
}