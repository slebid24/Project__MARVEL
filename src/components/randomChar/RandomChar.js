import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false,
    }

    MarvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    

    onCharLoaded = (char) => {
        this.setState({
            char: char, 
            loading: false
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.MarvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)

        
    }

    componentDidMount = () => {
        this.updateChar();
        
        
    }

    pickRandomChar = () => {
        this.setState({
            char: {}, 
            loading: true,
            error: false
        })
        
    }
    


    componentDidUpdate = () => {
        console.log("update")
        if (Object.keys(this.state.char).length == 0) {
            this.updateChar();
        }
    }
    
    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
                                                                                                                                                                                                    
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div onClick={this.pickRandomChar} className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}


const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    const formatDescrp = (des) => {
        let result = des ? des : "There is no description for this character";
        return result.length < 190 ? result : `${result.slice(0, 200)}...`
    }

    const imgStyle = (img) => {
        let imgType = img.match((/image_not_available/g))
        return imgType ? "randomchar__img--nf" : "randomchar__img"
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className={imgStyle(thumbnail)}/>
                    <div className="randomchar__info">
                        <p className="randomchar__name">{name}</p>
                        <p className="randomchar__descr">
                            {formatDescrp(description)}
                        </p>
                    <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;