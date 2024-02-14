import NavBar from '@/components/NavBar';
import Footer from '@/components/general/Footer';
import QuestionnaireForm from '@/app/(questionnaire)/questionnaire/QuestionnaireForm';

export default function Home() {

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-[#F1EFED]">
      <NavBar />
      <div className="flex-grow">
        <QuestionnaireForm />
      </div>
      <Footer />
    </div>
  );
}