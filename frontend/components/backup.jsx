// JavaScript source code
return (
    <div className="videopage">
        <div className="video-player">
            <div>
                <video width="800" height="500" controls >
                    <source src="../icons/video.mp4" type="video/mp4" />
                </video>
            </div>
            <div>
                <h1>{title}</h1>
            </div>
            <div className="videosubsection">
                <div>
                    <div>
                        <img src={photo} alt="hello"></img>
                    </div>
                    <div>
                        <p>{uploader}</p>
                        <p>No of subs</p>
                    </div>
                    <div>
                        <p>Subscribe</p>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={like} />
                        <p>10</p>
                    </div>
                    <div>
                        <img src={dislike} />
                        <p>10</p>
                    </div>
                    <div>
                        <img src={share} />
                        <p>Share</p>
                    </div>
                    <div>
                        <img src={downloadicon} />
                        <p>Save</p>
                    </div>
                </div>

            </div>
            <div className="description">
                <div>
                    <h1>{views} views</h1>
                    <h4>{uploadDate}</h4>
                </div>
                <div>
                    <p>{description}</p>
                </div>

            </div>
            <div className="comments">
                <div>
                    <h1>{comments.length} Comments</h1>
                    <input placeholder="Enter Comment" id="comment"></input>
                    <button>Submit</button>
                </div>
                {/*<div className="usercomment">*/}
                {/*    {comments.map((item,index) => {*/}
                {/*        return (*/}
                {/*            <div className="comment" key={index}>*/}
                {/*                <div>*/}
                {/*                    <p>{item.userId}</p>*/}
                {/*                    <p>{Date(item.timestamp).toString().slice(3, 15)}</p>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <p>{item.text}</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        </div>

        {/*<div>*/}
        {/*    {videos.map((item, index) => {*/}
        {/*        if (item._id == _id) {*/}
        {/*            return null*/}
        {/*        }*/}
        {/*        else {*/}
        {/*            return (*/}
        {/*                <Recommendation key={index} data={item} />*/}
        {/*            )*/}
        {/*        }*/}
        {/*    })}*/}
        {/*</div>*/}

    </div>
)