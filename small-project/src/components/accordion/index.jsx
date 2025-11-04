import { useState } from 'react';
import data from './data';
import './style.css';

export default function Accordion() {
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [selected, setSelected] = useState(null);
    const [multiple, setMultiple] = useState([]);
    function handleSingleSelection(getCurrentId) {
        setSelected(getCurrentId === selected ? null : getCurrentId)
    }
    function handleMultiSelection(getCurrentId) {
        let cpyMultiple = [...multiple];
        const findIndexofCurrentId = cpyMultiple.indexOf(getCurrentId);
        if (findIndexofCurrentId === -1)
            cpyMultiple.push(getCurrentId)
        else
            cpyMultiple.splice(findIndexofCurrentId, 1);

        setMultiple(cpyMultiple);
    }

    return (
        <div className="wrapper">
            <button className='toggleSelection' onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Toggle Multi Selection</button>
            <div className="accordion">
                {
                    data && data.length > 0 ? (
                        data.map((dataItem, index) => (
                            <div className='item' key={index}>
                                <div className='heading' onClick={() => enableMultiSelection ? handleMultiSelection(dataItem.id) : handleSingleSelection(dataItem.id)}>
                                    <h4>{dataItem.question}</h4>
                                    <span>+</span>
                                </div>
                                {
                                    enableMultiSelection
                                        ?
                                        multiple.indexOf(dataItem.id) !== -1 && (
                                            <div className='content'>
                                                <p>{dataItem.answer}</p>
                                            </div>
                                        )
                                        : selected === dataItem.id && (
                                            <div className='content'>
                                                <p>{dataItem.answer}</p>
                                            </div>
                                        )
                                }

                            </div>
                        ))

                    ) : (<div> Data Not Found </div>)

                }
            </div>
        </div>
    );
}