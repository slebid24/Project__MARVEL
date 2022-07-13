import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";




class CharList extends Component {
    state = {
        chars: [],
        loading: true,
    }

    MarvelService = new MarvelService();

    onCharLoaded = (chars) => {
        this.setState({
            chars: chars, 
            loading: false
        })
    }

    downloadChars = () => {
        this.MarvelService.getAllCharacters().then(this.onCharLoaded)
    }

    componentDidMount = () => {
        this.downloadChars();
    }

    render() {
        console.log(this.state)
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <li className="char__item">
                        <Spinner/>
                    </li>
                    <li className="char__item char__item_selected">
                        <Spinner/>
                    </li>
                    <li className="char__item">
                        <Spinner/>
                    </li>
                    <li className="char__item">
                        <Spinner/>
                    </li>
                </ul>
                <button  className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;