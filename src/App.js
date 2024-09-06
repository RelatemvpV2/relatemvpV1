import { useState, useEffect, useMemo ,useContext} from "react";
import { Route, Routes, useParams } from "react-router-dom";



//firebase 

import { getDocs, collection, getFirestore, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

import PrivateRoutes from "./utils/PrivateRoutes";

import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import LoginWithPwd from "./components/login/LoginWithPwd";
//Privite Routes
import CompleteProfile from './components/completeProfile/CompleteProfile';
import FirstStep from './components/firstStep/FirstStep';
import RelationSelect from './components/relationSelect/RelationSelect';
import Intro from './components/IntroForCatagory/Intro';
import Questionnaire from './components/questionnaire/Questionnaire';
import Summary from './components/summary/Summary';
import InvitePartner from './components/invitePartner/InvitePartner';
import Welldone from './components/finish/Welldone';
import CompareResults from './components/comparedResults/CompareResults';
import Recommendations from './components/Recommendations/Recommendations';

import './App.css';

function App() {

  const [user, setUser] = useState(null)

  const [options, setOptions] = useState()

  //init service
  const db = getFirestore();

  //collection ref
  const userCollectionRef = collection(db, 'Users')
 
  const OptionsCollectionRef = collection(db, 'Options')


  return (
    <div className="App">



      <Routes>

        <Route element={<PrivateRoutes/>}>
          <Route path="/CompleteProfile" element={<CompleteProfile user={user} />} />
          <Route path="/FirstStep" element={<FirstStep />} />
          {/* <Route path="/RelationSelect" element={<RelationSelect />} /> */}
          <Route path="/Intro" element={<Intro />} />
          <Route index path="/Questionnaire/:id" element={<Questionnaire />} />
          <Route path="/Summary" element={<Summary />} />
          <Route path="/InvitePartner" element={<InvitePartner />} />
          <Route path="/Welldone" element={<Welldone />} />
          <Route path="/CompareResults" element={<CompareResults />} />
          <Route path="/Recommendations" element={<Recommendations />} />
        </Route>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<LoginWithPwd />} />
       {/*  <Route path="/Login/:email" element={<LoginWithPwd />} /> */}

       

      </Routes>



    </div>
  );
}

export default App;
