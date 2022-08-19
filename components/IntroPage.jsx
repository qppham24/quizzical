export default function IntroPage(props) {
    return (
        <div className="page intro">
            <h1 className="intro--title">Quizzical</h1>
            <p className="intro--description">Some description if needed</p>
            <button 
                className="intro--btn-start"
                onClick={props.handleClick}
            >
                Start quiz
            </button>
        </div>
    )
}