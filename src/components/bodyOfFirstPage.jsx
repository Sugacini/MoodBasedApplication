import { useNavigate } from 'react-router-dom';
function FirstPageBody({userUniqueId}) {
    const navigate = useNavigate();

    return(
        <div className='homePageCont'>
            <div className="firstPageBody">
                <div className='bodyChild'>
                    <h1 className='introLines'>Mood based Suggestions</h1>
                    <p className='introSentence'>UnarvAI detects your mood by analyzing facial expressions. It provides personalized recommendations for activities, music, and content based on how you're feeling.</p>
                    <button className='startedBtn' onClick={() => {navigate("/home", {state: {idOfUser: userUniqueId}})}}>
                         Get Started
                    </button>                
                </div>
                <div className='bodyChild'>
                    <img src="emojis.gif" className='gif'/>
                </div>
            </div>

        </div>
    )
}

export default FirstPageBody;