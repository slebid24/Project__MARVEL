import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";


class CharList extends Component  {
   
    state = {
        chars: [],
        loading: true,
    }

    MarvelService = new MarvelService();

    onCharLoaded = (chars) => {
        this.setState({
            chars: chars, 
            loading: false,
            id: null
        })
        
    }

    onRequest = (offset) => {
        this.MarvelService.getAllCharacters(offset)
                .then(this.onCharLoaded)
    }

    componentDidMount = () => {
       this.onRequest()
       this.setState({
         
        loading: true,
        
    })
    }

    render() {
        const content = this.state.loading ? <Loading/> : <View arr={this.state.chars} func={this.props.onCharSelected}/>
        return (
            <div className="char__list">
                <div className='char__grid'>
                    {content}
                    <Loading/>
                </div>
                <button  className="button button__main button__long">
                        <div className="inner">load more</div>
                    </button>
            </div>
        )
    } 
}

const View = ({arr, func}) => {
    return arr.map((item) => {
       return (
       <li className="char__item" key={item.id} onClick={() => {func(item.id)}} >
           <img src={item.thumbnail} alt="abyss"/>
               <div className="char__name">{item.name}</div>
       </li>
       )
   })
}

const Loading = () => {
    const newArr = [];
    for (let i = 0; i < 9; i++) {
        newArr.push(
            <li className="char__item" key={i}>
                <div className='char__spinner'>
                    <Spinner/>
                </div>
            </li>
        )
    }
    return newArr;
}


export default CharList;