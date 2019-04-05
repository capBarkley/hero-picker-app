import React from 'react';
import HeroCard from './HeroCard';

const HeroList = ({heroes, primAttr}) => {
    return(
        <div>
            {
                heroes.map(hero => {
                    if (primAttr === hero.primaryAttribute) {
                        return (<HeroCard
                                    key={hero.id}
                                    name={hero.name}
                                    primAttr={hero.primaryAttribute}
                                    health={hero.health}
                                    imgUrl={hero.imgUrl}
                                    roles={hero.roles}/>
                        );
                    }
                })
            }
        </div>
    );
}

export default HeroList;