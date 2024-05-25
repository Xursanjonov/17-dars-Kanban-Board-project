import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { DATA } from "@/static";
import KarbonBlock from "../KarbonBlock";
import KarbonItem from "../KarbonItem";
import { STATUS_ITEMS } from "../../static";
import ModalForm from "../modal/ModalForm";
import CreateStatusSection from "../CreateStatusSection";
import { nanoid } from "nanoid";

const KanbanBoard = () => {
  const [statusSections, setStatusSections] = useState(STATUS_ITEMS)
  const [data, setData] = useState(JSON.parse(localStorage.getItem('message')) || DATA)
  const [selectedStatus, setSelectedStatus] = useState(null)
  const [changeStatus, setChangeStatus] = useState(null)
  const [newStatus, setNewStatus] = useState(null)

  const title = useRef(null)
  const desc = useRef(null)

  // Status sections
  const deleteStatus = useCallback((id) => {
    if (confirm(`${id} Shu status o'chirilsinmi ? `)) {
      let index = statusSections?.findIndex(el => el.id === id)
      STATUS_ITEMS?.splice(index, 1)
      setStatusSections([...STATUS_ITEMS])
    }
  }, [statusSections])
  useEffect(() => {
    localStorage.setItem('status', JSON.stringify(statusSections))
  }, [statusSections])
  // karbon item delete
  const deleteItem = useCallback((id) => {
    if (confirm('Rostan o`chirmochimisiz ?')) {
      const filterData = data?.filter(el => el.id !== id)
      setData([...filterData])
    }
  }, [data])
  useEffect(() => {
    if (changeStatus) {
      let index = data?.findIndex(el => el.id === changeStatus.id)
      console.log(index);
      data?.splice(index, 1, changeStatus)
      setData([...data])
    }
  }, [changeStatus])
  // All data localStorage save
  useEffect(() => {
    localStorage.setItem('message', JSON.stringify(data))
  }, [data])
  const filterByStatus = (status) => {
    return data?.filter(el => el.status === status)?.map((el) =>
      <KarbonItem
        deleteItem={deleteItem}
        key={el.id}
        setChangeStatus={setChangeStatus}
        STATUS_ITEMS={STATUS_ITEMS} el={el} />)
  }
  // let readyItems = filterByStatus("ready");
  let memoFilterByStatus = useCallback((status) => { return filterByStatus(status) }, [data])
  const handleCreateItem = (e) => {
    e.preventDefault()
    let date = new Date()
    let timeZoneGMT = (hour) => new Date(date.getTime() + (hour * 60 * 60 * 1000))

    let newItems = {
      id: date,
      title: title.current.value,
      desc: desc.current.value,
      status: selectedStatus,
      createAt: timeZoneGMT(5).toISOString()
    }
    setData(prev => [...prev, newItems])
    setSelectedStatus(null)
    setNewStatus(null)
    title.current.value = ""
    desc.current.value = ""
  }
  // Status Section create
  const handaleNewStatus = (e) => {
    e.preventDefault()
    STATUS_ITEMS?.push(statusSections)
    setStatusSections({ id: nanoid(), title: '', bgColor: '' })
  }

  return (
    <section>
      <div className="container">
        <div className="kanban">
          <h2 className="kanban__title">Kanban Board</h2>
          <div className="kanban__header"> <button onClick={() => setNewStatus('dsBlock')} className="kanban__newStatus__btn">Add</button> </div>
          {
            STATUS_ITEMS.length ? (
              <div className="kanban__wrapper">
                <KarbonBlock deleteStatus={deleteStatus} status_items={STATUS_ITEMS} items={memoFilterByStatus}
                  setNewStatus={setNewStatus} setSelectedStatus={setSelectedStatus} />
              </div>) : (
              <div className="kanban__newStatus">
                <h1>Saytimizga hush kelibsiz Kuningizni hozirdan rejalashtirib oling</h1>
                <button onClick={() => setNewStatus('dsBlock')} className="kanban__newStatus__btn"> Get Started </button>
                <CreateStatusSection handaleNewStatus={handaleNewStatus} newStatus={newStatus}
                  setNewStatus={setNewStatus} statusSections={statusSections} setStatusSections={setStatusSections} />
              </div>)}
        </div>
      </div> {selectedStatus ? (<ModalForm setNewStatus={setNewStatus} newStatus={newStatus} >
        <form onSubmit={handleCreateItem} className="status__form__control">
          <h1 className="from-title">Create {selectedStatus} <FaXmark color="red" onClick={() => setNewStatus('hidden')} /> </h1>
          <input ref={title} type="text" className="from-input" required placeholder="Title" />
          <input ref={desc} type="text" className="from-input" placeholder="Description" />
          <button className="from-btn" type="submit">Create {selectedStatus}</button>
        </form>
      </ModalForm>) : <></>}
    </section>
  );
};


export default memo(KanbanBoard)