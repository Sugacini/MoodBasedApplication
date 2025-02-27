function ChatSpace({messages}) {

    var currentdate=new Date();

    return (
        <div className="chatSpace">
            {(messages!=null)?messages.map((val,idx)=>{
                return  (idx!=0)?(idx%2!=0)? 
                        <div className="botMsgWithTime">
                            <p className="time">{currentdate.getHours()+":"+currentdate.getMinutes()}</p>
                            <div className="botMsg">{val}</div>
                        </div>
                        :
                        <div className="manMsgWithTime">
                            <div className="manMsg">{val}</div>
                            <p className="time">{currentdate.getHours()+":"+currentdate.getMinutes()}</p>
                        </div>
                        :null
            }):null}
        </div>
    )

}

export default ChatSpace;
