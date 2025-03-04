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
  console.log(userId);
  
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


      <div className='wholeMusicPage' style={addElement?playFirst?{gap:'70px'}:{gap:'70px', marginLeft:'30px'}:null}>
        {selectedAlbumIdx==null?<div id='musicsLeft' style={{background:'#0362d8'}}>
            <img src={emojiImg} alt="" className='emojiImage' />
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