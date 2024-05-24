import React, { Fragment, memo } from 'react'
import { FaXmark } from 'react-icons/fa6'

const CreateStatusSection = ({ handaleNewStatus, setNewStatus, newStatus, setStatusSections, statusSections }) => {
    return (
        <Fragment>
            <div className={`overflow ${newStatus ? newStatus : 'hidden'}`} onClick={() => setNewStatus(null)}></div>
            <div className={`modal__style ${newStatus ? newStatus : ' hidden'}`}>
                <form onSubmit={handaleNewStatus} className="status__form__control">
                    <h1 className="from-title">Create New Status <FaXmark color="red" onClick={() => setNewStatus('hidden')} /> </h1>
                    <input onChange={(e) => setStatusSections({ ...statusSections, title: e.target.value })} required
                        className="from-input" type="text" placeholder="Status Title" />
                    <select className="from-selected" defaultValue={'purple'} onChange={(e) => setStatusSections(prev => ({ ...prev, bgColor: e.target.value }))} >
                        <option value="purple">Purple</option>
                        <option value="orange">Orange</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                    </select>
                    <button className="from-btn" type="submit">Create Status</button>
                </form>
            </div>
        </Fragment>
    )
}

export default memo(CreateStatusSection)