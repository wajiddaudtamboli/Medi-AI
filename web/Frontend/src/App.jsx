import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { loadUser } from './actions/userActions.js';
import Chat from "./components/Chat/Chat.jsx";
import ChatBotButton from "./components/ChatBotButton.jsx";
import EmergencyButton from "./components/EmergencyButton.jsx";
import Footer from "./components/Footer";
import HealthTips from "./components/HealthTips.jsx";
import Navbar from "./components/Navbar";
import LoginSignup from "./components/User/LoginSignup.jsx";
import Profile from "./components/User/Profile.jsx";
import VideoCall from "./components/VideoCall.jsx";
import AlzheimerVideoAnalysis from "./pages/AlzheimerVideoAnalysis.jsx";
import AlzheimerVisionAI from "./pages/Alziemer.jsx";
import AnalysisBot from "./pages/AnalysisBot.jsx";
import AnalysisBotECG from "./pages/AnalysisBotECG.jsx";
import AnalysisBotXRAY from "./pages/AnalysisBotXRAY.jsx";
import CancerVideoAnalysis from "./pages/CancerVideoAnalysis.jsx";
import ECGVideoAnalysis from './pages/ECGVideoAnalysis';
import MedicalVisionAI from "./pages/FinalCancer.jsx";
import GeneralAnalysis from './pages/GeneralAnalysis.jsx';
import Landing from "./pages/Landing.jsx";
import RetinolVisionAI from "./pages/Retinopathy.jsx";
import RetinopathyVideoAnalysis from './pages/RetinopathyVideoAnalysis';
import SkinVisionAI from "./pages/SkinAnalysis.jsx";
import SkinVideoAnalysis from "./pages/SkinVideoAnalysis.jsx";
import SpecificAnalysis from "./pages/SpecificAnalysis.jsx";
import TreatmentSuggestions from "./pages/TreatmentSuggestions.jsx";
import XRayVideoAnalysis from './pages/XRayVideoAnalysis';
import { persistReduxStore } from './store.js';


function App() {
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    persistReduxStore.dispatch(loadUser());
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 pt-16 md:pt-20">
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route exact path='/login' element={<LoginSignup />} />
          <Route exact path='/account' element={<Profile user={user} />} />
          <Route path='/health' element={<HealthTips />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/treatment-suggestions' element={<TreatmentSuggestions />}></Route>
          <Route path='/analysis' element={<AnalysisBot />}></Route>
          <Route path='/analysis/general' element={<GeneralAnalysis />}></Route>
          <Route path='/analysis/specific' element={<SpecificAnalysis />}></Route>
          <Route path='/analysis/ecg' element={<AnalysisBotECG />}></Route>
          <Route path='/analysis/ecg-video' element={<ECGVideoAnalysis />}></Route>
          <Route path='/analysis/xray' element={<AnalysisBotXRAY />}></Route>
          <Route path='/analysis/xray-video' element={<XRayVideoAnalysis />}></Route>
          <Route path='/analysis/cancer' element={<MedicalVisionAI />}></Route>
          <Route path='/analysis/cancer-video' element={<CancerVideoAnalysis />}></Route>
          <Route path='/analysis/alzheimer' element={<AlzheimerVisionAI />}></Route>
          <Route path='/analysis/alzheimer-video' element={<AlzheimerVideoAnalysis />}></Route>
          <Route path='/analysis/skin' element={<SkinVisionAI />}></Route>
          <Route path='/analysis/skin-video' element={<SkinVideoAnalysis />}></Route>
          <Route path='/analysis/retinopathy' element={<RetinolVisionAI />}></Route>
          <Route path='/analysis/retinopathy-video' element={<RetinopathyVideoAnalysis />} />
          <Route path='/telemedicine' element={<VideoCall />} />
          <Route path='/emergency' element={<Navigate to="https://video-call-final-git-main-orthodox-64s-projects.vercel.app/?roomID=emergency" replace />} />
        </Routes>
      </main>
      <Footer />
      <ChatBotButton />
      <EmergencyButton />
    </div>
  );
}

export default App;
