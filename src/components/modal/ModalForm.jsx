import React, { Fragment, memo } from 'react'

const ModalForm = ({ setNewStatus, newStatus, children }) => {
    return (
        <Fragment>
            <div className={`overflow ${newStatus ? newStatus : 'hidden'}`} onClick={() => setNewStatus(null)}></div>
            <div className={`modal__style ${newStatus ? newStatus : ' hidden'}`}> {children} </div>
        </Fragment>
    )
}

export default memo(ModalForm)