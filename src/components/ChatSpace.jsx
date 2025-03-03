function ChatSpace({messages}) {

    var currentdate=new Date();

    return (
        <div className="chatSpace">
            {(messages!=null)?messages.map((val,idx)=>{
                return  (idx%2!=0)? 
                        <div className="botMsgWithTime" key={idx}>
                            <p className="time">{currentdate.getHours()+":"+currentdate.getMinutes()}</p>
                            <div className="botMsg">{val}</div>
                        </div>
                        :
                        <div className="manMsgWithTime" key={idx}>
                            <div className="manMsg">{val}</div>
                            <p className="time">{currentdate.getHours()+":"+currentdate.getMinutes()}</p>
                        </div>
            }):null}
        </div>
    )

}

export default ChatSpace;
