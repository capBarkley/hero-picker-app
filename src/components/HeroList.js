import React, {Component} from 'react';
import HeroCard from './HeroCard';

class HeroList extends Component {
    constructor(){
        super();
        this.state = {
            cardIdToShow : -1
        }
    }

    onClickChangeCard = (id, e) => {
        this.setState({cardIdToShow: id})
    }

    render(){
        return(
            <div className="HeroList">
                {
                    this.props.heroes.map(hero => {
                        if (this.props.primAttr === hero.primaryAttribute) {
                            return (<HeroCard
                                        key={hero.id}
                                        id={hero.id}
                                        name={hero.name}
                                        primAttr={hero.primaryAttribute}
                                        health={hero.health}
                                        imgUrl={hero.imgUrl}
                                        roles={hero.roles}
                                        idToShow={this.state.cardIdToShow}
                                        changeCard={this.onClickChangeCard.bind(this, hero.id)}
                                        />
                            );
                        }
                    })
                }
            </div>
        );
    }
}

export default HeroList;