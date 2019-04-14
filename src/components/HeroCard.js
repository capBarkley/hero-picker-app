import React from 'react';
import './HeroCard.css'

const HeroCard = ({id, name, primAttr, health, imgUrl, roles, idToShow, changeCard}) => {
    let color = '';
    switch (primAttr) {
        case 'Strength':
         color = 'bg-red';
         break;
        case 'Agility':
         color = 'bg-green';
         break;
        case 'Intelligence':
         color = 'bg-blue';
         break;
    }
    let style = `heroCard tc ${color} dib br3 pa3 ma2 grow bw2 shadow-5`;
    if (id === idToShow) return (
        <div className={style}>
            <h1 className='heroName'>{name}</h1>
            <img className='heroImg' alt='heroImg' src={imgUrl} weight='120'/>
        </div>
    );
    return (
        <div className={style} onClick={changeCard}>
            <h1 className='heroName'>{name}</h1>
            <img className='heroImg' alt='heroImg' src={imgUrl} weight='120'/>
            <table className='heroAttr'>
                <tbody>
                    <tr className='primAttr'>
                        <th>Primary attribute</th>
                        <td>{primAttr}</td>
                    </tr>
                    <tr className='health'>
                        <th>Health</th>
                        <td>{health}</td>
                    </tr>
                    <tr className='mana'>
                        <th>Mana</th>
                        <td>340</td>
                    </tr>
                    <tr className='armor'>
                        <th>Armor</th>
                        <td>2</td>
                    </tr>
                    <tr className='damage'>
                        <th>Damage</th>
                        <td>55-65</td>
                    </tr>
                    <tr className='movespeed'>
                        <th>Movespeed</th>
                        <td>325</td>
                    </tr>
                    <tr className='roles'>
                        <th>Roles</th>
                        <td>
                            <table>
                                <tbody>
                                    {
                                        roles.map((role, i) => {
                                            return <tr key={i}><td>{role}</td></tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default HeroCard;