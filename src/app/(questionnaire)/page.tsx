import NavBar from '@/components/NavBar';
import Footer from '@/components/general/Footer';
import QuestionnaireForm from '@/app/(questionnaire)/questionnaire/QuestionnaireForm';

export default function Home() {

  return (
    <div className='mx-auto flex h-full max-w-[1300px] flex-col'>
      <NavBar />
      <QuestionnaireForm />
      <Footer />
    </div>
  );
}