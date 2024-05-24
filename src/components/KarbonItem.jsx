import React, { memo } from 'react'
import { FaTrashAlt } from "react-icons/fa";

const styles = { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }

const KarbonItem = ({ STATUS_ITEMS, el, setChangeStatus, deleteItem }) => {
    const time = el?.createdAt?.split('T')[1].slice(0, 5)
    return (
        <div className="kanban__item">
            <p style={styles} >
                {el.title} <FaTrashAlt onClick={() => deleteItem(el.id)} fontSize={12} color='red' />
            </p>
            <p className="kanban__commit">{el.desc}</p>
            <div className="kanban__status">
                <select value={el.status} onChange={(e) => setChangeStatus({ ...el, status: e.target.value })} >
                    {
                        STATUS_ITEMS?.map(el => (
                            <option key={el.id} value={el.title} >{el.title}</option>
                        ))
                    }
                </select>
                <span>{time}</span>
            </div>
        </div>
    )
}

export default memo(KarbonItem)