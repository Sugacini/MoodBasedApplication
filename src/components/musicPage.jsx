import './musicPage.css'
// import HeaderAndSideBar from './headerWithSideBar';
import AlbumBox from './AlbumBox';
import SideBarredAlbum from './SideBarredAlbum';
import MusicMainViewTopSec from './MusicMainViewTopSec';
import SongBox from './SongBox';
import MainMusicRight from './MainMusicRight';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import Header from './Header';

import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

var prevSong = "0";
var finalEmo;
var emojiImg;

function decreseParentsWidth() {
  var element = document.querySelector('.mainOfMusic');
  element.style.width = '950px';
}

async function dataReceiver(emotionEmoji) {
  try {
    var response= await fetch('http://localhost:3000/emotions',{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({emotion:emotionEmoji})})
      
    var responseData= await response.json();    
    return responseData;
  } catch (error) {
    console.log(error);
    
  }
  
}

function MusicPage() {


  const setImg = useRef();
  const location = useLocation();
  const result = location.state;
  var userId = result.idOfUser;
  console.log(result);
  
  const data1 = (JSON.stringify(result.emo));
  finalEmo = data1.slice(1,data1.length-1);
  emojiImg = finalEmo+".png";

  useEffect(()=>{
    dataReceiver(finalEmo).then(res=>setData(res));
  },[])
  const [data,setData]= useState(null);
  const [addElement, setState] = useState(false);
  const [selectedAlbumIdx, setAlbum] = useState(null);
  const [songSelectedIdx, setSelectSong] = useState("0");
  const [canPlay, setPlayStatus] = useState('false');
  const [playFirst,setFirstPlay]=useState(false);
  const [resume,setResume]=useState(false);
  const [timeBarValue,setBarValue] = useState(0);

  const musicQuotes = {
    happy: ['"Music is the soundtrack of your best moments"','"Happiness is... turning up the volume on your favorite song!"', '"A day without music is like a day without sunshine"', '"Music is the sparkle in a happy heart!"', '"Happiness is... dancing to your favorite song on repeat!"'],
    sad: ['"The saddest songs bring back the deepest memories"', '"The saddest songs are the ones that once made you the happiest"', '"Music is not just sound; it is the voice of emotions that words fail to express"', '"Sad songs say so much about the heart"', '"When you are happy, you enjoy the music. When you are sad, you understand the lyrics"'],
    angry: ['"Music is the best way to release anger without hurting anyone"', '"Angry music isn’t just noise—it’s therapy for the soul"', '"When I’m angry, I don’t yell—I turn up the volume"', '"Music is the fire that burns away frustration"', '"Let the bass shake the walls and the music shake my soul"'],
    disgusted: ['"Sometimes, the world is too much, but music never disappoints"', '"When everything feels wrong, I let the music make it right"', '"Music clears the mind when everything else is a mess"', '"A powerful song can wash away the bad energy of the day"', '"Some songs help you scream without saying a word"'],
    fear: ['"When fear whispers, let music be your shield"', '"Music is the light that guides you through the darkness"', '"A song can be the hand that pulls you out of fear"', '"Fear fades when the right song plays"', '"Music speaks louder than the fears in my mind"'],
    neutral: ['"Music is the rhythm of life, neither too fast nor too slow"', '"Music is like life, full of highs and lows, but always moving forward"', '"No matter how I feel, music is always there"', '"Music is the steady beat in the silence of the mind"', '"A perfect song doesn’t change your mood; it matches it"'],
    surprised: ['"Sometimes, a song hits differently, and you don’t even know why"', '"A new song can change everything in an instant"', '"One unexpected note can turn a good song into a masterpiece"', '"You never know when a song will surprise you and steal your heart"', '"A song you’ve never heard before can instantly become your new favorite"'],
  }

  const audTag = useRef();
  // const rangeBar = useRef();
  var artists;
  var songObjArr;

  function afterSelectionOfSong() {    
    if (canPlay) {
      audTag.current.src = data[selectedAlbumIdx].data.songs[songSelectedIdx].downloadUrl[0].url;
      audTag.current.play();
      prevSong = songSelectedIdx;
    }
  }

  if (!canPlay) {
    audTag.current.pause();
  }
  else if ((selectedAlbumIdx != null && songSelectedIdx != null) && playFirst) {    
    audTag.current.play();
  }

  return (
    <>
      {/* <HeaderAndSideBar /> */}

  <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: finalEmo, idOfUser: userId}}}/>


      <div className='wholeMusicPage'>
        {selectedAlbumIdx==null?<div id='musicsLeft'>
            <img src={emojiImg} alt="" className='emojiImage' />
            <p className='quotesMusic'>{musicQuotes[finalEmo][Math.floor(Math.random() * 5)]}</p>
          </div>
        : <div id='musicsLeft' className='leftOfMainMusic'>
            <img src={emojiImg} alt="" className='emojiImage' ref={setImg}/>
            <div>
              {data.map((album, idx) => (idx < 9) ? <SideBarredAlbum idx={idx} imgUrl={album.data.image[0].url} name={album.data.name} setAlbum={setAlbum} selectedAlbumIdx={selectedAlbumIdx}/> : null)}
            </div>
          </div>}
        <div className='mainOfMusic'>

          {addElement ? <MusicMainViewTopSec selectedAlbum={data[selectedAlbumIdx]}/> : null}


          <div className={addElement ? 'musicBottomSec' : 'mainsBottomSec'}>
          {!addElement ? (data!=null)?console.log(data):null:null}
            {!addElement ? (data!=null)? data.map((album, idx) =>      
              (idx < 9) ? <AlbumBox name={album.data.name} key={idx} idx={idx} imgUrl={album.data.image[2].url} setState={setState} setAlbum={setAlbum} description={album.data.description}></AlbumBox> :null):
              <div className="animation flex">
              <div className="balls" id="circleOne"></div>
              <div className="balls" id="circleTwo"></div>
              <div className="balls" id="circleThree"></div>
          </div> : null }

            {addElement ? <div className='titleBox'>
              {!resume && (canPlay==true)?<PauseButton playFirst={playFirst} decreseParentsWidth={decreseParentsWidth} setFirstPlay={setFirstPlay} canPlay={canPlay} setPlayStatus={setPlayStatus} setResume={setResume} resume={resume}/>
              :<PlayButton playFirst={playFirst} decreseParentsWidth={decreseParentsWidth} setFirstPlay={setFirstPlay} canPlay={canPlay} setPlayStatus={setPlayStatus} setResume={setResume} resume={resume}/>}

              <p className='titleSpace nameTxt'>Name</p>
              <p className='productionTxtSpace'>Production</p>
              <p>Duration</p>
            </div>:null}
            {addElement ? data[selectedAlbumIdx].data.songs.map((song, idx) => {
              artists = song.artists.all.reduce((acc, val) => acc + val.name + ", ", "");
              artists = (artists.length > 40) ? artists.slice(0, 40) + "..." : artists;       
              songObjArr= data[selectedAlbumIdx].data.songs;              
              
              

              return <SongBox idx={idx + 1} imgUrl={song.image[0].url} name={song.name} artists={artists} production={song.label} duration={song.duration} language={song.language} setSelectSong={setSelectSong} songSelectedIdx={songSelectedIdx} setPlayStatus={setPlayStatus} canPlay={canPlay} playFirst={playFirst} setFirstPlay={setFirstPlay} resume={resume} setResume={setResume} decreseParentsWidth={decreseParentsWidth} setBarValue={setBarValue}/>
            }) : null}
            {(prevSong != songSelectedIdx) ? console.log('fromCommand') : null}
            {(prevSong != songSelectedIdx) ? afterSelectionOfSong() : null}

            {/* {addElement?audTag.current.timeBarValue=:null} */}
            {addElement ?
            <audio ref={audTag} onTimeUpdate={()=>setBarValue(audTag.current.currentTime)} onEnded={()=>{
              setSelectSong((songSelectedIdx!=(songObjArr.length-1))?songSelectedIdx+1:0)
              setBarValue(0);
              }}>
              <source src={songObjArr[songSelectedIdx].downloadUrl[0].url} type="audio/mp4" />
            </audio>
            :null}


          </div>
        </div>
      {playFirst?<MainMusicRight canPlay={canPlay} setPlayStatus={setPlayStatus} resume={resume} setResume={setResume} songObjArr={songObjArr} totalSongsNum={songObjArr.length} songSelectedIdx={songSelectedIdx} setSelectSong={setSelectSong} duration={data[selectedAlbumIdx].data.songs[songSelectedIdx].duration} timeBarValue={timeBarValue} setBarValue={setBarValue} audTag={audTag}></MainMusicRight>:null}
      </div>

    </>
  )
}

export default MusicPage;