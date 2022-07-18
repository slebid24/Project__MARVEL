import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types"


class CharList extends Component  {
   
    state = {
        chars: [],
        loading: true,
        newItemLoading: false,
        offset: 210
    }

    MarvelService = new MarvelService();

    onCharListLoaded = (newChars) => {
        this.setState(({offset, chars}) => (
            {
                chars: [...chars, ...newChars], 
                loading: false,
                newItemLoading: false,
                offset: offset + 9
            }
        ))
        
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.MarvelService.getAllCharacters(offset)
                .then(this.onCharListLoaded)
    }

    

    componentDidMount = () => {
       this.onRequest()
       this.setState({
         
        loading: true,
        
    })
    }

    imgStyle = (img) => {
        let imgType = img.match((/image_not_available/g))
        return imgType ? true : false;
    }

    render() {
        const content = this.state.loading ? <Loading/> : <View arr={this.state.chars} func={this.props.onCharSelected} imgStyle={this.imgStyle}/>
        const downloadContent = this.state.newItemLoading ? <Loading/> : null;
        return (
            <div className="char__list">
                <div className='char__grid'>
                    {content}
                    {downloadContent}
                </div>
                <button  className="button button__main button__long" onClick={() => this.onRequest(this.state.offset)}>
                        <div className="inner">load more</div>
                    </button>
            </div>
        )
    } 
}

const View = ({arr, func, imgStyle}) => {
    return arr.map((item) => {
       return (
       <li className="char__item" key={item.id} onClick={() => {func(item.id)}} >
           <img style={imgStyle(item.thumbnail) ? {"object-fit": "contain", "position": "relative", "top": "-5%"} : {}} src={item.thumbnail} alt={item.name}/>
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

CharList.propTypes = {
    onCharSelected: PropTypes.func,
}

export default CharList;