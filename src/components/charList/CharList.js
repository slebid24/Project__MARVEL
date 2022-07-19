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

    classType = () => {
        return "char__item"
    }

    render() {
        const content = this.state.loading ? <Loading/> : <View arr={this.state.chars} props={this.props} imgStyle={this.imgStyle} classType={this.classType}/>
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
// 
const View = ({arr, props, imgStyle}) => {
    
    return arr.map((item) => {
       const active = props.charId === item.id
       const clazz = active ? "char__item char__item_selected" : "char__item";
       return (
       <li tabIndex={0} className={clazz}  key={item.id} onClick={() => {props.onCharSelected(item.id)}} >
           <img style={imgStyle(item.thumbnail) ? {"objectFit": "fill"} : {}} src={item.thumbnail} alt={item.name}/>
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