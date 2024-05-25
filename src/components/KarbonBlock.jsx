import React, { memo } from 'react'

const KarbonBlock = ({ status_items, items, setSelectedStatus, setNewStatus, deleteStatus }) => {

    return status_items?.map(status => (
        <div key={status.id} className={`kanban__box ${status.bgColor}`}>
            <div className="kanban__heading">
                <p>{status.title} to start / {items(status.title).length}</p>
            </div>
            <div className="kanban__block">{items(status.title).length ? items(status.title) : (
                <div className='kanban__delete'>
                    <h1 className='kanban__delete__title'>Statusda hozircha ma`lumot yo`q</h1>
                    <button onClick={() => deleteStatus(status.id)} className='kanban__delete__btn'>Status Delete</button>
                </div>
            )}</div>
            <button onClick={() => (setSelectedStatus(status.title), setNewStatus('dsBlock'))} className="kanban__add_btn">Add item</button>
        </div>
    ))
}

export default memo(KarbonBlock)