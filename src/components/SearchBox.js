import React from 'react';
import './SearchBox.css';

const SearchBox = ({searchChange, handleCheckChange}) => {
    return (
        <div className='pa2'>
            <input
                className='pa3 ba b--green bg-lightest-blue w-50'
                type="search"
                placeholder='search hero'
                onChange={searchChange}
            />
            <form>
                <label className='container'>Support<input type="checkbox" id='Support' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Carry<input type="checkbox" id='Carry' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Durable<input type="checkbox" id='Durable' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Disabler<input type="checkbox" id='Disabler' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Initiator<input type="checkbox" id='Initiator' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Nuker<input type="checkbox" id='Nuker' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Jungler<input type="checkbox" id='Jungler' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Escape<input type="checkbox" id='Escape' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Pusher<input type="checkbox" id='Pusher' onClick={handleCheckChange}/><span className="checkmark"></span></label>
                <label className='container'>Semi-Carry<input type="checkbox" id='semi-carry' onClick={handleCheckChange}/><span className="checkmark"></span></label>
            </form>
        </div>
    );
}

export default SearchBox;